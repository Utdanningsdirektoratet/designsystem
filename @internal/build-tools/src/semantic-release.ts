import process from 'node:process';
import { execSync } from 'node:child_process';
import {
  releaseChangelog as nxCreateChangelog,
  releasePublish as nxPublishRelease,
  releaseVersion as nxUpdateVersion,
} from 'nx/release';
import { VersionOptions } from 'nx/src/command-line/release/command-object';
import micromatch from 'micromatch';

export interface ReleaseConfig {
  /**
   * Branch name. Can be a micromatch glob, see https://github.com/micromatch/micromatch?tab=readme-ov-file#matching-features
   */
  name: string;
  /**
   * Distribution channel to use (e.g. 'latest', 'next'). If not set, the branch name will be used,
   * without the 'release/' prefix if it is present.
   */
  channel?: string;
  /**
   * Create prerelease instead of a normal release
   * @default false
   */
  prerelease?: boolean;
}

interface SemanticReleaseOptions {
  branch: string;
  dryRun: boolean;
  previewChangelog: boolean;
  publish: boolean;
  verbose: boolean;
  commitVersionNumbers: boolean;
  commitChangelog: boolean;
  gitPush: boolean;
  releaseConfigs?: ReleaseConfig[];
}

/**
 * This function is a simple imitation of semantic-release — https://semantic-release.gitbook.io —
 * using 'nx release' under the hood to determine which versions should be bumped, and how.
 *
 * semantic-release itself does not support monorepos. However, this function enables us to use
 * the same flow as described in their documentation, while leveraging Nx to determine which
 * projects need to be versioned and released.
 *
 * The function's only purpose is to determine which distribution channel (npm tag) and release mode
 * (regular or prerelease) to use, based on the given branch name. There is also some logic to
 * handle the initial release, since transitioning from 0.x.x to 1.x.x versions can't be done
 * fully automatically.
 *
 * The rest of the responsibility is handed over to Nx's release command 'nx release'
 *
 * PREREQUISITES:
 * - Each package to be released needs to have a git tag `<package-name>@0.0.0` pointing to the repo's
 *   initial commit. This is used as the 'current version' before any release has been made.
 * - nx.json needs to have `release.version.conventionalCommits` set to `true`.
 *
 * PITFALLS:
 * - If the script which calls this function is not run from the workspace root, Nx can't auto-detect
 *   the package manager. To fix, set nx.json `cli.packageManager` to the correct package manager
 *   ("bun", "npm", "pnpm", or "yarn")
 * - The function has only been tested with pnpm as the package manager.
 */
export async function semanticRelease(options: SemanticReleaseOptions) {
  const releaseConfigs = options.releaseConfigs ?? defaultReleaseConfigs;
  console.log('Determining if a release should be made...');
  const config = getReleaseConfig(releaseConfigs, options.branch);

  if (!config) {
    console.log(
      `Branch '${options.branch}' does not match a configured release plan. It will not be released.`
    );
    process.exit();
  }

  console.log(`Found configuration for branch ${options.branch}:`);
  console.log('  - npm tag:', config.channel);
  console.log('  - prerelease mode:', config.prerelease);

  // Temporarily remove some local git tags that may interfere with versioning
  const ignoredTags = ignoreGitTags(config, options);

  /*
   * Update version number
   */
  const versionOptions: VersionOptions = {
    preid: config.prerelease ? removeReleasePrefix(options.branch) : undefined,
    gitCommit: options.commitVersionNumbers,
    gitTag: false,
    gitPush: false,
    dryRun: !options.previewChangelog && options.dryRun,
    verbose: options.verbose,
  };
  const version = await updateVersion(versionOptions, config);
  const { workspaceVersion, projectsVersionData } = version;

  /*
   * Create changelogs
   */
  await nxCreateChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    gitCommit: !options.previewChangelog && options.commitChangelog,
    gitCommitArgs: options.commitVersionNumbers ? '--amend --no-edit' : '',
    gitTag: !options.previewChangelog,
    gitPush: !options.previewChangelog && options.gitPush,
    dryRun: !options.previewChangelog && options.dryRun,
    verbose: options.verbose,
    createRelease: options.previewChangelog ? false : undefined,
  });

  /*
   * Publish releases to npm, if necessary
   */
  const projectsToPublish = Object.entries(projectsVersionData)
    .filter(
      ([, versionInfo]) =>
        versionInfo.currentVersion !== null && versionInfo.newVersion !== null
    )
    .map(([projectName]) => projectName);

  if (!projectsToPublish.length) {
    console.log('No projects need publishing.');
    process.exit();
  }

  // publishResults contains a map of project names and their exit codes
  const publishResults = await nxPublishRelease({
    projects: projectsToPublish,
    dryRun: !options.publish || options.dryRun,
    verbose: options.verbose,
    tag: config.channel,
  });

  /*
   * Cleanup and exit
   */
  restoreGitTags(ignoredTags, options);

  process.exit(
    Object.values(publishResults).every((result) => result.code === 0) ? 0 : 1
  );
}

