import { defineConfig } from 'oxlint';
import baseConfig from '../../oxlint.config.ts';
import {
  JS_TS_FILES,
  TS_TSX_FILES,
  barrelFileRestrictionPattern,
  importOrder,
  jsxA11yOptionRules,
  noRestrictedImports,
  noUnusedVars,
  reactPackagePlugins,
  reactPackageRules,
  reactPackageSettings,
} from '../../oxlint.shared.ts';

// Storybook stories/demo/docs files — same glob is reused across a few overrides.
const STORY_TS_FILES = [
  '**/*.stories.{ts,tsx}',
  '**/{.storybook,demo,docs}/**/*.{ts,tsx}',
];
const STORY_ALL_FILES = [
  '**/*.stories.{ts,tsx,js,jsx,mjs,cjs}',
  '**/*.story.{ts,tsx,js,jsx,mjs,cjs}',
];

// `categories` and `env` are inherited from the root config. The importx
// jsPlugin is inherited too and merges with the storybook plugin added here.
export default defineConfig({
  extends: [baseConfig],
  plugins: reactPackagePlugins,
  settings: reactPackageSettings,
  jsPlugins: ['eslint-plugin-storybook'],
  ignorePatterns: ['!.storybook'],
  rules: {
    ...reactPackageRules,
    ...jsxA11yOptionRules,
  },
  overrides: [
    {
      files: JS_TS_FILES,
      rules: {
        'jsx-a11y/no-autofocus': 'off',
      },
    },
    {
      files: TS_TSX_FILES,
      rules: {
        'no-redeclare': 'off',
        'no-restricted-imports': noRestrictedImports([
          barrelFileRestrictionPattern,
        ]),
        'typescript/consistent-type-imports': 'error',
        'typescript/consistent-type-exports': 'error',
        'importx/order': importOrder([
          { pattern: '.storybook/**', group: 'internal' },
        ]),
      },
    },
    {
      // The barrel files themselves must be allowed to re-export from the
      // subordinate barrels (`./components/alpha`, `./hooks/alpha`, etc.).
      // Redefines `no-restricted-imports` without the barrel-file regex; the
      // rule config is replaced entirely by this later override.
      files: ['src/alpha.ts', 'src/beta.ts', 'src/stable.ts'],
      rules: {
        'no-restricted-imports': noRestrictedImports(),
      },
    },
    {
      files: STORY_ALL_FILES,
      plugins: ['import'],
      rules: {
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'warn',
        'storybook/no-redundant-story-name': 'warn',
        'storybook/no-renderer-packages': 'error',
        'storybook/prefer-pascal-case': 'warn',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error',
        'import/no-anonymous-default-export': 'off',
        'react/rules-of-hooks': 'off',
        // Storybook play-function assertions like `expect(el).toBeTruthy()`
        // return chainable promise-likes but throw synchronously, so the
        // floating-promise warning is noise here. Missing `await` before
        // `userEvent.*` (the semantically-important case, where subsequent
        // steps depend on completion) is already caught by
        // `storybook/await-interactions` above.
        'typescript/no-floating-promises': 'off',
        // Reusing another story's `render` via `render: OtherStory.render`
        // trips unbound-method because Storybook's `StoryObj.render` is
        // typed with a method signature. At runtime the receiver is stable
        // and stories don't rely on `this`, so this is a false positive.
        'typescript/unbound-method': 'off',
      },
    },
    {
      files: ['.storybook/main.{js,cjs,mjs,ts}'],
      rules: {
        'storybook/no-uninstalled-addons': 'error',
      },
    },
    {
      files: STORY_TS_FILES,
      rules: {
        // Storybook demo/docs files also allow an unused `React` import.
        'no-unused-vars': noUnusedVars('^(_|React$)'),
        'no-unused-expressions': ['error', { allowTernary: true }],
        'typescript/consistent-type-imports': 'off',
      },
    },
    {
      files: ['demo-pages/**/*.{ts,tsx}'],
      rules: {
        // Demo pages are shared verbatim with test-apps, so they get the
        // barrel-file restriction *plus* a couple of shared-file-only rules.
        'no-restricted-imports': noRestrictedImports([
          barrelFileRestrictionPattern,
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
        ]),
      },
    },
  ],
});
