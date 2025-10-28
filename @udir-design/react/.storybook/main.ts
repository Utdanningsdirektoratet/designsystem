import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { Plugin, UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states',
    'storybook-addon-tag-badges',
    '@storybook/addon-vitest',
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

  async viteFinal(cfg) {
    const { mergeConfig } = await import('vite');
    process.env['IS_STORYBOOK'] = 'true';
    return mergeConfig(cfg, {
      build: {
        cssCodeSplit: false,
      },
      plugins: [fixStorybookMockerEntryPlugin()],
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
    } satisfies UserConfig);
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

/**
 * Fixes path to vite-inject-mocker-entry.js so it works when Storybook is hosted on a subpath
 * Credit to Github user tmkx: https://github.com/storybookjs/storybook/issues/32428#issuecomment-3338819831
 */
function fixStorybookMockerEntryPlugin(): Plugin {
  return {
    name: 'fix-storybook-mocker-entry',
    enforce: 'post',
    transformIndexHtml(html) {
      // https://github.com/storybookjs/storybook/blob/2657cc33826d1abf76334f94fef4b82b10f1e1c0/code/core/src/core-server/presets/vitePlugins/vite-inject-mocker/plugin.ts#L11
      const entryPath = '/vite-inject-mocker-entry.js';
      return html.replace(`"${entryPath}"`, `".${entryPath}"`);
    },
  };
}