// The default config is based on semantic-release's default config,
// https://github.com/semantic-release/semantic-release/blob/5c006d1f7b34cb1d943aa691ecd211da67182b3d/lib/get-config.js#L64-L72
// However, we use a release/ prefix and drop `main` and `master` in favor of `release/latest`
export const defaultReleaseConfigs: ReleaseConfig[] = [
  { name: 'release/+([0-9])?(.{+([0-9]),x}).x' }, // (N.N.x or N.x.x or N.x with N being a number)
  { name: 'release/latest' },
  { name: 'release/next' },
  { name: 'release/next-major' },
  { name: 'release/beta', prerelease: true },
  { name: 'release/alpha', prerelease: true },
];

type CompleteReleaseConfig = Required<ReleaseConfig>;

function ignoreGitTags(
  config: CompleteReleaseConfig,
  options: SemanticReleaseOptions
) {
  const removedTags: { tag: string; commit: string }[] = [];
  if (!config.prerelease) {
    // Remove pre-release tags locally, to prevent resolving a pre-release as the current version
    const gitTags = execSync('git tag --list *@*.*.*', { encoding: 'utf-8' })
      .trim()
      .split('\n');
    const prereleaseTags = gitTags.filter((tag) =>
      tag.match(/(-(\w|\d)+)+\.\d+$/)
    );
    if (options.verbose) {
      console.log('Ignoring pre-release versions:');
      console.log(prereleaseTags);
    }
    for (const tag of prereleaseTags) {
      const commitHash = execSync(`git rev-list -n 1 ${tag}`, {
        encoding: 'utf-8',
      }).trim();
      execSync(`git tag --delete ${tag}`);
      removedTags.push({ tag, commit: commitHash });
    }
  }
  return removedTags;
}

function restoreGitTags(
  tagsToRestore: ReturnType<typeof ignoreGitTags>,
  options: SemanticReleaseOptions
) {
  if (options.dryRun || options.previewChangelog || !options.gitPush) {
    // Recreate the removed tags. This is not necessary when actually running in CI,
    // since the tags aren't actually deleted on the remote, but it's nice when testing locally.
    for (const { tag, commit } of tagsToRestore) {
      execSync(`git tag ${tag} ${commit}`);
    }
  }
}

const removeReleasePrefix = (branch: string) =>
  branch.replace(/^release\//, '');

function sanitizeNpmTag(tag: string) {
  // npm dist tags cannot be valid SemVer ranges
  // https://docs.npmjs.com/cli/v11/commands/npm-dist-tag#caveats
  // So we tag e.g. '1.x' as 'release-1.x' instead
  if (tag.match(/^(v?\d)/)) {
    return `release-${tag}`;
  }
  return tag;
}

function getReleaseConfig(
  configs: ReleaseConfig[],
  branchName: string
): CompleteReleaseConfig | undefined {
  const defaultConfig = {
    // Use the branch name as the distribution channel, if not explicitly set,
    // but remove the 'release/' prefix if it exists.
    channel: sanitizeNpmTag(removeReleasePrefix(branchName)),
    prerelease: false,
  };
  const config = configs.find((config) =>
    micromatch.isMatch(branchName, config.name)
  );
  if (!config) {
    return;
  }
  return { ...defaultConfig, ...config };
}

/**
 * Update version using Nx, and handle 0.x.x to 1.x.x transition if necessary
 */
async function updateVersion(
  versionOptions: VersionOptions,
  branchConfig: Required<ReleaseConfig>
) {
  // Let Nx handle versioning
  const version = await nxUpdateVersion(versionOptions);

  /*
   * Check if we need to transition from 0.x.x to 1.x.x. This script will only release 1.x.x versions or higher
   */
  const isZeroVersion = (v: string | null) => v?.startsWith('0.') ?? false;
  const isNullOrZeroVersion = (v: string | null) =>
    v === null || isZeroVersion(v);

  const currentProjectVersions = Object.values(version.projectsVersionData).map(
    (x) => x.currentVersion
  );
  if (currentProjectVersions.every(isNullOrZeroVersion)) {
    console.log(
      'Current version is 0.x.x, which is unsupported in semantic-release. bumping to 1.0.0 before continuing.'
    );
    return await nxUpdateVersion({
      ...versionOptions,
      gitCommitArgs: '--amend --no-edit',
      specifier: branchConfig.prerelease ? 'premajor' : 'major',
    });
  } else if (currentProjectVersions.some(isZeroVersion)) {
    console.error(
      'Current versions are a mix of 0.x.x and >= 1.x.x, this is not supported and must be resolved manually.'
    );
    process.exit(1);
  }
  return version;
}
