import { readFile } from 'node:fs/promises';
import yargs, { type Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { figmaSnapshotSchema, getSource } from '../src/schema.ts';
import type { CategoryId } from '../src/schema.ts';
import { figmaSnapshotPath, importMapPath } from './catalog.ts';
import { categoryOption, sourcedCategoryIds } from './category.ts';
import { getHierarchy, getToken } from './figma.ts';
import { writeJson } from './files.ts';
import { resolveMapping } from './mapping.ts';

// Reads one category's frame sizes and tags from the live Figma page into figma-snapshot.json, and
// checks the import map against the page. SVGs come from fetch.ts.
async function sync(categoryId: CategoryId, allowRemovals: boolean) {
  const mapping = JSON.parse(await readFile(importMapPath, 'utf8'));
  const current = figmaSnapshotSchema.parse(
    JSON.parse(await readFile(figmaSnapshotPath, 'utf8')),
  );
  const { root, descriptions } = await getHierarchy(
    getToken(),
    getSource(categoryId),
  );
  const snapshot = resolveMapping(
    mapping,
    root,
    current,
    allowRemovals,
    categoryId,
    descriptions,
  );
  await writeJson(figmaSnapshotPath, snapshot);
  const families = Object.values(snapshot.families).filter(
    (family) => family.categoryId === categoryId,
  );
  console.log(
    `Updated ${categoryId}: ${families.length} families, ${families.reduce((n, family) => n + Object.keys(family.variants).length, 0)} variants. Run fetch:svgs to download missing artwork.`,
  );
}

const yargsInstance = yargs(hideBin(process.argv));
const { category, allowRemovals } = await yargsInstance
  .version(false)
  .strict()
  .options({
    category: { ...categoryOption, defaultDescription: 'every category' },
    'allow-removals': {
      description:
        'Remove illustrations and variants that import-map.json no longer lists',
      type: 'boolean',
      default: false,
    },
  } satisfies Record<string, Options>)
  .wrap(yargsInstance.terminalWidth())
  .parseAsync();

// Without --category every category runs, one at a time, stopping at the first failure.
for (const categoryId of category ? [category] : sourcedCategoryIds)
  await sync(categoryId, allowRemovals);
