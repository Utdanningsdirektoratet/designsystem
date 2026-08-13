// NOTE: Implemented using Claude

/**
 * Pure (IO-free) logic for `bin/diff-runtime-deps.ts`.
 *
 * This module contains the dependency-closure construction and comparison
 * used to decide whether the runtime dependencies of the `@udir-design/*`
 * packages changed between two git refs. All filesystem/git access lives in
 * the bin entry point so that this logic stays deterministic and unit-testable.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PackageJson {
  name?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  untrackedDevDependencies?: string[];
  trackedDevDependencies?: string[];
}

export interface LockfileImporterDep {
  specifier: string;
  version: string;
}

export interface LockfileImporter {
  dependencies?: Record<string, LockfileImporterDep>;
  devDependencies?: Record<string, LockfileImporterDep>;
}

export interface LockfileSnapshot {
  dependencies?: Record<string, string>;
  transitivePeerDependencies?: string[];
  optional?: boolean;
}

export interface Lockfile {
  importers: Record<string, LockfileImporter>;
  snapshots: Record<string, LockfileSnapshot>;
}

export type ReadPkgJson = (pkgName: string) => PackageJson | null;

// ─── Utilities ────────────────────────────────────────────────────────────────

export const isWorkspaceVersion = (version: string): boolean =>
  version.startsWith('link:');

export const isTypesPackage = (name: string): boolean =>
  name.startsWith('@types/');

export const toSnapshotKey = (name: string, version: string): string =>
  `${name}@${version}`;

/**
 * Extracts the package name from a snapshot key.
 * e.g. "@scope/name@1.0.0(peer@1.0.0)" → "@scope/name"
 *      "name@1.0.0"                     → "name"
 */
export function parsePackageName(snapshotKey: string): string {
  const searchFrom = snapshotKey.startsWith('@') ? 1 : 0;
  const atIdx = snapshotKey.indexOf('@', searchFrom);
  return atIdx === -1 ? snapshotKey : snapshotKey.slice(0, atIdx);
}

/**
 * Formats a set of @udir-design/* package names as a bracketed suffix.
 * e.g. Set { '@udir-design/react', '@udir-design/css' } → " [@udir-design/react, @udir-design/css]"
 */
export function formatSources(sources: Set<string>): string {
  if (sources.size === 0) return '';
  return ` [${[...sources].sort().join(', ')}]`;
}

/**
 * Strips the peer-dep encoding from a snapshot key, leaving only
 * "name@version" for readable output.
 * e.g. "@digdir/foo@1.14.0(@types/react@19.2.14)(react@19.2.5)"
 *   →  "@digdir/foo@1.14.0"
 */
export function formatSnapshotKey(key: string): string {
  const nameEnd = key.startsWith('@') ? key.indexOf('@', 1) : key.indexOf('@');
  const rest = key.slice(nameEnd + 1); // "1.14.0(@types/react@19.2.14)..."
  const peerStart = rest.indexOf('(');
  if (peerStart === -1) return key;
  const name = key.slice(0, nameEnd);
  const version = rest.slice(0, peerStart);
  return `${name}@${version}`;
}

// ─── Package-json helpers ─────────────────────────────────────────────────────

/**
 * Extracts tracked dependency names from a parsed package.json.
 *
 * Always includes `dependencies` + `peerDependencies` (excluding `@types/*`).
 * A package can additionally opt devDependencies into the closure via one of:
 *   - `untrackedDevDependencies`: track *all* devDependencies except those
 *     listed (a blocklist; suits packages whose whole devDep set is a build
 *     pipeline, e.g. PostCSS/svgo).
 *   - `trackedDevDependencies`: track *only* the listed devDependencies (an
 *     allowlist; suits packages whose devDeps are mostly unrelated test/lint
 *     tooling but a handful of build tools affect the published/built output,
 *     e.g. the Vite/Storybook toolchain behind `@udir-design/react`).
 *
 * The two fields are mutually exclusive; if both are present,
 * `trackedDevDependencies` takes precedence.
 */
