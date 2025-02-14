import { FlatCompat } from '@eslint/eslintrc';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';
import eslintjs from '@eslint/js';
const { configs } = eslintjs;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: configs.recommended,
});

export default [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
    languageOptions: {
      parserOptions: {
        project: ['@internal/dynamic-csf/tsconfig.*?.json'],
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
];
