#!/usr/bin/env -S pnpm tsx

import process from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { semanticRelease } from '../src/semantic-release';

(async () => {
  const options = await yargs(hideBin(process.argv))
    .version(false) // disable default --version option in yargs
    .options({
      branch: {
        alias: 'b',
        description:
          'The branch name is used to determine the correct release strategy',
        type: 'string',
        demandOption: true,
      },
      'dry-run': {
        alias: 'd',
        description:
          'Whether or not to perform a dry-run of the entire release process',
        type: 'boolean',
        default: true,
      },
      'preview-changelog': {
        description:
          'Similar to dry-run, but will actually update version numbers and changelogs (without committing to git). Useful for previewing the changelogs in CI.',
        type: 'boolean',
        default: false,
      },
      publish: {
        description: 'Whether or not to run the final publish step.',
        type: 'boolean',
        default: false,
      },
      'commit-version-numbers': {
        description:
          'Whether or not to commit changes in package.json "version" fields to git. This is NOT recommended, see https://semantic-release.gitbook.io/semantic-release/support/faq#why-is-the-package.jsons-version-not-updated-in-my-repository',
        type: 'boolean',
        default: false,
      },
      'commit-changelog': {
        description:
          'Whether or not to commit changes in changelog files to git. This is NOT recommended, see https://semantic-release.gitbook.io/semantic-release/support/faq#should-release-notes-be-committed-to-a-changelog.md-in-my-repository-during-a-release',
        type: 'boolean',
        default: false,
      },
      'git-push': {
        description:
          'Whether or not to push git tags (and version / changelog commits, if enabled) to the remote',
        type: 'boolean',
        default: true,
      },
      verbose: {
        description: 'Whether or not to enable verbose logging',
        type: 'boolean',
        default: false,
      },
    })
    .parseAsync();

  await semanticRelease(options);
})();
