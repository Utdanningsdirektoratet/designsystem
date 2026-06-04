#!/usr/bin/env -S pnpm tsx

/**
 * Determines whether UI tests (Storybook tests + Chromatic) should run.
 *
 * Decision logic:
 *   (IS_PR_READY || IS_PUSH) && @udir-design/react is affected
 *
 * Reads from environment variables:
 *   IS_PR_READY - "true" if the PR is open and not a draft
 *   IS_PUSH     - "true" if the event is a push to a protected branch
 *
 * Outputs "true" or "false" to stdout (no trailing newline).
 * Also prints diagnostic info to stderr for CI logging.
 */

import { execSync } from 'node:child_process';

/** Write to stderr so diagnostics appear in CI logs without affecting captured stdout. */
function log(msg: string) {
  process.stderr.write(msg + '\n');
}

const IS_PR_READY = process.env['IS_PR_READY'] === 'true';
const IS_PUSH = process.env['IS_PUSH'] === 'true';

function isReactAffected(): boolean {
  try {
    const output = execSync(
      'pnpm turbo ls --affected --filter="@udir-design/react" --output json',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] },
    );
    const result = JSON.parse(output);
    return result.packages.count > 0;
  } catch {
    return false;
  }
}

const reactAffected = isReactAffected();

log(`Is this a PR which is ready for review? ${IS_PR_READY}`);
log(`Is @udir-design/react affected? ${reactAffected}`);
log(`Is this a push to a protected branch? ${IS_PUSH}`);

const shouldRun = (IS_PR_READY || IS_PUSH) && reactAffected;

log(`Conclusion: should we run UI tests? ${shouldRun}`);
process.stdout.write(String(shouldRun));
