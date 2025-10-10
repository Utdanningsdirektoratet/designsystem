import { defineConfig } from 'eslint/config';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';
import storybook from 'eslint-plugin-storybook';
import nxEslintPlugin from '@nx/eslint-plugin';

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
  baseConfig,
  nxEslintPlugin.configs['flat/react'],
  storybook.configs['flat/recommended'],
  {
    ignores: ['!.storybook'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
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
