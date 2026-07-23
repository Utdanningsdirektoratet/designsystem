/**
 * Shared building blocks for the repo's `oxlint.config.ts` files.
 */

import type { AllowWarnDeny, DummyRuleMap, OxlintConfig } from 'oxlint';

// ---------------------------------------------------------------------------
// Types re-derived from oxlint's rule interface (types not exported directly).
// ---------------------------------------------------------------------------

type Tuple<T> = Extract<T, readonly unknown[]>;
type NoRestrictedImportsRule = Tuple<
  NonNullable<DummyRuleMap['no-restricted-imports']>
>;
type NoRestrictedImportsConfigEnum = NoRestrictedImportsRule[1];
type NoRestrictedImportsConfig = Extract<
  NoRestrictedImportsConfigEnum,
  { patterns?: unknown }
>;
type PossiblePattern = NonNullable<
  NoRestrictedImportsConfig['patterns']
>[number];
export type RestrictedPattern = Extract<PossiblePattern, object>;

type NoUnusedVarsRule = Tuple<NonNullable<DummyRuleMap['no-unused-vars']>>;

// ---------------------------------------------------------------------------
// File-pattern globs
// ---------------------------------------------------------------------------

/** All TypeScript source files (`.ts`, `.tsx`, `.mts`, `.cts`). */
export const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

/** TypeScript files that contain JSX/TSX or plain TS (no `.mts`/`.cts`). */
export const TS_TSX_FILES = ['**/*.ts', '**/*.tsx'];

/** All JS + TS source files. */
export const JS_TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'];

// ---------------------------------------------------------------------------
// no-restricted-imports building blocks
// ---------------------------------------------------------------------------

/**
 * Base patterns forbidden across every package that uses `no-restricted-imports`:
 * the `@udir-design/react` public entry point (relative paths are required within
 * the source tree), and imports from `dist/`/`node_modules/`.
 */
export const baseRestrictedImportPatterns: RestrictedPattern[] = [
  {
    group: ['@udir-design/react', '@udir-design/react/*'],
    message:
      'Do not import from @udir-design/react module, use relative paths instead.',
  },
  { group: ['**/dist/*'], message: 'Do not import from the dist directory.' },
  {
    group: ['**/node_modules/*'],
    message: 'Do not import from the node_modules directory.',
  },
];

/**
 * Blocks importing from the top-level barrel files (`src/alpha.ts` etc.) so the
 * library remains tree-shakeable and tools like Chromatic can perform proper
 * dependency analysis.
 */
export const barrelFileRestrictionPattern: RestrictedPattern = {
  regex: '^((src|\\.{1,2})\\/)((\\.{1,2}\\/)|\\w+\\/)*(alpha|beta|stable)\\b',
  message:
    'Do not import from barrel files. It can make the library hard to tree-shake and prohibits tools like Chromatic from performing dependency analysis.',
};

/**
 * Build a `no-restricted-imports` rule value from the base patterns plus any
 * extra patterns the caller wants to layer on top.
 */
export const noRestrictedImports = (
  extraPatterns: readonly RestrictedPattern[] = [],
): NoRestrictedImportsRule => [
  'error',
  { patterns: [...baseRestrictedImportPatterns, ...extraPatterns] },
];

// ---------------------------------------------------------------------------
// importx/order (import ordering) building blocks
// ---------------------------------------------------------------------------

type PathGroup = { pattern: string; group: string; position?: string };

/**
 * Build an `importx/order` rule value. `@udir-design/**` sits after other
 * externals and `src/**` counts as internal; callers can pass extra path groups
 * (e.g. Storybook's `.storybook/**`).
 */
export const importOrder = (
  extraPathGroups: readonly PathGroup[] = [],
): [AllowWarnDeny, unknown] => [
  'error',
  {
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    named: true,
    alphabetize: { order: 'asc' },
    'newlines-between': 'never',
    pathGroups: [
      { pattern: '@udir-design/**', group: 'external', position: 'after' },
      { pattern: 'src/**', group: 'internal' },
      ...extraPathGroups,
    ],
  },
];

// ---------------------------------------------------------------------------
// no-unused-vars building block
// ---------------------------------------------------------------------------

