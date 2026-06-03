import { defineConfig } from '@eslint/config-helpers';
import baseConfig from '../../eslint.config.js';

export default defineConfig(baseConfig, {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  // Override or add rules here
  rules: {},
});
