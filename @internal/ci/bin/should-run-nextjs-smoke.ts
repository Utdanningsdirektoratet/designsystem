#!/usr/bin/env -S pnpm tsx

/**
 * Determines whether the Next.js smoke test should run.
 *
 * Decision logic:
 *   (IS_PR_READY || IS_PUSH) && test-app-nextjs#build is affected
 *
 * Reads from environment variables:
 *   IS_PR_READY - "true" if the PR is open and not a draft
 *   IS_PUSH     - "true" if the event is a push to a protected branch
 *
 * Outputs "true" or "false" to stdout (no trailing newline).
 * Also prints diagnostic info to stderr for CI logging.
 * Exits non-zero if turbo fails.
 */

import { isTaskAffected, reportDecision } from '../src/ci-decision.js';

const IS_PR_READY = process.env['IS_PR_READY'] === 'true';
const IS_PUSH = process.env['IS_PUSH'] === 'true';
const nextjsAffected = isTaskAffected('test-app-nextjs', 'build');

const shouldRun = (IS_PR_READY || IS_PUSH) && nextjsAffected;

reportDecision(
  {
    'Is this a PR which is ready for review?': IS_PR_READY,
    'Is test-app-nextjs#build affected?': nextjsAffected,
    'Is this a push to a protected branch?': IS_PUSH,
  },
  'should we run Next.js smoke test?',
  shouldRun,
);
