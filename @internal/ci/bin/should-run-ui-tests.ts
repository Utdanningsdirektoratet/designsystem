#!/usr/bin/env -S pnpm tsx

/**
 * Determines whether UI tests (Storybook tests + Chromatic) should run.
 *
 * Decision logic:
 *   (IS_PR_READY || IS_PUSH) && @udir-design/react#build:storybook is affected
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
const reactAffected = isTaskAffected('@udir-design/react', 'build:storybook');

const shouldRun = (IS_PR_READY || IS_PUSH) && reactAffected;

reportDecision(
  {
    'Is this a PR which is ready for review?': IS_PR_READY,
    'Is @udir-design/react#build:storybook affected?': reactAffected,
    'Is this a push to a protected branch?': IS_PUSH,
  },
  'should we run UI tests?',
  shouldRun,
);