export function parseTrackedDepNames(pkg: PackageJson): Set<string> {
  const names = new Set<string>();
  for (const name of [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]) {
    if (!isTypesPackage(name)) names.add(name);
  }
  if (pkg.trackedDevDependencies) {
    const devDependencies = new Set(Object.keys(pkg.devDependencies ?? {}));
    for (const name of pkg.trackedDevDependencies) {
      if (!isTypesPackage(name) && devDependencies.has(name)) {
        names.add(name);
      }
    }
  } else if (pkg.untrackedDevDependencies) {
    const ignored = new Set(pkg.untrackedDevDependencies);
    for (const name of Object.keys(pkg.devDependencies ?? {})) {
      if (!isTypesPackage(name) && !ignored.has(name)) {
        names.add(name);
      }
    }
  }
  return names;
}

// ─── Closure building ─────────────────────────────────────────────────────────

/**
 * Builds the full snapshot closure for all runtime + peer dependencies of a
 * given set of `@udir-design/*` packages, recursively following workspace links.
 *
 * @param lockfile - The parsed pnpm-lock.yaml to resolve versions from.
 * @param udirPackageNames - The `@udir-design/*` package names to seed from.
 * @param readPkgJson - Loads a workspace package's package.json by name;
 *   returns null if it does not exist at that source (disk or git).
 *
 * Returns a Map of snapshot key → snapshot content (the `dependencies` map
 * within each snapshot entry is what we compare across branches).
 */
export function buildClosure(
  lockfile: Lockfile,
  udirPackageNames: string[],
  readPkgJson: ReadPkgJson,
): Map<string, LockfileSnapshot> {
  const closure = new Map<string, LockfileSnapshot>();
  // Snapshot keys waiting to be traversed
  const pendingSnapshotKeys = new Set<string>();
  // Guard against infinite loops from circular workspace deps
  const visitedImporters = new Set<string>();

  // --- Step 1: walk @udir-design/* workspace packages to seed the queue ------

  /**
   * For a workspace package (identified by its importer key), resolves all its
   * tracked dep names using the given lockfile's importer entry. Workspace deps
   * are followed recursively; external deps are added to `pendingSnapshotKeys`
   * to be traversed in step 2.
   */
  function seedFromWorkspacePackage(importerKey: string): void {
    if (visitedImporters.has(importerKey)) return;
    visitedImporters.add(importerKey);

    const pkg = readPkgJson(importerKey);
    if (!pkg) return;

    const depNames = parseTrackedDepNames(pkg);
    const importer = lockfile.importers[importerKey];
    // The importer may not exist in the base lockfile if this workspace package
    // was added in the current branch. In that case there is nothing to seed.
    if (!importer) return;

    for (const depName of depNames) {
      // peerDependencies are concretely resolved as devDependencies in the
      // workspace, so we search both sections of the importer.
      const resolved =
        importer.dependencies?.[depName] ?? importer.devDependencies?.[depName];

      if (!resolved) continue;

      if (isWorkspaceVersion(resolved.version)) {
        // The dep name IS the importer key for workspace packages.
        seedFromWorkspacePackage(depName);
      } else {
        pendingSnapshotKeys.add(toSnapshotKey(depName, resolved.version));
      }
    }
  }

  for (const pkgName of udirPackageNames) {
    seedFromWorkspacePackage(pkgName);
  }

  // --- Step 2: BFS through snapshots -----------------------------------------

  const visitedSnapshotKeys = new Set<string>();

  function visitSnapshot(key: string): void {
    if (visitedSnapshotKeys.has(key)) return;
    visitedSnapshotKeys.add(key);

    if (isTypesPackage(parsePackageName(key))) return;

    const snapshot = lockfile.snapshots?.[key] ?? {};
    closure.set(key, snapshot);

    for (const [depName, depVersion] of Object.entries(
      snapshot.dependencies ?? {},
    )) {
      if (!isTypesPackage(depName)) {
        visitSnapshot(toSnapshotKey(depName, depVersion));
      }
    }
  }

  for (const key of pendingSnapshotKeys) {
    visitSnapshot(key);
  }

  return closure;
}

/**
 * Computes a source-attribution map: for every snapshot key reachable from a
 * given set of `@udir-design/*` packages, records which of those packages
 * (directly or transitively) caused it to be included.
 *
 * Each package is traversed independently so shared transitive deps are
 * attributed to all packages that depend on them.
 */
export function computeSources(
  lockfile: Lockfile,
  udirPackageNames: string[],
  readPkgJson: ReadPkgJson,
): Map<string, Set<string>> {
  const sources = new Map<string, Set<string>>();
  for (const pkgName of udirPackageNames) {
    const pkgClosure = buildClosure(lockfile, [pkgName], readPkgJson);
    for (const key of pkgClosure.keys()) {
      const existing = sources.get(key);
      if (existing) existing.add(pkgName);
      else sources.set(key, new Set([pkgName]));
    }
  }
  return sources;
}

