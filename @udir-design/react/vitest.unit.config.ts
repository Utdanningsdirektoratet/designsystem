import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ////////
    watch: false,
    cache: {
      dir: '../../node_modules/.vitest/@udir-design/react',
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: 'unit-test-report.xml',
          suiteName: 'Storybook tests',
          addFileAttribute: true,
          classnameTemplate: '{filename}',
        },
      ],
    ],
    coverage: {
      reportsDirectory: '../../test-reports/@udir-design/react',
      reporter: [['json', { file: 'unit-test-coverage.json' }]],
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
  },
});
