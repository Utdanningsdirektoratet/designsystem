import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { artworkHash, loadCatalog } from './catalog.ts';
import { packageRoot } from './files.ts';

// Prints the artwork version for the deploy workflow. An optional argument is a file to write the
// catalog to, so metadata can be uploaded without rendering. It is written without indentation,
// which the app does not need.
const catalog = await loadCatalog(
  process.env.ILLUSTRATIONS_CATEGORY || undefined,
);
const metadataPath = process.argv[2];
if (metadataPath) await writeFile(metadataPath, JSON.stringify(catalog));
// The render revision is raised to render the cached SVGs again, for example when an svgo or sharp
// upgrade fixes a problem in the deployed files. Unlike the artwork revision, it keeps the SVG cache.
const processing = await Promise.all(
  ['scripts/svg.ts', 'scripts/build.ts', 'source/render-revision.txt'].map(
    (file) => readFile(join(packageRoot, file), 'utf8'),
  ),
);
process.stdout.write(artworkHash(catalog, processing));