// ─── Comparison ───────────────────────────────────────────────────────────────

export interface DepDiff {
  name: string;
  from?: string;
  to?: string;
}

export interface SourcedKey {
  key: string;
  sources: Set<string>;
}

export interface PeerDepsChanged {
  formattedKey: string;
  baseKey: string;
  headKey: string;
  sources: Set<string>;
  depDiffs: DepDiff[];
}

export interface ChangeReport {
  added: SourcedKey[];
  removed: SourcedKey[];
  peerDepsChanged: PeerDepsChanged[];
  changed: Array<SourcedKey & { depDiffs: DepDiff[] }>;
}

export function diffDependencies(
  baseDeps: Record<string, string>,
  headDeps: Record<string, string>,
): DepDiff[] {
  const allNames = new Set([
    ...Object.keys(baseDeps),
    ...Object.keys(headDeps),
  ]);
  const diffs: DepDiff[] = [];
  for (const name of allNames) {
    if (baseDeps[name] !== headDeps[name]) {
      diffs.push({ name, from: baseDeps[name], to: headDeps[name] });
    }
  }
  return diffs;
}

export function compareClosure(
  base: Map<string, LockfileSnapshot>,
  head: Map<string, LockfileSnapshot>,
  baseSources: Map<string, Set<string>>,
  headSources: Map<string, Set<string>>,
): ChangeReport {
  const added: SourcedKey[] = [];
  const removed: SourcedKey[] = [];
  const changed: Array<SourcedKey & { depDiffs: DepDiff[] }> = [];

  for (const [key, headSnapshot] of head) {
    if (!base.has(key)) {
      added.push({ key, sources: headSources.get(key) ?? new Set() });
    } else {
      const diffs = diffDependencies(
        base.get(key)?.dependencies ?? {},
        headSnapshot.dependencies ?? {},
      );
      if (diffs.length > 0) {
        changed.push({
          key,
          depDiffs: diffs,
          sources: headSources.get(key) ?? new Set(),
        });
      }
    }
  }

  for (const key of base.keys()) {
    if (!head.has(key)) {
      removed.push({ key, sources: baseSources.get(key) ?? new Set() });
    }
  }

  // Correlate removed/added pairs that share the same base name+version
  // (i.e. formatSnapshotKey result). These are peer-dep-only changes where the
  // snapshot key changed because a peer dependency's version changed, not the
  // package itself. Only correlate when there is exactly one removed and one
  // added entry for a given formatted key; ambiguous cases stay as-is.
  const removedByFormatted = new Map<string, string>();
  const addedByFormatted = new Map<string, string>();
  const ambiguous = new Set<string>();

  for (const { key } of removed) {
    const formatted = formatSnapshotKey(key);
    if (removedByFormatted.has(formatted)) ambiguous.add(formatted);
    else removedByFormatted.set(formatted, key);
  }
  for (const { key } of added) {
    const formatted = formatSnapshotKey(key);
    if (addedByFormatted.has(formatted)) ambiguous.add(formatted);
    else addedByFormatted.set(formatted, key);
  }

  const peerDepsChanged: PeerDepsChanged[] = [];
  const correlated = new Set<string>();

  for (const [formatted, baseKey] of removedByFormatted) {
    if (ambiguous.has(formatted)) continue;
    const headKey = addedByFormatted.get(formatted);
    if (!headKey) continue;

    peerDepsChanged.push({
      formattedKey: formatted,
      baseKey,
      headKey,
      sources:
        headSources.get(headKey) ?? baseSources.get(baseKey) ?? new Set(),
      depDiffs: diffDependencies(
        base.get(baseKey)?.dependencies ?? {},
        head.get(headKey)?.dependencies ?? {},
      ),
    });
    correlated.add(baseKey);
    correlated.add(headKey);
  }

  return {
    added: added.filter(({ key }) => !correlated.has(key)),
    removed: removed.filter(({ key }) => !correlated.has(key)),
    peerDepsChanged: peerDepsChanged.sort((a, b) =>
      a.formattedKey.localeCompare(b.formattedKey),
    ),
    changed,
  };
}
