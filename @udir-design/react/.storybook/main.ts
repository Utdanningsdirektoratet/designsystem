import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  features: {
    viewportStoryGlobals: true,
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states',
    'storybook-addon-tag-badges',
    '@storybook/experimental-addon-test',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },

  async viteFinal(cfg, opts) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(cfg, {
      optimizeDeps: {
        /*
        Sometimes we get a message like this, and then tests fail:
        > [vite] (client) ✨ new dependencies optimized: <dependency-name>
        > [vitest] Vite unexpectedly reloaded a test. This may cause tests to fail,
        >   lead to flaky behaviour or duplicated test runs.
        > For a stable experience, please add mentioned dependencies to your config's
        >   `optimizeDeps.include` field manually.
        > [vite] (client) ✨ optimized dependencies changed. reloading
        
        This indicates that some dependencies
        */
        include: ['react/jsx-dev-runtime'],
      },
    });
  },

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
