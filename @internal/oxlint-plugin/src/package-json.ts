/** Utilities for locating a file's nearest package manifest. */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

/** Cached package directories for the lifetime of a lint run. */
const packageDirCache = new Map<string, string | null>();

/**
 * The nearest directory at or above `dir` holding a `package.json`, or `null` if
 * there is none all the way up to the filesystem root.
 *
 * `dir` need not exist: a path pointing at a missing file still resolves to
 * whichever package would own it.
 */
export function findPackageDir(dir: string): string | null {
  const cached = packageDirCache.get(dir);
  if (cached !== undefined) return cached;

  const packageDir = lookUpPackageDir(dir);
  packageDirCache.set(dir, packageDir);
  return packageDir;
}

/** Uncached lookup, called through {@link findPackageDir} to cache parent paths too. */
function lookUpPackageDir(dir: string): string | null {
  if (existsSync(join(dir, 'package.json'))) return dir;

  // `dirname` stops changing once it has reached the filesystem root.
  const parent = dirname(dir);
  return parent === dir ? null : findPackageDir(parent);
}

/**
 * Read a package name from `packageDir`, or return `null` when it has none.
 *
 * Invalid manifests are reported rather than silently skipping the boundary.
 */
export function readPackageName(packageDir: string): string | null {
  const manifestPath = join(packageDir, 'package.json');

  let manifest: { name?: unknown } | null;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (cause) {
    throw new Error(`Could not read \`${manifestPath}\``, { cause });
  }

  return typeof manifest?.name === 'string' ? manifest.name : null;
}
