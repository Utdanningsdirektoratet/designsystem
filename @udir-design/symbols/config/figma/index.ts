import {
  existsSync,
  mkdtempSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';
import * as R from 'ramda';
import { downloadSvg, fetchDownloadUrls, fetchSymbols } from './fetch-symbols';
import { makeConfig } from './make-configs';
import { resolveName } from './symbol-name';

const symbolFolder = './symbols';

/** How many symbols to download at a time, to avoid rate limits. */
const CONCURRENCY = 4;

console.info('Started symbol-update from Figma');
/* Symbols are published as 'components' in Figma */
const publishedSymbolComponents = await fetchSymbols();
console.info(`Fetched ${publishedSymbolComponents.length} symbols from Figma`);
const symbolsByNodeId = new Map(
  publishedSymbolComponents.map((symbol) => [symbol.node_id, symbol]),
);

/* When we have all the published symbols, we can ask figma for URL's for downloading them as assets */
const imagesUrls = await fetchDownloadUrls(
  publishedSymbolComponents.map((x) => x.node_id),
);

/*
 * Build the new symbols next to `symbols/`, and only replace it once they have
 * all been downloaded and checked, so a failed update keeps the previous ones.
 */
using staging = createStagingFolder();

console.group(`Processing ${Object.keys(imagesUrls).length} symbols...`);

const downloads = Object.entries(imagesUrls).map(([nodeId, url]) => {
  const symbol = symbolsByNodeId.get(nodeId);
  if (!symbol) {
    throw new Error(
      `No matching symbol found for ${nodeId}. It should not be possible to dowload symbol without a matching symbol in the list of symbols fetched from Figma.`,
    );
  }
  return { fileName: resolveName(symbol), url };
});

/*
 * In some cases if multiple symbols are published in Figma with the same name,
 * we will end up overwriting the symbol with the same name.
 */
const downloadsByFileName = Map.groupBy(downloads, ({ fileName }) => fileName);
for (const [fileName, sameName] of downloadsByFileName) {
  if (sameName.length > 1) {
    console.warn(`Duplicate name detected: ${fileName}.`);
  }
}

for (const batch of R.splitEvery(CONCURRENCY, downloads)) {
  await Promise.all(
    batch.map(async ({ fileName, url }) => {
      /* Each symbol is now a raw string for a complete SVG */
      const symbolSvg = await downloadSvg(url);
      writeFileSync(resolve(staging.path, fileName), symbolSvg, {
        encoding: 'utf8',
      });
    }),
  );
}

if (downloadsByFileName.size !== publishedSymbolComponents.length) {
  console.warn(
    `Duplicate symbol names from Figma leads to them being overwritten. This will cause the symbol-library to be out of sync with Figma.`,
  );
}

console.info(`Completed processing 🎉`);
console.groupEnd();

makeConfig(publishedSymbolComponents, staging.path);

const filesInDir = readdirSync(staging.path);
const svgFiles = filesInDir.filter((x) => x.endsWith('.svg'));
const ymlFiles = filesInDir.filter((x) => x.endsWith('.yml'));

if (
  svgFiles.length !== publishedSymbolComponents.length ||
  ymlFiles.length !== publishedSymbolComponents.length
) {
  throw new Error(
    `Symbols (${svgFiles.length}) and configs (${ymlFiles.length}) written to directory does not match the expected amount of symbols located in Figma (${publishedSymbolComponents.length}).\nThis is most likely caused by duplicate symbol names from figma.`,
  );
}

replaceFolder(symbolFolder, staging.path);

console.info(
  `Success! A total of ${
    Object.keys(imagesUrls).length
  } were fetched and downloaded from Figma 🎉`,
);

/** A temporary folder next to `symbols/`, removed when disposed if still there. */
function createStagingFolder() {
  const path = mkdtempSync('./.symbols-new-');
  return {
    path,
    [Symbol.dispose]: () => rmSync(path, { recursive: true, force: true }),
  };
}

/**
 * Replaces the `target` folder with `staged`. Keeps the previous folder until
 * the new one is in place, and puts it back if that fails.
 */
function replaceFolder(target: string, staged: string) {
  if (!existsSync(target)) {
    renameSync(staged, target);
    return;
  }
  const backup = staged.replace('.symbols-new-', '.symbols-old-');
  renameSync(target, backup);
  try {
    renameSync(staged, target);
  } catch (error) {
    try {
      renameSync(backup, target);
    } catch (restoreError) {
      throw new Error(
        `Could not install the new symbols in ${target}, nor put the previous ones back. They are in ${backup}.`,
        { cause: new AggregateError([error, restoreError]) },
      );
    }
    throw error;
  }
  rmSync(backup, { recursive: true, force: true });
}
