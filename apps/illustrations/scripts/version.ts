import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { artworkHash, loadCatalog } from './catalog.ts';
import { packageRoot } from './files.ts';

// Prints the artwork version for the deploy workflow. An optional argument is a file to write the
// catalog to, in the format build:assets uses, so metadata can be uploaded without rendering.
const catalog = await loadCatalog(
  process.env.ILLUSTRATIONS_CATEGORY || undefined,
);
const metadataPath = process.argv[2];
if (metadataPath)
  await writeFile(metadataPath, JSON.stringify(catalog, null, 2) + '\n');
const processing = await Promise.all(
  ['scripts/svg.ts', 'scripts/build.ts'].map((file) =>
    readFile(join(packageRoot, file), 'utf8'),
  ),
);
process.stdout.write(artworkHash(catalog, processing));
