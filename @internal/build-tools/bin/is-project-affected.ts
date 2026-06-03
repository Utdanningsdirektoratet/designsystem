#!/usr/bin/env -S pnpm tsx

/**
 * Check if a package is affected by changes between the current branch and base.
 * Uses Turborepo's affected detection (package graph + git diff).
 *
 * Usage: is-project-affected.sh @udir-design/react
 * Outputs "true" or "false".
 */

import { execSync } from 'node:child_process';

const packageName = process.argv[2];

if (!packageName) {
  console.error('Usage: is-project-affected.ts <package-name>');
  process.exit(1);
}

try {
  const output = execSync(
    `pnpm turbo ls --affected --filter="${packageName}" --output json`,
    { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] },
  );
  const result = JSON.parse(output);
  process.stdout.write(result.packages.count > 0 ? 'true' : 'false');
} catch {
  process.stdout.write('false');
}
