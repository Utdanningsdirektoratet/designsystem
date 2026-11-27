import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { figmaSnapshotSchema, importMapSchema } from '../src/schema.ts';
import type { IllustrationCatalog } from '../src/schema.ts';
import { packageRoot } from './files.ts';
import { joinCatalog } from './mapping.ts';

export const importMapPath = join(packageRoot, 'source/import-map.json');
export const figmaSnapshotPath = join(
  packageRoot,
  'source/figma-snapshot.json',
);

const readJson = async (path: string): Promise<unknown> =>
  JSON.parse(await readFile(path, 'utf8'));

export async function loadCatalog(only?: string) {
  const full = joinCatalog(
    importMapSchema.parse(await readJson(importMapPath)),
    figmaSnapshotSchema.parse(await readJson(figmaSnapshotPath)),
  );
  const catalog = {
    ...full,
    families: full.families.filter(
      (family) => !only || family.categoryId === only,
    ),
  };
  if (only && !catalog.families.length)
    throw new Error(`No families found for category "${only}".`);
  return catalog;
}

/**
 * Hashes only what shapes the SVG and PNG files, so editing tags, names, properties or grouping keeps
 * the same artwork version. The processing sources are passed in so a change to them gives a new one.
 */
export function artworkHash(
  catalog: IllustrationCatalog,
  processingSources: string[],
) {
  const variants = catalog.families
    .flatMap((family) => family.variants)
    .map(
      ({ id, svg, nodeId, width, height }) =>
        `${id} ${svg} ${nodeId} ${width} ${height}`,
    )
    .sort();
  return createHash('sha256')
    .update(variants.join('\n'))
    .update(processingSources.join('\0'))
    .digest('hex')
    .slice(0, 16);
}
