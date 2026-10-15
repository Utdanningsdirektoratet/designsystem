import { readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema, sources } from '../src/schema.ts';
import { parseCli } from './category.ts';
import {
  componentSetDescriptions,
  getHierarchy,
  getToken,
  parseHierarchy,
} from './figma.ts';
import { packageRoot } from './files.ts';
import { resolveMapping } from './mapping.ts';

// Refreshes metadata.json for one category from the live Figma page. SVGs come from fetch.ts.
async function sync(args: string[]) {
  const { categoryId, source, flags } = parseCli(args, ['--allow-removals']);
  const metadataPath = join(packageRoot, 'source/catalog/metadata.json');
  const mapping: unknown = JSON.parse(
    await readFile(join(packageRoot, 'source/import-map.json'), 'utf8'),
  );
  const current = catalogSchema.parse(
    JSON.parse(await readFile(metadataPath, 'utf8')),
  );
  const hierarchy = await getHierarchy(getToken(), source);
  const catalog = resolveMapping(
    mapping,
    parseHierarchy(hierarchy, source.pageNodeId),
    current,
    flags.includes('--allow-removals'),
    categoryId,
    componentSetDescriptions(hierarchy, source.pageNodeId),
  );
  const temporary = `${metadataPath}.tmp`;
  await writeFile(temporary, JSON.stringify(catalog, null, 2) + '\n');
  await rename(temporary, metadataPath);
  const families = catalog.families.filter(
    (family) => family.categoryId === categoryId,
  );
  console.log(
    `Updated ${categoryId}: ${families.length} families, ${families.reduce((n, family) => n + family.variants.length, 0)} variants. Run fetch:svgs to download missing artwork.`,
  );
}

try {
  const args = process.argv.slice(2);
  // --all runs one category at a time and stops at the first failure.
  if (args.includes('--all')) {
    const rest = args.filter((arg) => arg !== '--all');
    for (const id of Object.keys(sources))
      await sync([`--category=${id}`, ...rest]);
  } else await sync(args);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Sync failed.');
  process.exitCode = 1;
}
