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

import { execFileSync } from 'node:child_process';

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

/** The fields this script uses from a workflow run in the GitHub API. */
interface WorkflowRun {
  id: number;
  head_sha: string;
  name: string;
}

/** Calls the GitHub REST API through the `gh` CLI and returns the parsed JSON. */
function ghApi(path: string) {
  // Capture stderr so gh's complaints end up in the thrown error.
  return JSON.parse(
    execFileSync('gh', ['api', path], { encoding: 'utf8', stdio: 'pipe' }),
  );
}

/** Runs git and returns its output without the trailing newline. */
function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe' }).trim();
}

/**
 * Runs a git command that answers a yes/no question with its exit code: 0 for
 * yes, 1 for no. Throws if git fails in any other way.
 */
function gitAnswers(args: string[]): boolean {
  try {
    git(args);
    return true;
  } catch (error) {
    if (error instanceof Error && 'status' in error && error.status === 1) {
      return false;
    }
    throw error;
  }
}

/** Recent completed workflow runs on the branch, newest first. */
function listRuns(): WorkflowRun[] {
  const branch = encodeURIComponent(BRANCH);
  try {
    const { workflow_runs: runs } = ghApi(
      `/repos/${REPO}/actions/runs?branch=${branch}&status=completed&per_page=${MAX_RUNS}`,
    );
    if (
      !Array.isArray(runs) ||
      !runs.every(
        (run) =>
          typeof run?.id === 'number' &&
          typeof run.head_sha === 'string' &&
          typeof run.name === 'string',
      )
    ) {
      throw new Error(
        'The response has no "workflow_runs" list with id, head_sha and name',
      );
    }
    return runs;
  } catch (cause) {
    throw new Error('Could not list workflow runs', { cause });
  }
}

/** Whether the workflow run has a Chromatic job that succeeded. */
function chromaticSucceeded(runId: number): boolean {
  try {
    const { jobs } = ghApi(
      `/repos/${REPO}/actions/runs/${runId}/jobs?per_page=100`,
    );
    if (
      !Array.isArray(jobs) ||
      !jobs.every(
        (job) =>
          typeof job?.name === 'string' &&
          (typeof job.conclusion === 'string' || job.conclusion === null),
      )
    ) {
      throw new Error(
        'The response has no "jobs" list with name and conclusion',
      );
    }
    return jobs.some(
      (job) => JOB_PATTERN.test(job.name) && job.conclusion === 'success',
    );
  } catch (cause) {
    throw new Error(`Could not list the jobs of workflow run ${runId}`, {
      cause,
    });
  }
}

function resolveBase(): string {
  if (!REPO || !BRANCH) {
    log(
      `Missing GITHUB_REPOSITORY ("${REPO}") or branch ("${BRANCH}"); using fallback "${FALLBACK}".`,
    );
    return FALLBACK;
  }

  const runs = listRuns();
  const head = git(['rev-parse', 'HEAD']);

  // Runs come back newest-first. A single commit can have several runs (e.g. the
  // CI run plus unrelated ones on the same SHA), so we must not dedupe by SHA
  // before confirming the Chromatic job — otherwise a non-Chromatic run could
  // mask the CI run on the same commit. We only skip a SHA once it's a candidate.
  // The chain is lazy: each run is checked after the previous match was added,
  // and git and gh are no longer called once there are enough candidates.
  const candidates = new Set<string>();
  runs
    .values()
    .filter((run) => run.head_sha !== head && !candidates.has(run.head_sha))
    // Keep commits that are in the local clone (rev-parse exits 1 without a
    // message if not) and are ancestors of HEAD (merge-base exits 1 if not).
    .filter((run) =>
      gitAnswers([
        'rev-parse',
        '--verify',
        '--quiet',
        `${run.head_sha}^{commit}`,
      ]),
    )
    .filter((run) =>
      gitAnswers(['merge-base', '--is-ancestor', run.head_sha, 'HEAD']),
    )
    .filter((run) => chromaticSucceeded(run.id))
    .take(MAX_CANDIDATES)
    .forEach((run) => {
      log(
        `Ancestor with successful Chromatic build: ${run.head_sha} (run ${run.id} — ${run.name}).`,
      );
      candidates.add(run.head_sha);
    });

  if (candidates.size === 0) {
    log(
      `No ancestor commit with a successful Chromatic build found; using fallback "${FALLBACK}".`,
    );
    return FALLBACK;
  }

  // Pick the ancestor closest to HEAD (the commit Chromatic will baseline
  // against), i.e. with the fewest commits between it and HEAD. On a tie, the
  // first one found wins.
  const closest = candidates
    .values()
    .map((sha) => ({
      sha,
      distance: Number(git(['rev-list', '--count', `${sha}..HEAD`])),
    }))
    .reduce((best, next) => (next.distance < best.distance ? next : best));

  log(
    `Using ${closest.sha} as dependency-diff base (${closest.distance} commit(s) behind HEAD).`,
  );
  return closest.sha;
}

/**
 * Resolves the base, or falls back to `FALLBACK` if anything fails: a full
 * Chromatic comparison is the safe default, so this never fails the pipeline.
 */
function resolveBaseOrFallback(): string {
  try {
    return resolveBase();
  } catch (error) {
    log(
      `Could not resolve the dependency-diff base; using fallback "${FALLBACK}".`,
    );
    console.error(error);
    return FALLBACK;
  }
}

process.stdout.write(resolveBaseOrFallback());
