import { defineConfig } from 'oxlint';
import {
  JS_TS_FILES,
  TS_FILES,
  TS_TSX_FILES,
  importOrder,
  noUnusedVars,
  tsEslintRecommendedLayer,
} from './oxlint.shared.ts';

export default defineConfig({
  // Built-in plugins enabled repo-wide. `oxc` adds Oxlint-specific rules that
  // have no ESLint counterpart; its correctness rules fire automatically via
  // `categories.correctness` below, and a few high-value non-correctness rules
  // are opted into explicitly in `rules`.
  plugins: ['typescript', 'unicorn', 'oxc'],

  // Oxlint categories group rules by their *nature* (correctness, suspicious,
  // pedantic, style, restriction) — NOT by which ESLint preset enabled them.
  // There is therefore no category that reproduces `eslint:recommended` or
  // `typescript-eslint` recommended, so rules are listed explicitly below.
  categories: {
    correctness: 'error',
  },

  env: {
    builtin: true,
  },

  // `eslint-plugin-import` loaded through the JS-plugin bridge and aliased to
  // `importx` (see the import override below and `settings` here).
  jsPlugins: [{ name: 'importx', specifier: 'eslint-plugin-import' }],
  settings: {
    'import/internal-regex': '^(@udir-design|src)/',
  },

  // No `ignorePatterns`: oxlint honors `.gitignore` automatically, and every
  // pattern that used to live here was a verbatim duplicate of a `.gitignore`
  // entry. Add package-local exceptions in nested configs when needed.

  rules: {
    // Correctness rules are enabled in bulk via `categories.correctness` above
    // (inherited by every package). Only recommended rules that oxlint places
    // OUTSIDE the correctness category are listed explicitly below.

    // eslint-plugin-unicorn — stand-in for ESLint's
    // `import/enforce-node-protocol-usage` (no direct oxlint equivalent).
    'unicorn/prefer-node-protocol': 'error',

    // Oxlint-specific rules outside the `correctness` category.
    // Perf: catches accidental O(n²) spreads inside reducers/loops.
    // (`oxc/no-map-spread` was evaluated but deemed too noisy for cold code
    // where the perf cost is negligible and the suggested fix mutates inputs.)
    'oxc/no-accumulating-spread': 'error',
    // `this` in an exported function is almost always a bug in library code —
    // bundlers replace it with `undefined` at the call site.
    'oxc/no-this-in-exported-function': 'error',

    // eslint:recommended rules categorized outside `correctness`.
    'no-case-declarations': 'error',
    'no-empty': 'error',
    'no-fallthrough': 'error',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-unexpected-multiline': 'error',
    'no-array-constructor': 'error',

    // typescript-eslint recommended rules categorized outside `correctness`.
    'typescript/ban-ts-comment': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-unnecessary-type-constraint': 'error',
    'typescript/no-unsafe-function-type': 'error',
  },

  overrides: [
    {
      // typescript-eslint recommended, `eslint-recommended` layer.
      files: TS_FILES,
      rules: tsEslintRecommendedLayer,
    },
    {
      // Custom import hygiene (eslint-plugin-import, via the `importx` alias).
      files: JS_TS_FILES,
      plugins: ['import'],
      rules: {
        'import/newline-after-import': 'error',
        'importx/no-relative-packages': 'error',
        'importx/order': importOrder(),
      },
    },
    {
      // Oxlint config files legitimately reach into the monorepo root to
      // import the base config and the shared building blocks in
      // `oxlint.shared.ts`, so `no-relative-packages` doesn't apply here.
      files: ['**/oxlint.config.ts', '**/oxlint.config.mts'],
      rules: {
        'importx/no-relative-packages': 'off',
      },
    },
    {
      // Custom stricter `no-unused-vars` for TS: `_`-prefixed names are allowed
      // as intentionally unused.
      files: TS_TSX_FILES,
      rules: {
        'no-unused-vars': noUnusedVars(),
      },
    },
  ],
});
