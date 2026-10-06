import { readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema } from '../src/schema.ts';
import { parseCli } from './category.ts';
import { getHierarchy, getToken, parseHierarchy } from './figma.ts';
import { packageRoot } from './files.ts';
import { resolveMapping } from './mapping.ts';

// Refreshes metadata.json for one category from the live Figma page. SVGs come from fetch.ts.
try {
  const { categoryId, source, flags } = parseCli(process.argv.slice(2), [
    '--allow-removals',
  ]);
  const metadataPath = join(packageRoot, 'source/catalog/metadata.json');
  const mapping: unknown = JSON.parse(
    await readFile(join(packageRoot, 'source/import-map.json'), 'utf8'),
  );
  const current = catalogSchema.parse(
    JSON.parse(await readFile(metadataPath, 'utf8')),
  );
  const catalog = resolveMapping(
    mapping,
    parseHierarchy(await getHierarchy(getToken(), source), source.pageNodeId),
    current,
    flags.includes('--allow-removals'),
    categoryId,
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
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Sync failed.');
  process.exitCode = 1;
}
