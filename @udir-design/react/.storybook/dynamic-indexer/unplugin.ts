import { createUnplugin } from 'unplugin';
import { loadCsf, enrichCsf, formatCsf } from '@storybook/csf-tools';
import { DynamicIndexerOptions, STORIES_REGEX } from './storyGenerator';
import { compile } from './compile';

export const unplugin = createUnplugin<DynamicIndexerOptions>((options) => {
  return {
    name: 'unplugin-dynamic-stories',
    enforce: 'pre',
    loadInclude(id) {
      return STORIES_REGEX.test(id);
    },
    async load(fileName) {
      delete require.cache[fileName];
      const code = await compile(fileName, options.tsconfigPath);
      const makeTitle = (userTitle: string) => userTitle || 'default';
      const csf = loadCsf(code, { makeTitle }).parse();
      // Use enrichCsf to ensure JSDoc comments are parsed and added to the meta & story parameters
      enrichCsf(csf, csf, { disableSource: true });
      const result = formatCsf(csf);
      return result;
    },
  };
});

export const { esbuild } = unplugin;
export const { webpack } = unplugin;
export const { rollup } = unplugin;
export const { vite } = unplugin;
