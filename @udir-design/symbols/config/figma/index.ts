import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { fetchDownloadUrls, fetchSymbols } from './fetch-symbols';
import { makeConfig } from './make-configs';
import { resolveName } from './symbol-name';

const symbolFolder = './symbols';

main();

async function main() {
  console.info('Started symbol-update from Figma');
  /* Symbols are published as 'components' in Figma */
  const publishedSymbolComponents = await fetchSymbols();
  console.info(
    `Fetched ${publishedSymbolComponents.length} symbols from Figma`,
  );

  /* When we have all the published symbols, we can ask figma for URL's for downloading them as assets */
  const imagesUrls = await fetchDownloadUrls(
    publishedSymbolComponents.map((x) => x.node_id),
  );

  /* Lets do a clean install */
  if (existsSync(symbolFolder)) {
    rmSync(symbolFolder, { recursive: true, force: true });
  }
  mkdirSync(symbolFolder);

  console.group(`Processing ${Object.keys(imagesUrls).length} symbols...`);

  const fileNames = new Set<string>();

  const CONCURRENCY = 4; // Batching requests to avoid rate-limits
  const entries = Object.entries(imagesUrls);

  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async ([nodeId, symbolUrl]) => {
        /* Each symbol is now a raw string for a complete SVG */
        const symbolSvg = await fetch(symbolUrl)
          .then((x) => x.text())
          .catch((e) => {
            throw e.message;
          });

        const matchingSymbol = publishedSymbolComponents.find(
          (x) => x.node_id === nodeId,
        );

        if (!matchingSymbol) {
          throw new Error(
            `No matching symbol found for ${nodeId}. It should not be possible to dowload symbol without a matching symbol in the list of symbols fetched from Figma.`,
          );
        }

        const fileName = resolveName(matchingSymbol);

        /*
         * In some cases if multiple symbols are published in Figma with the same name,
         * we will end up overwriting the symbol with the same name.
         */
        if (fileNames.has(fileName)) {
          console.warn(`Duplicate name detected: ${fileName}.`);
        }

        fileNames.add(fileName);

        writeFileSync(
          resolve(symbolFolder, resolveName(matchingSymbol)),
          symbolSvg,
          {
            encoding: 'utf8',
          },
        );
      }),
    );
  }

  if (fileNames.size !== publishedSymbolComponents.length) {
    console.warn(
      `Duplicate symbol names from Figma leads to them being overwritten. This will cause the symbol-library to be out of sync with Figma.`,
    );
  }

  console.info(`Completed processing 🎉`);
  console.groupEnd();

  makeConfig(publishedSymbolComponents, symbolFolder);

  const filesInDir = readdirSync(symbolFolder);
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

  console.info(
    `Success! A total of ${
      Object.keys(imagesUrls).length
    } were fetched and downloaded from Figma 🎉`,
  );
}
