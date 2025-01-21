import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
    'storybook-addon-tag-badges',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },

  docs: {},

  tags: {
    // Configure stories with the 'snapshot' tag to only be visible in development.
    // In production, they will be picked up by snapshot tests etc but not be visible.
    snapshot: {
      excludeFromDocsStories: false,
      excludeFromSidebar: process.env.NODE_ENV !== 'development',
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.lib.json',
      // Required for unions like Size, Color etc from @digdir to generate options in Storybook controls
      shouldExtractLiteralValuesFromEnum: true,
      // Removes "undefined" as an option in Storybook controls for optional properties
      shouldRemoveUndefinedFromOptional: true,
    },
  },
};
export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
