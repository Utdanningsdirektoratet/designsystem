import { glob, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { JSON_SCHEMA, load } from 'js-yaml';
import type { SymbolYml } from './figma/make-configs';

const basePath = resolve(import.meta.dirname, '../symbols');

/** Reads a symbol's config file, checking it has the fields this script relies on. */
const readSymbolYml = async (file: string): Promise<SymbolYml> => {
  const data = load(await readFile(resolve(basePath, file), 'utf8'), {
    schema: JSON_SCHEMA,
  });
  if (
    typeof data !== 'object' ||
    data === null ||
    !('keywords' in data) ||
    !Array.isArray(data.keywords)
  ) {
    throw new Error(`${file} is not a symbol config with a keywords list`);
  }
  return data as SymbolYml;
};

// glob returns the files in directory order; sort so the output is stable
const ymlFiles = (
  await Array.fromAsync(glob('*.yml', { cwd: basePath }))
).toSorted();

const symbols = await Promise.all(
  ymlFiles.map(async (file) => {
    const id = basename(file, '.yml');
    return { id, ...(await readSymbolYml(file)) };
  }),
);

const metadata = Object.fromEntries(
  symbols
    .filter((symbol) => !symbol.keywords.includes('[ignore-docs]'))
    .map((symbol) => [symbol.id, symbol]),
);

await writeFile(
  resolve(import.meta.dirname, '../generated-src/metadata.ts'),
  `export type UdirSymbol = {
    id: string;
    name: string;
    category: string;
    sub_category: string;
    keywords: string[];
    variant: string;
    created_at: string;
  }

  type UdirSymbolName = ${Object.keys(metadata)
    .map((symbol) => `"${symbol}"`)
    .join(' | ')};

  const metadata: {
    [key in UdirSymbolName]: UdirSymbol;
  } = ${JSON.stringify(metadata)};

  export default metadata;`,
);
