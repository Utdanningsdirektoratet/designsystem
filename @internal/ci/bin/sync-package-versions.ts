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

import { readFileSync, writeFileSync } from 'node:fs';
import fg from 'fast-glob';

const version = process.argv[2];
if (!version) {
  console.error('Usage: sync-package-versions.ts <version>');
  process.exit(1);
}

const packageJsonPaths = fg.sync('@udir-design/*/package.json');

let updated = 0;
for (const path of packageJsonPaths) {
  const pkg = JSON.parse(readFileSync(path, 'utf-8'));
  if (!pkg.publishConfig) continue; // skip non-publishable packages
  const previous = pkg.version;
  pkg.version = version;
  writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`  ${pkg.name}: ${previous} → ${version}`);
  updated++;
}

console.log(`\nUpdated ${updated} package(s) to version ${version}`);
