import { execSync } from 'node:child_process';
import { defineMain } from '@storybook/react-vite/node';
import remarkGfm from 'remark-gfm';
import type { Plugin, UserConfig } from 'vite';
import { explicitlyIncludedProps } from './docs/explicitlyIncludedProps';

const isFromDependency = (fileName: string) =>
  fileName.includes('node_modules');
const isFromAllowedDependency = (fileName: string) =>
  ['@digdir', '@udir-design'].some((org) => fileName.includes(org));

export default defineMain({
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states',
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
    const githubActionsHeadRef = process.env['GITHUB_HEAD_REF'];
    const branchName = githubActionsHeadRef
      ? // In GitHub Actions, HEAD is in detached state, so we get the branch name from a var set by GitHub
        githubActionsHeadRef.replace(/^refs\/heads\//, '')
      : // When running locally we just get the branch name currently checked out
        execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd();

    return mergeConfig(cfg, {
      define: {
        __GIT_BRANCH__: JSON.stringify(branchName),
      },
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
      server: {
        proxy: {
          '/typedoc': {
            target: 'http://localhost:8090',
            rewrite: (path) => path.replace(/^\/typedoc/, ''),
          },
        },
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
      propFilter: (prop, component) => {
        // Make it possible to explicitly choose to include a prop that would otherwise be
        // filtered out because it's a third-party prop, e.g. types from React
        if (explicitlyIncludedProps[component.name]?.includes(prop.name)) {
          return true;
        }

        // Remove popovertarget prop which @digdir/designsystemet-react adds to all elements
        if (prop.name === 'popovertarget') {
          return false;
        }

        // Filter out third-party props from node_modules except @digdir packages.
        // Unlike the default logic, this checks all declaration locations and allows
        // props if they have been defined locally or in @digdir/* packages, even if
        // they are also defined in a non-allow location (other packages)
        const filesToCheck = [
          prop.parent?.fileName ?? [],
          prop.declarations?.map((x) => x.fileName) ?? [],
        ].flat();
        const isPropFromAllowedLocation = filesToCheck.some(
          (fileName) =>
            isFromAllowedDependency(fileName) || !isFromDependency(fileName),
        );
        return isPropFromAllowedLocation;
      },
      tsconfigPath: 'tsconfig.lib.json',
      // Required for unions like Size, Color etc from @digdir to generate options in Storybook controls
      shouldExtractLiteralValuesFromEnum: true,
      // Removes "undefined" as an option in Storybook controls for optional properties
      shouldRemoveUndefinedFromOptional: true,
    },
  },
});

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
