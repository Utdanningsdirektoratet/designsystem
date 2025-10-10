import { defineConfig } from 'eslint/config';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';
import storybook from 'eslint-plugin-storybook';
import nxEslintPlugin from '@nx/eslint-plugin';

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
          patterns: [
            {
              group: ['@udir-design/react', '@udir-design/react/*'],
              message:
                'Do not import from @udir-design/react module, use relative paths instead.',
            },
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
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    // Storybook & docs-specific overrides
    files: ['**/*.stories.{ts,tsx}', '**/{.storybook,demo,docs}/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allowCircularSelfDependency: true,
        },
      ],
    },
  },
);
