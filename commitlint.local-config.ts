import type { UserConfig } from '@commitlint/types';
import ciConfig from './commitlint.config';

// Allow any local commits which start with one of these prefixes.
// They will not go through CI, but are useful for moving quickly
// while developing, before rebasing and submitting a PR.
const locallyAllowedMessagePrefixes = ['wip', 'fixup'];

export default {
  ...ciConfig,
  ignores: [
    (commitMsg) =>
      locallyAllowedMessagePrefixes.some((prefix) =>
        commitMsg.toLowerCase().startsWith(prefix),
      ),
  ],
} satisfies UserConfig;
