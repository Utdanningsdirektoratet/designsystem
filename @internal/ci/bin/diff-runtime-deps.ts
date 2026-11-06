#!/usr/bin/env -S pnpm tsx

// NOTE: Implemented using Claude

/**
 * Checks whether the runtime dependencies (dependencies + peerDependencies,
 * excluding `@types/*`) of all `@udir-design/*` packages have changed in
 * `pnpm-lock.yaml` on the current branch compared to a base ref (default: main).
 *
 * When a workspace package declares an `untrackedDevDependencies` array in its
 * package.json, all its devDependencies *except* those listed are also included
 * in the closure. This lets packages with build pipelines that produce
 * non-committed output (e.g. PostCSS, svgo) opt in to tracking their build
 * tools, so that version bumps trigger a full Chromatic rebuild.
 *
 * Alternatively, a package can declare a `trackedDevDependencies` array to
 * include *only* the listed devDependencies. This suits packages whose
 * devDependencies are mostly unrelated test/lint tooling but a handful of build
 * tools affect the built output (e.g. the Vite/Storybook toolchain behind
 * `@udir-design/react`). Transitive dependencies of tracked packages are
 * followed automatically, so tracking the top-level bundler is enough to catch
 * churn in its sub-dependencies (e.g. rolldown, esbuild).
 *
 * Workspace dependencies (workspace:*) are followed recursively so that
 * transitive dependency changes through sibling packages are also detected.
 *
 * Each closure is seeded from its own set of package.json files: HEAD reads
 * from disk, and the base reads from git. This ensures that dependencies
 * removed from package.json in this branch are detected as removed.
 *
 * Exit codes:
 *   0  - No runtime dependency changes detected
 *   99 - Runtime dependencies changed (trigger a full Chromatic build)
 *   Any other code is an error. "Changed" deliberately avoids 1, because
 *   Node, tsx, and pnpm all exit with 1 on failure, including failures that
 *   happen before this script's code runs.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yargs, { type Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  type DepDiff,
  type Lockfile,
  type PackageJson,
  type SourcedKey,
  buildClosure,
  compareClosure,
  computeSources,
  formatSnapshotKey,
  formatSources,
  parseLockfile,
} from '../src/diff-runtime-deps.js';

// ─── Package-json IO ──────────────────────────────────────────────────────────

/** Returns the package.json for a workspace package read from disk, or null. */
function readPkgJsonFromDisk(
  repoRoot: string,
  pkgName: string,
): PackageJson | null {
  const candidate = path.join(repoRoot, pkgName, 'package.json');
  return fs.existsSync(candidate)
    ? (JSON.parse(fs.readFileSync(candidate, 'utf-8')) as PackageJson)
    : null;
}

/** Returns the contents of a file at a git ref. */
function gitShow(repoRoot: string, ref: string, filePath: string): string {
  return execFileSync('git', ['show', `${ref}:${filePath}`], {
    cwd: repoRoot,
    encoding: 'utf-8',
    stdio: 'pipe',
  });
}

/**
 * Returns the package.json for a workspace package read from git, or null if
 * the package doesn't exist at that ref.
 */
function readPkgJsonFromGit(
  repoRoot: string,
  base: string,
  pkgName: string,
): PackageJson | null {
  try {
    return JSON.parse(
      gitShow(repoRoot, base, `${pkgName}/package.json`),
    ) as PackageJson;
  } catch (error) {
    // git's messages for a path that is missing at the ref, depending on
    // whether it exists in the working tree. The thrown error's message
    // includes git's stderr. Any other failure is a real error.
    if (
      error instanceof Error &&
      /does not exist in|exists on disk, but not in/.test(error.message)
    ) {
      return null;
    }
    throw new Error(
      `Could not read ${pkgName}/package.json from ref "${base}"`,
      { cause: error },
    );
  }
}

/** Returns the lockfile at the base ref. */
function readLockfileFromGit(repoRoot: string, base: string): Lockfile {
  try {
    return parseLockfile(gitShow(repoRoot, base, 'pnpm-lock.yaml'));
  } catch (cause) {
    throw new Error(
      `Could not read pnpm-lock.yaml from ref "${base}". ` +
        `Make sure the ref exists and the lockfile is tracked by git.`,
      { cause },
    );
  }
}

// ─── Output ───────────────────────────────────────────────────────────────────

/** Lists how the dependencies of a snapshot changed, for `--verbose`. */
function formatDepDiffs(depDiffs: DepDiff[]): string[] {
  return depDiffs.map(({ name, from, to }) =>
    from === undefined
      ? `      + ${name}: ${to}`
      : to === undefined
        ? `      - ${name}: ${from}`
        : `      ~ ${name}: ${from} → ${to}`,
  );
}

const byKey = (a: SourcedKey, b: SourcedKey) => a.key.localeCompare(b.key);

// ─── Entry point ──────────────────────────────────────────────────────────────

/** See "Exit codes" above; must match the `case` in `chromatic.yml`. */
const EXIT_DEPS_CHANGED = 99;

