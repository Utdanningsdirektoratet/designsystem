import { writeFile } from 'node:fs/promises';
import process from 'node:process';
import semanticReleaseFn, {
  type BranchSpec,
  type Options,
} from 'semantic-release';
import { writerOpts } from './changelog-writer-opts.js';

export interface SemanticReleaseOptions {
  branch: string;
  dryRun: boolean;
  previewChangelog: boolean;
  publish: boolean;
  /** Override the git remote URL (useful for local E2E testing). */
  repositoryUrl?: string;
}

/**
 * Run a semantic-release cycle.
 *
 * This function replaces the previous Nx-based release wrapper. It retains the
 * same CLI surface (`--branch`, `--dry-run`, `--preview-changelog`, `--publish`)
 * so that the existing CI workflows continue to work without changes.
 */
export async function semanticRelease(options: SemanticReleaseOptions) {
  console.log('Running semantic-release…');

  const config = buildSemanticReleaseConfig(options);

  // Override environment so that `env-ci` (used internally by semantic-release)
  // resolves the correct branch — especially important for the
  // `--preview-changelog` mode which runs on PR branches, not release branches.
  const env: Record<string, string | undefined> = { ...process.env };
  env['GITHUB_ACTIONS'] = 'true';
  env['GITHUB_REF'] = `refs/heads/${options.branch}`;
  env['GITHUB_EVENT_NAME'] =
    env['GITHUB_EVENT_NAME'] === 'pull_request'
      ? 'push'
      : (env['GITHUB_EVENT_NAME'] ?? 'push');
  delete env['GITHUB_HEAD_REF'];

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
    // Write generated notes to CHANGELOG.md so that preview-changelogs.sh
    // can pick them up and post them as a PR comment.
    if (nextRelease.notes) {
      await writeFile('CHANGELOG.md', nextRelease.notes, 'utf-8');
      console.log('Changelog preview written to CHANGELOG.md');
    }
    return;
  }

  if (options.dryRun) {
    console.log('Dry-run complete — no changes were made.');
    return;
  }

  console.log('Release published successfully.');
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
  // Pre-release channels
  { name: 'release/next', prerelease: 'next', channel: 'next' },
  {
    name: 'release/next-major',
    prerelease: 'next-major',
    channel: 'next-major',
  },
  { name: 'release/beta', prerelease: 'beta', channel: 'beta' },
  { name: 'release/alpha', prerelease: 'alpha', channel: 'alpha' },
];

function buildSemanticReleaseConfig(options: SemanticReleaseOptions): Options {
  const publishCmd = options.publish
    ? 'pnpm -r --filter "@udir-design/*" publish --no-git-checks --tag ${nextRelease.channel || "latest"} --access public'
    : undefined;

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
      [
        '@semantic-release/commit-analyzer',
        { preset: 'conventionalcommits' },
      ],

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
      //    and optionally publish to npm.
      [
        '@semantic-release/exec',
        {
          prepareCmd:
            'pnpm tsx @internal/ci/bin/sync-package-versions.ts ${nextRelease.version}',
          ...(publishCmd ? { publishCmd } : {}),
        },
      ],

      // 4. Create a GitHub release with the generated notes.
      //    Skipped when no GitHub token is available (e.g. local testing).
      ...(hasGitHubToken ? ['@semantic-release/github'] : []),
    ],
  };
}
