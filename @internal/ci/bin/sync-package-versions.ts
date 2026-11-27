#!/usr/bin/env -S pnpm tsx

/**
 * Sync a version string into every publishable package's `package.json`.
 *
 * A package is considered publishable when its `package.json` contains a
 * `publishConfig` field. Private / internal packages are skipped.
 *
 * Usage:
 *   pnpm tsx @internal/ci/bin/sync-package-versions.ts <version>
 *
 * Called by `@semantic-release/exec` in the `prepare` lifecycle step.
 */

import { globSync, readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (!version) {
  console.error('Usage: sync-package-versions.ts <version>');
  process.exit(1);
}

// glob returns the files in directory order; sort so the output is stable
const packages = globSync('@udir-design/*/package.json')
  .toSorted()
  .map((path) => ({ path, pkg: JSON.parse(readFileSync(path, 'utf-8')) }))
  .filter(({ pkg }) => pkg.publishConfig); // skip non-publishable packages

for (const { path, pkg } of packages) {
  writeFileSync(path, JSON.stringify({ ...pkg, version }, null, 2) + '\n');
  console.log(`  ${pkg.name}: ${pkg.version} → ${version}`);
}

console.log(`\nUpdated ${packages.length} package(s) to version ${version}`);
