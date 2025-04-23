import { FlatCompat } from '@eslint/eslintrc';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';
import storybook from 'eslint-plugin-storybook';
import eslintjs from '@eslint/js';
const { configs } = eslintjs;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: configs.recommended,
});

export default [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
  ...storybook.configs['flat/recommended'],
  {
    ignores: ['!.storybook'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
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
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allowCircularSelfDependency: true,
        },
      ],
    },
  },
];
