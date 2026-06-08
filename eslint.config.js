import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, includeIgnoreFile } from '@eslint/config-helpers';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

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
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    // TypeScript handles undefined-variable checking for both TS and JS files
    // in this project, so disable the ESLint core rule.
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    rules: {
      'no-undef': 'off',
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
      'import/no-relative-packages': 'error',
      'import/order': ['error', importOrderConfig],
    },
  },
  {
    files: ['**/eslint.config.js'],
    rules: {
      'import/no-relative-packages': 'off',
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
