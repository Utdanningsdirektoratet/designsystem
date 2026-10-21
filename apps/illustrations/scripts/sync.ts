import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema, sources } from '../src/schema.ts';
import { parseCli } from './category.ts';
import { getHierarchy, getToken } from './figma.ts';
import { packageRoot } from './files.ts';
import { resolveMapping } from './mapping.ts';

// Refreshes metadata.json for one category from the live Figma page. SVGs come from fetch.ts.
async function sync(args: string[]) {
  const { categoryId, source, flags } = parseCli(args, ['--allow-removals']);
  const metadataPath = join(packageRoot, 'source/catalog/metadata.json');
  const mapping = JSON.parse(
    await readFile(join(packageRoot, 'source/import-map.json'), 'utf8'),
  );
  const current = catalogSchema.parse(
    JSON.parse(await readFile(metadataPath, 'utf8')),
  );
  const { root, descriptions } = await getHierarchy(getToken(), source);
  const catalog = resolveMapping(
    mapping,
    root,
    current,
    flags.includes('--allow-removals'),
    categoryId,
    descriptions,
  );
  await writeFile(metadataPath, JSON.stringify(catalog, null, 2) + '\n');
  const families = catalog.families.filter(
    (family) => family.categoryId === categoryId,
  );
  console.log(
    `Updated ${categoryId}: ${families.length} families, ${families.reduce((n, family) => n + family.variants.length, 0)} variants. Run fetch:svgs to download missing artwork.`,
  );
}

try {
  const args = process.argv.slice(2);
  // Without --category every category runs, one at a time, stopping at the first failure.
  if (args.some((arg) => arg.startsWith('--category'))) await sync(args);
  else
    for (const id of Object.keys(sources))
      await sync([`--category=${id}`, ...args]);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Sync failed.');
  process.exitCode = 1;
}
