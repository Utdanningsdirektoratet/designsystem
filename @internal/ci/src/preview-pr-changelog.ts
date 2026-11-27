import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes } from '@semantic-release/release-notes-generator';
import {
  commitAnalyzerConfig,
  releaseNotesConfig,
} from './semantic-release.js';

function git(...args: string[]) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

/** Commits reachable from `head` but not from `base`, newest first. */
function getCommits(base: string, head: string) {
  return git('log', '--format=%H%x00%B%x1e', `${base}..${head}`)
    .split('\x1e')
    .map((entry) => entry.replace(/^\n/, ''))
    .filter(Boolean)
    .map((entry) => {
      const [hash, message] = entry.split('\x00');
      return { hash, message };
    });
}

/**
 * Render the changelog entries that the commits in `base..head` will
 * contribute to the next release, using the same plugins and configuration as
 * the release itself. Pull requests are not squashed, so every commit in the
 * pull request ends up in the release.
 */
export async function previewPrChangelog(base: string, head: string) {
  const commits = getCommits(base, head);
  const cwd = process.cwd();
  const releaseType = await analyzeCommits(commitAnalyzerConfig, {
    commits,
    cwd,
    logger: { log() {} },
  });
  const notes = await generateNotes(
    {
      ...releaseNotesConfig,
      // The version and date are not known until the release
      writerOpts: { ...releaseNotesConfig.writerOpts, headerPartial: () => '' },
    },
    {
      commits,
      cwd,
      lastRelease: {},
      nextRelease: {},
      options: {
        repositoryUrl: git('config', '--get', 'remote.origin.url').trim(),
      },
    },
  );

  if (!releaseType || !notes.trim()) {
    return 'Merging this PR will not add anything to the changelog.\n';
  }

  const intro = `Merging this PR will make the next release at least a **${releaseType}** release, and add the following to its changelog:`;
  return `${intro}\n\n${notes.trim()}\n`;
}
