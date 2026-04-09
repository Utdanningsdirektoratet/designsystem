import path from 'node:path';
// Compat shim: remove fixupConfigRules once @nx/eslint-plugin's react plugins natively support ESLint 10
import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  fixupConfigRules(nxEslintPlugin.configs['flat/react']),
  baseConfig,
  {
    ignores: ['./generated-src'],
  },
);
