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
  resolve(__dirname, '../dist/metadata.js'),
  `const metadata = ${JSON.stringify(metadata)};\n\n module.exports = metadata;`,
);

writeFileSync(
  resolve(__dirname, '../dist/metadata.mjs'),
  `const metadata = ${JSON.stringify(metadata)};\n\n export default metadata;`,
);

writeFileSync(
  resolve(__dirname, '../dist/metadata.d.ts'),
  `export type UdirSymbol = {
    id: string;
    name: string;
    category: string;
    sub_category: string;
    keywords: string[];
    variant: string;
    updated_at: Date;
    created_at: Date;
  }

  type UdirSymbolName = ${Object.keys(metadata)
    .map((symbol) => `"${symbol}"`)
    .join(' | ')};

  declare const metadata: {
    [key in UdirSymbolName]: UdirSymbol;
  };

  export default metadata;`,
);
