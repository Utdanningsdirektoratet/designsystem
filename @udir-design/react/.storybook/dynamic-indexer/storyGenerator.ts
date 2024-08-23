import { type Indexer } from '@storybook/types';
import { loadCsf } from '@storybook/csf-tools';
import { compile } from './compile';

export interface DynamicIndexerOptions {
  tsconfigPath: string;
}

export const STORIES_REGEX = /\.dynamic\.[tj]sx?/;

export const storyGenerator = ({
  tsconfigPath,
}: DynamicIndexerOptions): Indexer => ({
  test: STORIES_REGEX,
  createIndex: async (fileName, options) => {
    delete require.cache[fileName];
    const code = await compile(fileName, tsconfigPath);
    const parsed = loadCsf(code, {
      ...options,
      fileName,
    }).parse();
    // Strip away the `.dynamic` part of Storybook's auto-generated title/id
    return parsed.indexInputs.map((entry) => ({
      ...entry,
      title: options.makeTitle(entry.title).replace('.dynamic', ''),
      __id: entry.__id?.replace('-dynamic', ''),
    }));
  },
});
