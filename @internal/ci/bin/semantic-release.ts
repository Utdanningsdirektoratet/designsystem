#!/usr/bin/env -S pnpm tsx

import process from 'node:process';
import yargs, { Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { semanticRelease } from '../src/semantic-release.js';

(async () => {
  const yargsInstance = yargs(hideBin(process.argv));
  const options = await yargsInstance
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
      'dry-run-full': {
        description:
          'Full E2E dry-run: runs the entire pipeline in a sandbox (temp git repo, pnpm stage publish --dry-run). Tests orchestration, version sync, and publish validation without publishing or pushing to the real remote.',
        type: 'boolean',
        default: false,
      },
      'preview-changelog': {
        description:
          'Run in dry-run mode but write the generated changelog to CHANGELOG.md for CI preview. Implies --no-publish.',
        type: 'boolean',
        default: false,
      },
      publish: {
        description:
          'Whether or not to run the final publish step. --publish implies --no-dry-run.',
        type: 'boolean',
        default: false,
      },
      'repository-url': {
        description:
          'Override the git remote URL (for local E2E testing against a bare repo)',
        type: 'string',
      },
    } satisfies Record<string, Options>)
    .wrap(yargsInstance.terminalWidth())
    .parseAsync();

  if (options.publish) {
    options.dryRun = false;
  }
  if (options.previewChangelog) {
    options.publish = false;
  }
  if (options.dryRunFull) {
    options.dryRun = false;
    options.publish = false;
  }

  await semanticRelease(options);
})();
