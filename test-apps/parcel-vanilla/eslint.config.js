import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

export default defineConfig(nxEslintPlugin.configs['flat/react'], baseConfig, {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  // Override or add rules here
  rules: {},
});
