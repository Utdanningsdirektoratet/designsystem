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
 *   0 - No runtime dependency changes detected
 *   1 - Runtime dependencies changed (trigger a full Chromatic build)
 *   2 - Error (e.g. could not read the base lockfile from git)
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { load as parseYaml } from 'js-yaml';
import yargs, { type Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  type Lockfile,
  type PackageJson,
  buildClosure,
  compareClosure,
  computeSources,
  formatSnapshotKey,
  formatSources,
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

/** Returns the package.json for a workspace package read from git, or null. */
function readPkgJsonFromGit(
  repoRoot: string,
  base: string,
  pkgName: string,
): PackageJson | null {
  try {
    const text = execSync(`git show ${base}:${pkgName}/package.json`, {
      cwd: repoRoot,
      encoding: 'utf-8',
    });
    return JSON.parse(text) as PackageJson;
  } catch {
    return null;
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

(async () => {
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

  const headLockfile = parseYaml(
    fs.readFileSync(lockfilePath, 'utf-8'),
  ) as Lockfile;

  let baseLockfile: Lockfile;
  try {
    const text = execSync(`git show ${options.base}:pnpm-lock.yaml`, {
      cwd: repoRoot,
      encoding: 'utf-8',
    });
    baseLockfile = parseYaml(text) as Lockfile;
  } catch {
    console.error(
      `Error: could not read pnpm-lock.yaml from ref "${options.base}". ` +
        `Make sure the ref exists and the lockfile is tracked by git.`,
    );
    process.exit(2);
  }

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
  const baseReadPkgJson = (pkgName: string) => {
    const basePkg = readPkgJsonFromGit(repoRoot, options.base, pkgName);
    // If the base package.json doesn't declare a devDependency-tracking field
    // yet, borrow the classification from HEAD so that both sides track the
    // same set of devDependencies. Without this, introducing (or switching)
    // the field on a branch would cause every tracked devDep to appear as
    // "added". `trackedDevDependencies` takes precedence, matching
    // `parseTrackedDepNames`.
    if (
      basePkg &&
      !basePkg.trackedDevDependencies &&
      !basePkg.untrackedDevDependencies
    ) {
      const headPkg = readPkgJsonFromDisk(repoRoot, pkgName);
      if (headPkg?.trackedDevDependencies) {
        basePkg.trackedDevDependencies = headPkg.trackedDevDependencies;
      } else if (headPkg?.untrackedDevDependencies) {
        basePkg.untrackedDevDependencies = headPkg.untrackedDevDependencies;
      }
    }
    return basePkg;
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
  const hasChanges =
    added.length > 0 ||
    removed.length > 0 ||
    peerDepsChanged.length > 0 ||
    changed.length > 0;

  if (!hasChanges) {
    console.log('✅ No runtime dependency changes detected.');
    process.exit(0);
  }

  if (removed.length > 0) {
    console.log('Removed:');
    for (const { key, sources } of removed.sort((a, b) =>
      a.key.localeCompare(b.key),
    )) {
      console.log(`  - ${formatSnapshotKey(key)}${formatSources(sources)}`);
    }
    console.log();
  }

  if (added.length > 0) {
    console.log('Added:');
    for (const { key, sources } of added.sort((a, b) =>
      a.key.localeCompare(b.key),
    )) {
      console.log(`  + ${formatSnapshotKey(key)}${formatSources(sources)}`);
    }
    console.log();
  }

  if (peerDepsChanged.length > 0) {
    console.log('Peer deps changed:');
    for (const { formattedKey, sources, depDiffs } of peerDepsChanged) {
      console.log(`  ~ ${formattedKey}${formatSources(sources)}`);
      if (options.verbose) {
        for (const { name, from, to } of depDiffs) {
          if (from === undefined) {
            console.log(`      + ${name}: ${to}`);
          } else if (to === undefined) {
            console.log(`      - ${name}: ${from}`);
          } else {
            console.log(`      ~ ${name}: ${from} → ${to}`);
          }
        }
      }
    }
    console.log();
  }

  if (changed.length > 0) {
    console.log('Changed (transitive deps updated):');
    for (const { key, depDiffs, sources } of changed.sort((a, b) =>
      a.key.localeCompare(b.key),
    )) {
      console.log(`  ~ ${formatSnapshotKey(key)}${formatSources(sources)}`);
      if (options.verbose) {
        for (const { name, from, to } of depDiffs) {
          if (from === undefined) {
            console.log(`      + ${name}: ${to}`);
          } else if (to === undefined) {
            console.log(`      - ${name}: ${from}`);
          } else {
            console.log(`      ~ ${name}: ${from} → ${to}`);
          }
        }
      }
    }
    console.log();
  }

  console.log(
    '⚠️  Runtime dependencies changed — a full Chromatic build is recommended.',
  );
  process.exit(1);
})();
