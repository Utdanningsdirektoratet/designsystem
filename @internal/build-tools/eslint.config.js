import { resolve } from 'node:path';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
    languageOptions: {
      parserOptions: {
        project: [resolve(import.meta.dirname, 'tsconfig.*?.json')],
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
];
