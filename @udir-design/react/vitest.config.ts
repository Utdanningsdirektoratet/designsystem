import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

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
            instances: [{ browser: 'chromium' }],
            provider: 'playwright',
            headless: true,
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
          snapshotSerializers: ['./.storybook/story-snapshot-serializer.ts'],
          alias: viteConfig.resolve?.alias,
        },
      },
    ],
  },
});
