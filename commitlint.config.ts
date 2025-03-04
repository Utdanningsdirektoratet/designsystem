import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [RuleConfigSeverity.Warning, 'always', 100],
  },
} satisfies UserConfig;
