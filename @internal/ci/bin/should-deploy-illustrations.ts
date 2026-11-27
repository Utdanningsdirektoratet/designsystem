#!/usr/bin/env -S pnpm tsx

/**
 * Determines whether the illustrations app should be deployed.
 *
 * Decision logic:
 *   IS_DISPATCH || apps-illustrations#build is affected || workflow file is modified
 *
 * Reads from environment variables:
 *   IS_DISPATCH - "true" if the event is a workflow_dispatch
 *
 * Outputs "true" or "false" to stdout (no trailing newline).
 * Also prints diagnostic info to stderr for CI logging.
 * Exits non-zero if turbo fails.
 */

import { execFileSync } from 'node:child_process';
import { isTaskAffected, reportDecision } from '../src/ci-decision.js';

const IS_DISPATCH = process.env['IS_DISPATCH'] === 'true';
const appAffected = isTaskAffected('@udir-design/apps-illustrations', 'build');
// is-file-modified.sh prints "false" if git fails, so this only throws if the
// script can't be started at all.
const workflowModified =
  execFileSync(
    './@internal/ci/bin/is-file-modified.sh',
    ['.github/workflows/azure-illustrations-deploy.yml'],
    { encoding: 'utf8' },
  ).trim() === 'true';

const shouldDeploy = IS_DISPATCH || appAffected || workflowModified;

reportDecision(
  {
    'Is @udir-design/apps-illustrations#build affected?': appAffected,
    'Is the deployment workflow modified?': workflowModified,
    'Is the deploy triggered through a manual workflow dispatch?': IS_DISPATCH,
  },
  'should we deploy the illustrations app?',
  shouldDeploy,
);
