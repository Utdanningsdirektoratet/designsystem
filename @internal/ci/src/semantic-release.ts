import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import semanticReleaseFn, {
  type BranchSpec,
  type Options,
} from 'semantic-release';
import { writerOpts } from './changelog-writer-opts.js';

export interface SemanticReleaseOptions {
  branch: string;
  dryRun: boolean;
  dryRunFull: boolean;
  previewChangelog: boolean;
  publish: boolean;
  /** Override the git remote URL (useful for local E2E testing). */
  repositoryUrl?: string;
}

/**
 * Run a semantic-release cycle.
 *
 * Modes:
 * - `--dry-run` (default): analyse commits and generate notes without publishing.
 * - `--preview-changelog`: dry-run + write notes to `CHANGELOG.md` for PR preview.
 * - `--publish`: real release — stage packages on npm (awaiting manual approval).
 * - `--dry-run-full`: full E2E in a sandbox (temp git repo, no real publish).
 */
export async function semanticRelease(options: SemanticReleaseOptions) {
  if (options.dryRunFull) {
    await runInSandbox(options);
  } else {
    await runAgainstRemote(options);
  }
}

// ─── Real remote ─────────────────────────────────────────────────────────────

/**
 * Run semantic-release against the real remote.
 *
 * Used for `--dry-run`, `--preview-changelog`, and `--publish`. These modes
 * require the release branch to exist on the remote.
 */
async function runAgainstRemote(options: SemanticReleaseOptions) {
  const label = options.previewChangelog
    ? 'preview changelog'
    : options.dryRun
      ? 'dry-run'
      : 'publish';
  console.log(`Running semantic-release — ${label}…`);

  const config = buildSemanticReleaseConfig(options);
  const env = buildEnv(options);
  const isDryRun = options.dryRun || options.previewChangelog;

  const result = await semanticReleaseFn(
    { ...config, dryRun: isDryRun },
    {
      cwd: process.cwd(),
      env: env as NodeJS.ProcessEnv,
      stdout: process.stdout,
      stderr: process.stderr,
    },
  );

  if (!result) {
    console.log('No release is needed — no relevant commits found.');
    process.exit(0);
  }

  const { nextRelease } = result;
  console.log(
    `\nRelease: ${nextRelease.gitTag} (channel: ${nextRelease.channel ?? 'latest'})`,
  );

  if (options.previewChangelog) {
    if (nextRelease.notes) {
      await writeFile('CHANGELOG.md', nextRelease.notes, 'utf-8');
      console.log('Changelog preview written to CHANGELOG.md');
    }
  } else if (options.dryRun) {
    console.log('Dry-run complete — no changes were made.');
  } else {
    console.log(
      'Release staged successfully. Run `pnpm stage list` to see staged packages,',
      'then `pnpm stage approve <id> --otp <otp>` to publish.',
    );
  }
}

// ─── Sandbox (temp repo) ─────────────────────────────────────────────────────

// TODO: Consider removing `--dry-run-full` / `runInSandbox` once the
// semantic-release migration has been verified through a few real releases.
// The regular `--dry-run` mode covers day-to-day needs; the sandbox exists
// primarily to validate the migration end-to-end.

/**
 * Run the full semantic-release pipeline in a sandbox.
 *
 * Creates a temporary bare git repo, runs semantic-release in non-dry-run mode
 * against it, but uses `pnpm stage publish --dry-run` so nothing is actually
 * uploaded. This tests the entire orchestration: branch resolution, tag
 * analysis, commit analysis, note generation, version sync, and publish
 * validation — without affecting the real remote.
 *
 * Uses the actual remote branch (not HEAD) so that existing tags are reachable
 * and semantic-release finds the correct baseline.
 *
 * Package.json files and git tags are restored after the run.
 */
