import { defineConfig } from '@eslint/config-helpers';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import baseConfig, { importOrderConfig } from '../../eslint.config.js';

const commonRestrictedImports = [
  {
    group: ['@udir-design/react', '@udir-design/react/*'],
    message:
      'Do not import from @udir-design/react module, use relative paths instead.',
  },
  {
    group: ['**/dist/*'],
    message: 'Do not import from the dist directory.',
  },
  {
    group: ['**/node_modules/*'],
    message: 'Do not import from the node_modules directory.',
  },
];

const restrictBarrelImports = {
  regex:
    '^((src|\\.{1,2})\\/)((\\.{1,2}\\/)|\\w+\\/)*(alpha|beta|stable)(?!\\w)',
  // group: ['**/alpha', '**/beta', '**/stable'],
  message:
    'Do not import from barrel files. It can make the library hard to tree-shake and prohibits tools like Chromatic from performing dependency analysis.',
};

export default defineConfig(
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  storybook.configs['flat/recommended'],
  baseConfig,
  {
    settings: { react: { version: 'detect' } },
  },
  {
    ignores: ['!.storybook'],
  },
  {
    // Intentionally disabled: prop-types is redundant with TypeScript,
    // and autoFocus is a legitimate API in a component library.
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'react/prop-types': 'off',
      'jsx-a11y/no-autofocus': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-redeclare': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: commonRestrictedImports,
        },
      ],
      'import/order': [
        'error',
        {
          ...importOrderConfig,
          pathGroups: [
            ...importOrderConfig.pathGroups,
            { pattern: '.storybook/**', group: 'internal' },
          ],
        },
      ],
      'react/forward-ref-uses-ref': ['error'],
    },
    languageOptions: {
      parserOptions: {
        project: [
          '@udir-design/react/tsconfig.*?.json',
          '@udir-design/react/tsconfig.storybook.json',
        ],
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['src/alpha.ts', 'src/beta.ts', 'src/stable.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [...commonRestrictedImports, restrictBarrelImports],
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    // Storybook & docs-specific overrides
    files: ['**/*.stories.{ts,tsx}', '**/{.storybook,demo,docs}/**/*.{ts,tsx}'],
    rules: {
      // Storybook requires `import React` at runtime even with JSX transform
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^(_|React$)',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true },
      ],
    },
  },
  {
    // Overrides for demo pages shared with test-apps
    files: ['demo-pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...commonRestrictedImports,
            restrictBarrelImports,
            {
              group: ['**/*.js'],
              message:
                'Files shared with test-apps cannot import with .js extension.',
            },
            {
              group: ['../**/src/components/*'],
              message:
                "Files shared with test-apps cannot import library components from relative paths. Import from 'src/components/...' instead.",
            },
            {
              group: ['../**/src/utilities/*'],
              message:
                "Files shared with test-apps cannot import library utilities from relative paths. Import from 'src/utilities/...' instead.",
            },
          ],
        },
      ],
    },
  },
);
