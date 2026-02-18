// metadata.js (ESM-fiks)
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { JSON_SCHEMA, load } from 'js-yaml';

const { sync } = fg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basePath = resolve(__dirname, '../symbols');

const ymlList = sync('*.yml', { cwd: basePath }).map((fileN) =>
  basename(fileN),
);

const metadata = {};

ymlList.forEach((file) => {
  const ymlData = load(readFileSync(`${basePath}/${file}`), {
    schema: JSON_SCHEMA,
  });
  if (ymlData.keywords && ymlData.keywords.includes('[ignore-docs]')) {
    return;
  }

  const symbolName = file.replace('.yml', '');
  metadata[symbolName] = { id: symbolName, ...ymlData };
});

writeFileSync(
  resolve(__dirname, '../generated-src/metadata.ts'),
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
