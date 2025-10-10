import { defineConfig } from 'eslint/config';
import nxEslintPlugin from '@nx/eslint-plugin';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';

export default defineConfig(baseConfig, nxEslintPlugin.configs['flat/react'], {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  // Override or add rules here
  rules: {},
});