async function runInSandbox(options: SemanticReleaseOptions) {
  console.log('Running semantic-release — full E2E dry-run (sandbox)…');

  const tempDir = mkdtempSync(join(tmpdir(), 'semantic-release-'));
  const tempRepo = join(tempDir, 'repo.git');

  // Record existing local tags so we can remove any new ones in cleanup
  const tagsBefore = new Set(
    execSync('git tag --list', { encoding: 'utf-8' }).trim().split('\n'),
  );

  try {
    // Set up a throwaway bare repo mirroring the remote release branches.
    // Use the actual remote branch (not HEAD) so existing tags are reachable.
    execSync(`git init --bare "${tempRepo}"`, { stdio: 'pipe' });
    execSync(
      `git push "${tempRepo}" origin/${options.branch}:refs/heads/${options.branch} --tags`,
      { stdio: 'pipe' },
    );
    execSync(
      `git --git-dir="${tempRepo}" symbolic-ref HEAD refs/heads/${options.branch}`,
      { stdio: 'pipe' },
    );

    // Push semantic-release git notes so the sandbox can find prior releases.
    // Without notes, semantic-release treats all tags as unrecognised and
    // falls back to scanning the entire commit history.
    try {
      execSync(
        `git push "${tempRepo}" "refs/notes/semantic-release*:refs/notes/semantic-release*"`,
        { stdio: 'pipe' },
      );
    } catch {
      // Notes may not exist yet (e.g. before bootstrap)
    }

    // Mirror all remote release/* branches into the temp repo.
    // semantic-release validates that at least one release-type branch
    // (non-prerelease) exists, even when running on a prerelease branch.
    const remoteRefs = execSync('git ls-remote --heads origin "release/*"', {
      encoding: 'utf-8',
    }).trim();
    for (const line of remoteRefs.split('\n')) {
      if (!line) continue;
      const [hash, ref] = line.split('\t');
      const branchName = ref.replace('refs/heads/', '');
      if (branchName === options.branch) continue; // already pushed above
      try {
        execSync(`git push "${tempRepo}" ${hash}:${ref}`, { stdio: 'pipe' });
      } catch {
        // Skip branches whose commits aren't available locally
      }
    }

    const config = buildSemanticReleaseConfig({
      ...options,
      publish: true, // enable publishCmd so the publish step runs
      repositoryUrl: options.repositoryUrl ?? `file://${tempRepo}`,
    });
    const env = buildEnv(options);

    const result = await semanticReleaseFn(
      { ...config, dryRun: false },
      {
        cwd: process.cwd(),
        env: env as NodeJS.ProcessEnv,
        stdout: process.stdout,
        stderr: process.stderr,
      },
    );

    if (!result) {
      console.log('No release is needed — no relevant commits found.');
      return;
    }

    const { nextRelease } = result;
    console.log(
      `\nFull dry-run complete: ${nextRelease.gitTag}`,
      `(channel: ${nextRelease.channel ?? 'latest'})`,
    );
    if (nextRelease.notes) {
      console.log('\n--- Generated changelog ---\n');
      console.log(nextRelease.notes);
    }
    console.log(
      'The full pipeline ran successfully. No packages were published',
      'and no tags were pushed to the real remote.',
    );
  } finally {
    // Restore package.json files modified by sync-package-versions.ts
    try {
      execSync('git checkout -- @udir-design/*/package.json', {
        stdio: 'pipe',
      });
    } catch {
      // Ignore — files may not have been modified if the run failed early
    }
    // Remove any git tags created during the sandbox run
    try {
      const tagsAfter = execSync('git tag --list', { encoding: 'utf-8' })
        .trim()
        .split('\n');
      for (const tag of tagsAfter) {
        if (tag && !tagsBefore.has(tag)) {
          execSync(`git tag -d "${tag}"`, { stdio: 'pipe' });
        }
      }
    } catch {
      // Ignore cleanup errors
    }
    // Remove the temporary bare repo
    rmSync(tempDir, { recursive: true, force: true });
  }
}

// ─── Environment ─────────────────────────────────────────────────────────────

/**
 * Build an env object that makes `env-ci` (used internally by semantic-release)
 * resolve the correct branch. This is especially important for:
 * - `--preview-changelog` mode (runs on PR branches, not release branches)
 * - Local testing (no CI env vars set)
 */