const yargsInstance = yargs(hideBin(process.argv));
const options = await yargsInstance
  .version(false)
  .options({
    base: {
      alias: 'b',
      description: 'Base git ref to compare against',
      type: 'string',
      default: 'main',
    },
    verbose: {
      alias: 'v',
      description:
        'Show which transitive dependencies changed within each snapshot',
      type: 'boolean',
      default: false,
    },
  } satisfies Record<string, Options>)
  .wrap(yargsInstance.terminalWidth())
  .parseAsync();

// The script lives at <repoRoot>/@internal/ci/bin/, so go up 3 dirs.
const repoRoot = path.resolve(import.meta.dirname, '../../..');
const lockfilePath = path.join(repoRoot, 'pnpm-lock.yaml');

console.log(
  `Checking runtime dependency changes in @udir-design/* against ${options.base}...\n`,
);

const headLockfile = parseLockfile(fs.readFileSync(lockfilePath, 'utf-8'));
const baseLockfile = readLockfileFromGit(repoRoot, options.base);

const udirDesignDir = path.join(repoRoot, '@udir-design');

const headUdirPackageNames = fs
  .readdirSync(udirDesignDir, { withFileTypes: true })
  .filter(
    (e) =>
      e.isDirectory() &&
      fs.existsSync(path.join(udirDesignDir, e.name, 'package.json')),
  )
  .map((e) => `@udir-design/${e.name}`);

const baseUdirPackageNames = Object.keys(baseLockfile.importers).filter((k) =>
  k.startsWith('@udir-design/'),
);

const headReadPkgJson = (pkgName: string) =>
  readPkgJsonFromDisk(repoRoot, pkgName);
const baseReadPkgJson = (pkgName: string): PackageJson | null => {
  const basePkg = readPkgJsonFromGit(repoRoot, options.base, pkgName);
  if (
    !basePkg ||
    basePkg.trackedDevDependencies ||
    basePkg.untrackedDevDependencies
  ) {
    return basePkg;
  }
  // The base package.json doesn't declare a devDependency-tracking field yet,
  // so borrow the classification from HEAD so that both sides track the same
  // set of devDependencies. Without this, introducing (or switching) the field
  // on a branch would cause every tracked devDep to appear as "added".
  // `trackedDevDependencies` takes precedence, matching `parseTrackedDepNames`.
  const headPkg = readPkgJsonFromDisk(repoRoot, pkgName);
  return headPkg?.trackedDevDependencies
    ? { ...basePkg, trackedDevDependencies: headPkg.trackedDevDependencies }
    : headPkg?.untrackedDevDependencies
      ? {
          ...basePkg,
          untrackedDevDependencies: headPkg.untrackedDevDependencies,
        }
      : basePkg;
};

const headClosure = buildClosure(
  headLockfile,
  headUdirPackageNames,
  headReadPkgJson,
);
const baseClosure = buildClosure(
  baseLockfile,
  baseUdirPackageNames,
  baseReadPkgJson,
);
const headSources = computeSources(
  headLockfile,
  headUdirPackageNames,
  headReadPkgJson,
);
const baseSources = computeSources(
  baseLockfile,
  baseUdirPackageNames,
  baseReadPkgJson,
);

console.log(`Dependency closure: ${headClosure.size} packages\n`);

const { added, removed, peerDepsChanged, changed } = compareClosure(
  baseClosure,
  headClosure,
  baseSources,
  headSources,
);

const verboseDepDiffs = (depDiffs: DepDiff[]) =>
  options.verbose ? formatDepDiffs(depDiffs) : [];

// Every change adds at least one line, so a section without lines has no
// changes.
const sections = Object.entries({
  Removed: removed
    .toSorted(byKey)
    .map(
      ({ key, sources }) =>
        `  - ${formatSnapshotKey(key)}${formatSources(sources)}`,
    ),
  Added: added
    .toSorted(byKey)
    .map(
      ({ key, sources }) =>
        `  + ${formatSnapshotKey(key)}${formatSources(sources)}`,
    ),
  'Peer deps changed': peerDepsChanged.flatMap(
    ({ formattedKey, sources, depDiffs }) => [
      `  ~ ${formattedKey}${formatSources(sources)}`,
      ...verboseDepDiffs(depDiffs),
    ],
  ),
  'Changed (transitive deps updated)': changed
    .toSorted(byKey)
    .flatMap(({ key, sources, depDiffs }) => [
      `  ~ ${formatSnapshotKey(key)}${formatSources(sources)}`,
      ...verboseDepDiffs(depDiffs),
    ]),
}).filter(([, lines]) => lines.length > 0);

if (sections.length === 0) {
  console.log('✅ No runtime dependency changes detected.');
} else {
  for (const [title, lines] of sections) {
    // The empty string ends the section with a blank line.
    console.log([`${title}:`, ...lines, ''].join('\n'));
  }
  console.log(
    '⚠️  Runtime dependencies changed — a full Chromatic build is recommended.',
  );
  process.exitCode = EXIT_DEPS_CHANGED;
}
