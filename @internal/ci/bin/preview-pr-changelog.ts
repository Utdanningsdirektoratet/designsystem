#!/usr/bin/env -S pnpm tsx

/**
 * Print a Markdown preview of the changelog entries a pull request will add to
 * the next release.
 */

import process from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { previewPrChangelog } from '../src/preview-pr-changelog.js';

const options = await yargs(hideBin(process.argv))
  .version(false)
  .options({
    base: {
      description: 'The branch the pull request targets, e.g. `origin/main`',
      type: 'string',
      demandOption: true,
    },
    head: {
      description: 'The last commit of the pull request',
      type: 'string',
      default: 'HEAD',
    },
  })
  .parseAsync();

process.stdout.write(await previewPrChangelog(options.base, options.head));
