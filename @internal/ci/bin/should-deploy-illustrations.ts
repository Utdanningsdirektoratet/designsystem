#!/usr/bin/env -S pnpm tsx

/**
 * Determines whether the illustrations app should be deployed.
 *
 * Decision logic:
 *   IS_DISPATCH || the illustrations app (or a dependency) is affected || workflow file is modified
 *
 * Reads from environment variables:
 *   IS_DISPATCH - "true" if the event is a workflow_dispatch
 *
 * Outputs "true" or "false" to stdout (no trailing newline).
 * Also prints diagnostic info to stderr for CI logging.
 */

import { execSync } from 'node:child_process';

/** Write to stderr so diagnostics appear in CI logs without affecting captured stdout. */
function log(msg: string) {
  process.stderr.write(msg + '\n');
}

const IS_DISPATCH = process.env['IS_DISPATCH'] === 'true';

function isAppAffected(): boolean {
  try {
    const output = execSync(
      'pnpm turbo ls --affected --filter="@udir-design/apps-illustrations" --output json',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] },
    );
    const result = JSON.parse(output);
    return result.packages.count > 0;
  } catch {
    return false;
  }
}

function isWorkflowModified(): boolean {
  try {
    const output = execSync(
      './@internal/ci/bin/is-file-modified.sh .github/workflows/azure-illustrations-deploy.yml',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] },
    );
    return output.trim() === 'true';
  } catch {
    return false;
  }
}

const appAffected = isAppAffected();
const workflowModified = isWorkflowModified();

log(`Is the illustrations app affected? ${appAffected}`);
log(`Is the deployment workflow modified? ${workflowModified}`);
log(
  `Is the deploy triggered through a manual workflow dispatch? ${IS_DISPATCH}`,
);

const shouldDeploy = IS_DISPATCH || appAffected || workflowModified;

log(`Conclusion: should we deploy the illustrations app? ${shouldDeploy}`);
process.stdout.write(String(shouldDeploy));