function buildEnv(
  options: SemanticReleaseOptions,
): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = { ...process.env };
  env['GITHUB_ACTIONS'] = 'true';
  env['GITHUB_REF'] = `refs/heads/${options.branch}`;
  env['GITHUB_EVENT_NAME'] =
    env['GITHUB_EVENT_NAME'] === 'pull_request'
      ? 'push'
      : (env['GITHUB_EVENT_NAME'] ?? 'push');
  delete env['GITHUB_HEAD_REF'];
  return env;
}

// ─── Semantic-release configuration ──────────────────────────────────────────

/**
 * The `branches` array maps directly from the former `defaultReleaseConfigs`.
 *
 * semantic-release matches the current git branch against this list and
 * determines the channel, pre-release identifier, etc. automatically.
 *
 * See https://semantic-release.org/foundation/workflow-configuration/
 */
const branches: BranchSpec[] = [
  // Maintenance releases (e.g. release/1.x, release/2.3.x)
  // Channel strips the `release/` prefix → npm tag `1.x`, `2.3.x`, etc.
  {
    name: 'release/+([0-9])?(.{+([0-9]),x}).x',
    channel: '${name.replace(/^release\\//g, "")}',
  },
  // Stable latest channel (`false` = default dist-tag, i.e. @latest on npm)
  { name: 'release/latest', channel: false },
  // Pre-release channel
  // TODO: Remove after the first stable release on release/latest
  { name: 'release/beta', prerelease: 'beta', channel: 'beta' },
];

function buildSemanticReleaseConfig(options: SemanticReleaseOptions): Options {
  let publishCmd: string | undefined;

  if (options.publish && options.dryRunFull) {
    // Full dry-run: validate publish without uploading.
    // The echo adds context for OIDC warnings that pnpm emits outside
    // GitHub Actions (provenance tokens are unavailable locally).
    publishCmd =
      'echo "\nℹ  OIDC/provenance warnings below are expected outside GitHub Actions CI.\n" && pnpm -r --filter "@udir-design/*" stage publish --dry-run --no-git-checks --tag ${nextRelease.channel || "latest"} --access public';
  } else if (options.publish) {
    // Real release: stage packages (awaiting manual approval)
    publishCmd =
      'pnpm -r --filter "@udir-design/*" stage publish --no-git-checks --tag ${nextRelease.channel || "latest"} --access public';
  }

  const hasGitHubToken = Boolean(
    process.env['GH_TOKEN'] || process.env['GITHUB_TOKEN'],
  );

  return {
    branches,
    // v1.2.3 → tag "v1.2.3" — matches the existing tag format
    tagFormat: 'v${version}',
    // Allow running outside strict CI environments (e.g. local testing)
    ci: false,
    // Allow overriding the repository URL (e.g. for local E2E testing)
    ...(options.repositoryUrl ? { repositoryUrl: options.repositoryUrl } : {}),
    plugins: [
      // 1. Determine the version bump from conventional commits.
      //    Default rules: feat→minor, fix/perf/revert→patch,
      //    BREAKING CHANGE→major.
      ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],

      // 2. Generate release notes — built-in plugin with custom writerOpts
      //    that adds commit body text below each entry.
      [
        '@semantic-release/release-notes-generator',
        {
          preset: 'conventionalcommits',
          writerOpts,
        },
      ],

      // 3. Sync the resolved version to every publishable package.json
      //    and optionally stage-publish to npm.
      [
        '@semantic-release/exec',
        {
          prepareCmd:
            'pnpm tsx @internal/ci/bin/sync-package-versions.ts ${nextRelease.version}',
          ...(publishCmd ? { publishCmd } : {}),
        },
      ],

      // 4. Create a GitHub release with the generated notes.
      //    Skipped when no GitHub token is available (e.g. local testing)
      //    or during sandbox runs.
      ...(hasGitHubToken && options.publish && !options.dryRunFull
        ? ['@semantic-release/github']
        : []),
    ],
  };
}
