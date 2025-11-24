import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  nxEslintPlugin.configs['flat/react'],
  baseConfig,
);
