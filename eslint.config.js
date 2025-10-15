import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export const importOrderConfig = {
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
  named: true,
  alphabetize: {
    order: 'asc',
  },
  'newlines-between': 'never',
  pathGroups: [
    {
      pattern: '@udir-design/**',
      group: 'external',
      position: 'after',
    },
    { pattern: 'src/**', group: 'internal' },
  ],
};
export default defineConfig(
  includeIgnoreFile(gitignorePath),
  nxEslintPlugin.configs['flat/base'],
  nxEslintPlugin.configs['flat/typescript'],
  nxEslintPlugin.configs['flat/javascript'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['eslint.config.js'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: { import: importPlugin },
    settings: {
      'import/internal-regex': '^(@udir-design|src)/',
    },
    rules: {
      'import/enforce-node-protocol-usage': ['error', 'always'],
      'import/newline-after-import': 'error',
      'import/order': ['error', importOrderConfig],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
);
