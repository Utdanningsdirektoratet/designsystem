#!/usr/bin/env -S pnpm tsx

/**
 * Resolves the base git ref that `diff-runtime-deps.ts` should compare against
 * when deciding between a TurboSnap and a full Chromatic build.
 *
 * Why this exists:
 *   The naive base is the PR target branch (`TURBO_SCM_BASE`, e.g. origin/main).
 *   But once *any* commit in a PR changes a runtime dependency, diffing the whole
 *   PR against main keeps reporting "deps changed" for every subsequent push, so
 *   TurboSnap stays disabled even when the newly pushed commits touch no
 *   dependencies at all.
 *
 *   Chromatic picks its TurboSnap baseline as the most recent *ancestor commit
 *   that already has a Chromatic build*. At that commit the full visual state was
 *   captured with whatever dependencies existed there, so the only thing that can
 *   invalidate TurboSnap (which traces source files, not node_modules) is a
 *   runtime dependency change *relative to that commit*. Diffing dependencies
 *   against that same commit therefore lets us safely re-enable TurboSnap.
 *
 * What it does:
 *   Queries the GitHub Actions API for recent workflow runs on the current
 *   branch, finds those whose Chromatic job concluded successfully, keeps the
 *   ones whose head commit is an ancestor of HEAD, and returns the closest such
 *   ancestor. If none is found (e.g. the branch was just created, force-pushed,
 *   or never had a green Chromatic build), it falls back to `TURBO_SCM_BASE`.
 *
 * This script never fails the pipeline: on any error it prints the fallback ref.
 *
 * Environment variables:
 *   TURBO_SCM_BASE     - fallback base ref (default: "main")
 *   GITHUB_REPOSITORY  - "owner/repo" (provided by GitHub Actions)
 *   GITHUB_HEAD_REF    - PR head branch (set on pull_request events)
 *   GITHUB_REF_NAME    - branch name (used when GITHUB_HEAD_REF is empty)
 *   GH_TOKEN           - token used by the `gh` CLI
 *
 * Tunables (optional):
 *   CHROMATIC_BASE_MAX_RUNS       - how many recent runs to scan (default: 40)
 *   CHROMATIC_BASE_MAX_CANDIDATES - stop after this many matches (default: 5)
 *
 * Outputs the resolved base ref to stdout (no trailing newline).
 * Diagnostics go to stderr so they don't pollute the captured stdout.
 */

import { execSync } from 'node:child_process';

/** Write to stderr so diagnostics appear in CI logs without affecting captured stdout. */
function log(msg: string) {
  process.stderr.write(msg + '\n');
}

const FALLBACK = process.env['TURBO_SCM_BASE'] || 'main';
const REPO = process.env['GITHUB_REPOSITORY'] || '';
const BRANCH =
  process.env['GITHUB_HEAD_REF'] || process.env['GITHUB_REF_NAME'] || '';
const JOB_PATTERN = /chromatic/i;
const MAX_RUNS = Number(process.env['CHROMATIC_BASE_MAX_RUNS'] || '40');
const MAX_CANDIDATES = Number(
  process.env['CHROMATIC_BASE_MAX_CANDIDATES'] || '5',
);

interface WorkflowRun {
  id: number;
  head_sha: string;
  path: string;
  name: string;
}

interface Job {
  name: string;
  conclusion: string | null;
}

function gh<T>(pathAndQuery: string): T {
  const out = execSync(`gh api "${pathAndQuery}"`, {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return JSON.parse(out) as T;
}

function headSha(): string {
  return execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
}

function commitExists(sha: string): boolean {
  try {
    execSync(`git cat-file -e "${sha}^{commit}"`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function isAncestorOfHead(sha: string): boolean {
  try {
    execSync(`git merge-base --is-ancestor ${sha} HEAD`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** Number of commits between `sha` (exclusive) and HEAD. Lower == closer to HEAD. */
function distanceToHead(sha: string): number {
  try {
    const out = execSync(`git rev-list --count ${sha}..HEAD`, {
      encoding: 'utf-8',
    });
    return Number(out.trim());
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

function chromaticSucceeded(runId: number): boolean {
  try {
    const data = gh<{ jobs: Job[] }>(
      `/repos/${REPO}/actions/runs/${runId}/jobs?per_page=100`,
    );
    return (data.jobs ?? []).some(
      (j) => JOB_PATTERN.test(j.name) && j.conclusion === 'success',
    );
  } catch {
    return false;
  }
}

function resolveBase(): string {
  if (!REPO || !BRANCH) {
    log(
      `Missing GITHUB_REPOSITORY ("${REPO}") or branch ("${BRANCH}"); using fallback "${FALLBACK}".`,
    );
    return FALLBACK;
  }

  let runs: WorkflowRun[];
  try {
    const data = gh<{ workflow_runs: WorkflowRun[] }>(
      `/repos/${REPO}/actions/runs?branch=${encodeURIComponent(
        BRANCH,
      )}&status=completed&per_page=${MAX_RUNS}`,
    );
    runs = data.workflow_runs ?? [];
  } catch (err) {
    log(`Could not list workflow runs: ${(err as Error).message}`);
    return FALLBACK;
  }

  const head = headSha();
  const candidates: string[] = [];

  // Runs come back newest-first. A single commit can have several runs (e.g. the
  // CI run plus unrelated ones on the same SHA), so we must not dedupe by SHA
  // before confirming the Chromatic job — otherwise a non-Chromatic run could
  // mask the CI run on the same commit. We only skip a SHA once it's a candidate.
  for (const run of runs) {
    if (candidates.length >= MAX_CANDIDATES) break;
    const sha = run.head_sha;
    if (!sha || sha === head || candidates.includes(sha)) continue;
    if (!commitExists(sha)) continue;
    if (!isAncestorOfHead(sha)) continue;
    if (!chromaticSucceeded(run.id)) continue;
    log(
      `Ancestor with successful Chromatic build: ${sha} (run ${run.id} — ${run.name}).`,
    );
    candidates.push(sha);
  }

  if (candidates.length === 0) {
    log(
      `No ancestor commit with a successful Chromatic build found; using fallback "${FALLBACK}".`,
    );
    return FALLBACK;
  }

  // Pick the ancestor closest to HEAD (the commit Chromatic will baseline against).
  let best = candidates[0]!;
  let bestDistance = distanceToHead(best);
  for (const sha of candidates.slice(1)) {
    const distance = distanceToHead(sha);
    if (distance < bestDistance) {
      best = sha;
      bestDistance = distance;
    }
  }

  log(
    `Using ${best} as dependency-diff base (${bestDistance} commit(s) behind HEAD).`,
  );
  return best;
}

process.stdout.write(resolveBase());
