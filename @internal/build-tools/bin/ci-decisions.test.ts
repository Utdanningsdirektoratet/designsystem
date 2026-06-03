/**
 * Integration tests for the CI decision scripts.
 *
 * These tests spawn the actual scripts as subprocesses and verify output/exit-code.
 * Requirements:
 * - git history available (fetch-depth > 0 in CI)
 * - `turbo` binary available (installed via pnpm)
 * - `pnpm tsx` available
 */

import { execSync, spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const binDir = import.meta.dirname;
const repoRoot = resolve(binDir, '../../..');

/** Helper to run a tsx script and capture stdout + stderr + exit code. */
function runScript(
  scriptName: string,
  env: Record<string, string> = {},
): { stdout: string; stderr: string; exitCode: number } {
  const scriptPath = resolve(binDir, scriptName);
  const result = spawnSync('pnpm', ['tsx', scriptPath], {
    encoding: 'utf-8',
    env: { ...process.env, ...env },
    cwd: repoRoot,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  return {
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    exitCode: result.status ?? 1,
  };
}

function isCleanWorkingTree(): boolean {
  try {
    execSync('git diff --quiet && git diff --cached --quiet', {
      cwd: repoRoot,
      stdio: 'pipe',
    });
    const untracked = execSync('git ls-files --others --exclude-standard', {
      cwd: repoRoot,
      encoding: 'utf-8',
    }).trim();
    return untracked === '';
  } catch {
    return false;
  }
}

describe('should-run-ui-tests', () => {
  it('returns "true" on push events regardless of affected state', () => {
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'false',
      IS_PUSH: 'true',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe('true');
  });

  it('simulates push-to-main in CI: IS_PUSH bypasses affected check', () => {
    // In CI on push, TURBO_SCM_BASE is set to github.event.before (the previous
    // commit on the branch). Turbo correctly diffs the new commits. But IS_PUSH=true
    // means UI tests run unconditionally regardless of the affected result.
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'false',
      IS_PUSH: 'true',
      TURBO_SCM_BASE: 'HEAD~1', // Simulates github.event.before (previous commit)
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe('true');
  });

  it('returns "false" for draft PRs even if react is affected', () => {
    // IS_PR_READY=false means draft; even if react is affected (TURBO_SCM_BASE=main
    // simulates a PR branch with changes), the result is false because the
    // PR-ready condition fails.
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'false',
      IS_PUSH: 'false',
      TURBO_SCM_BASE: 'main',
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe('false');
  });

  it('returns "false" when PR is ready but react is not affected', () => {
    const clean = isCleanWorkingTree();
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'true',
      IS_PUSH: 'false',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.exitCode).toBe(0);
    if (clean) {
      expect(result.stdout).toBe('false');
    } else {
      // Dirty tree: turbo may report affected, so just check valid output
      expect(['true', 'false']).toContain(result.stdout);
    }
  });

  it('returns "false" when neither push nor PR ready', () => {
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'false',
      IS_PUSH: 'false',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe('false');
  });

  it('outputs diagnostics to stderr', () => {
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'true',
      IS_PUSH: 'false',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.stderr).toContain('Conclusion');
    expect(result.stderr).toContain('should we run UI tests');
  });

  it('outputs no trailing newline on stdout', () => {
    const result = runScript('should-run-ui-tests.ts', {
      IS_PR_READY: 'false',
      IS_PUSH: 'true',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.stdout).not.toContain('\n');
  });
});

describe('should-deploy-testapp', () => {
  it('returns "true" on workflow_dispatch regardless of affected state', () => {
    const result = runScript('should-deploy-testapp.ts', {
      IS_DISPATCH: 'true',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe('true');
  });

  it('returns "false" when no dispatch and nothing affected (clean tree)', () => {
    const clean = isCleanWorkingTree();
    const result = runScript('should-deploy-testapp.ts', {
      IS_DISPATCH: 'false',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.exitCode).toBe(0);
    if (clean) {
      expect(result.stdout).toBe('false');
    } else {
      expect(['true', 'false']).toContain(result.stdout);
    }
  });

  it('simulates push-to-main in CI (TURBO_SCM_BASE=previous commit)', () => {
    // In CI on push to main, TURBO_SCM_BASE is set to github.event.before
    // (the previous branch HEAD). Turbo diffs against that commit to detect which
    // packages were affected by the new push/merge.
    const result = runScript('should-deploy-testapp.ts', {
      IS_DISPATCH: 'false',
      TURBO_SCM_BASE: 'HEAD~1', // Simulates github.event.before
    });
    expect(result.exitCode).toBe(0);
    // With a real previous commit as base, turbo can detect affected packages.
    // The exact result depends on what changed in the last commit.
    expect(['true', 'false']).toContain(result.stdout);
  });

  it('outputs diagnostics to stderr', () => {
    const result = runScript('should-deploy-testapp.ts', {
      IS_DISPATCH: 'false',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.stderr).toContain('Conclusion');
    expect(result.stderr).toContain('should we deploy');
  });

  it('outputs no trailing newline on stdout', () => {
    const result = runScript('should-deploy-testapp.ts', {
      IS_DISPATCH: 'true',
      TURBO_SCM_BASE: 'HEAD',
    });
    expect(result.stdout).not.toContain('\n');
  });
});