/**
 * Stricter `no-unused-vars` config: `_`-prefixed names are treated as
 * intentionally unused. Callers can widen `varsIgnorePattern` (Storybook allows
 * `React` on top of the default).
 */
export const noUnusedVars = (varsIgnorePattern = '^_'): NoUnusedVarsRule => [
  'error',
  {
    vars: 'all',
    args: 'all',
    argsIgnorePattern: '^_',
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: '^_',
    destructuredArrayIgnorePattern: '^_',
    varsIgnorePattern,
  },
];

// ---------------------------------------------------------------------------
// Core rule overrides for TypeScript files
// ---------------------------------------------------------------------------

/**
 * Applied to TypeScript files: disable the core JS rules the TS compiler
 * already enforces (and would just double-report), and enable a few TS-safe
 * stylistic checks that still add value in a typed codebase.
 */
export const coreRulesForTypeScript = {
  'constructor-super': 'off',
  'getter-return': 'off',
  'no-class-assign': 'off',
  'no-const-assign': 'off',
  'no-dupe-class-members': 'off',
  'no-dupe-keys': 'off',
  'no-func-assign': 'off',
  'no-import-assign': 'off',
  'no-new-native-nonconstructor': 'off',
  'no-obj-calls': 'off',
  'no-redeclare': 'off',
  'no-setter-return': 'off',
  'no-this-before-super': 'off',
  'no-unreachable': 'off',
  'no-unsafe-negation': 'off',
  'no-var': 'error',
  'no-with': 'off',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
} satisfies DummyRuleMap;

// ---------------------------------------------------------------------------
// React-package building blocks
// ---------------------------------------------------------------------------

/** Plugin list every React-using package needs. */
export const reactPackagePlugins: NonNullable<OxlintConfig['plugins']> = [
  'react',
  'jsx-a11y',
  'typescript',
  'unicorn',
];

/** Shared `settings` for React-using packages. */
export const reactPackageSettings: NonNullable<OxlintConfig['settings']> = {
  react: { version: '19' },
  'import/internal-regex': '^(@udir-design|src)/',
};

/**
 * React + typescript rules that live outside the `correctness` category (which
 * is enabled in bulk in the root config) plus `exhaustive-deps` (kept at warn).
 */
export const reactPackageRules = {
  'react/display-name': 'error',
  'react/jsx-no-comment-textnodes': 'error',
  'react/jsx-no-target-blank': 'error',
  'react/no-unescaped-entities': 'error',
  'react/no-unknown-property': 'error',
  'react/rules-of-hooks': 'error',
  'react/exhaustive-deps': 'warn',
  'react/require-render-return': 'error',
  'react/react-compiler': 'error',
  'typescript/no-deprecated': 'error',
} satisfies DummyRuleMap;

/**
 * jsx-a11y rules that need option overrides. The remaining correctness rules
 * (and any rule whose config exactly matches Oxlint's defaults) are enabled
 * implicitly via the inherited `categories.correctness`.
 *
 * Note: for these rules, providing a config object *replaces* the default map
 * wholesale (it is not deep-merged), so any element/handler entries we still
 * want must be listed explicitly even when they match the built-in defaults.
 */
const listOrderedRoles = [
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'tree',
  'treegrid',
];

export const jsxA11yOptionRules = {
  // Extends the default allowed-role map with `listbox` on ul/ol, `option` on
  // li, plus grid/gridcell overrides for table/td.
  'jsx-a11y/no-noninteractive-element-to-interactive-role': [
    'error',
    {
      ul: listOrderedRoles,
      ol: listOrderedRoles,
      li: [
        'menuitem',
        'menuitemradio',
        'menuitemcheckbox',
        'option',
        'row',
        'tab',
        'treeitem',
      ],
      table: ['grid'],
      td: ['gridcell'],
      fieldset: ['radiogroup', 'presentation'],
    },
  ],
  // `allowExpressionValues: true` differs from the default (`false`).
  'jsx-a11y/no-static-element-interactions': [
    'error',
    {
      allowExpressionValues: true,
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp',
      ],
    },
  ],
} satisfies DummyRuleMap;
