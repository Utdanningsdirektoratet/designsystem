#!/usr/bin/env -S pnpm tsx

/**
 * Determines whether the Next.js test app should be deployed.
 *
 * Decision logic:
 *   IS_DISPATCH || test-app-nextjs#build is affected || workflow file is modified
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

function isNextjsAffected(): boolean {
  try {
    const output = execSync(
      'pnpm turbo run build --filter="test-app-nextjs" --affected --dry-run=json',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] },
    );
    const result = JSON.parse(output);
    return result.tasks.some(
      (t: { taskId: string }) => t.taskId === 'test-app-nextjs#build',
    );
  } catch {
    return false;
  }
}

function isWorkflowModified(): boolean {
  try {
    const output = execSync(
      './@internal/ci/bin/is-file-modified.sh .github/workflows/azure-testapp-deploy.yml',
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] },
    );
    return output.trim() === 'true';
  } catch {
    return false;
  }
}

const nextjsAffected = isNextjsAffected();
const workflowModified = isWorkflowModified();

log(`Is test-app-nextjs#build affected? ${nextjsAffected}`);
log(`Is the deployment workflow modified? ${workflowModified}`);
log(
  `Is the deploy triggered through a manual workflow dispatch? ${IS_DISPATCH}`,
);

const shouldDeploy = IS_DISPATCH || nextjsAffected || workflowModified;

log(`Conclusion: should we deploy the test app? ${shouldDeploy}`);
process.stdout.write(String(shouldDeploy));
