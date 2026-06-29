import path from 'node:path';
import { defineConfig, includeIgnoreFile } from '@eslint/config-helpers';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from '../../eslint.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  baseConfig,
  {
    settings: { react: { version: 'detect' } },
  },
  {
    ignores: ['./generated-src'],
  },
);
