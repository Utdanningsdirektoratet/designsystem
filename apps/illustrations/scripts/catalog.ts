import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema } from '../src/schema.ts';
import type { IllustrationCatalog } from '../src/schema.ts';
import { packageRoot } from './files.ts';

export async function loadCatalog(only?: string) {
  const full = catalogSchema.parse(
    JSON.parse(
      await readFile(join(packageRoot, 'source/catalog/metadata.json'), 'utf8'),
    ),
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
