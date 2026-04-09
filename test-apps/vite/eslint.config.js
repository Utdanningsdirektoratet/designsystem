// Compat shim: remove fixupConfigRules once @nx/eslint-plugin's react plugins natively support ESLint 10
import { fixupConfigRules } from '@eslint/compat';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

export default defineConfig(
  fixupConfigRules(nxEslintPlugin.configs['flat/react']),
  baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
);
