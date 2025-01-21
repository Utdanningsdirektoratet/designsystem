import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import path from 'node:path';

export default defineConfig({
  test: {
    watch: false,
    cache: {
      dir: '../../node_modules/.vitest/@udir-design/react',
    },
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/@udir-design/react',
      provider: 'v8',
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/.storybook/**',
        '**/*.dynamic.*',
        // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
        '**/*.stories.*',
        // 👇 This pattern must align with the output directory of `storybook build`
        '**/storybook-static/**',
      ],
    },
    workspace: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        },
      },
      {
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(import.meta.dirname, '.storybook'),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: 'pnpm dev --ci',
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: 'playwright',
            name: 'chromium',
            headless: true,
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
          snapshotSerializers: ['./.storybook/story-snapshot-serializer.ts'],
        },
      },
    ],
  },
});
