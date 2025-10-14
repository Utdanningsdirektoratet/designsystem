import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import baseConfig, { importOrderConfig } from '../../eslint.config.js';

const commonRestrictedImports = [
  {
    group: ['@udir-design/react', '@udir-design/react/*'],
    message:
      'Do not import from @udir-design/react module, use relative paths instead.',
  },
  {
    group: ['**/dist/*'],
    message: 'Do not import from the dist directory.',
  },
  {
    group: ['**/node_modules/*'],
    message: 'Do not import from the node_modules directory.',
  },
];

export default defineConfig(
  nxEslintPlugin.configs['flat/react'],
  storybook.configs['flat/recommended'],
  baseConfig,
  {
    ignores: ['!.storybook'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-redeclare': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: commonRestrictedImports,
        },
      ],
      'import/order': [
        'error',
        {
          ...importOrderConfig,
          pathGroups: [
            ...importOrderConfig.pathGroups,
            { pattern: '.storybook/**', group: 'internal' },
          ],
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: [
          '@udir-design/react/tsconfig.*?.json',
          '@udir-design/react/tsconfig.storybook.json',
        ],
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['src/alpha.ts', 'src/beta.ts', 'src/stable.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...commonRestrictedImports,
            {
              regex:
                '^((src|\\.{1,2})\\/)((\\.{1,2}\\/)|\\w+\\/)*(alpha|beta|stable)',
              // group: ['**/alpha', '**/beta', '**/stable'],
              message: 'Do not import from barrel files.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    // Storybook & docs-specific overrides
    files: ['**/*.stories.{ts,tsx}', '**/{.storybook,demo,docs}/**/*.{ts,tsx}'],
  },
);
