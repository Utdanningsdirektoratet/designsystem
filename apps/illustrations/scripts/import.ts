import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';
import { catalogSchema } from '../src/schema.ts';
import { parseCli } from './category.ts';
import {
  exportSvgUrls,
  getHierarchy,
  getToken,
  parseHierarchy,
  request,
} from './figma.ts';
import { packageRoot, replaceDirectory } from './files.ts';
import { resolveMapping } from './mapping.ts';
import { renderPng } from './svg.ts';

try {
  const { categoryId, source, flags, inventory } = parseCli(
    process.argv.slice(2),
    ['--allow-removals'],
  );
  const allowRemovals = flags.includes('--allow-removals');
  const evidence = z
    .object({
      fileKey: z.literal(source.fileKey),
      pageNodeId: z.literal(source.pageNodeId),
      inspectedAt: z.iso.datetime(),
      hierarchy: z.unknown(),
    })
    .parse(
      JSON.parse(await readFile(join(inventory, 'hierarchy.json'), 'utf8')),
    );
  const mapping: unknown = JSON.parse(
    await readFile(join(packageRoot, 'source/import-map.json'), 'utf8'),
  );
  const previous = catalogSchema.parse(
    JSON.parse(
      await readFile(join(packageRoot, 'source/catalog/metadata.json'), 'utf8'),
    ),
  );
  // Inventory evidence must validate the reviewed mapping before any export request.
  resolveMapping(
    mapping,
    parseHierarchy(evidence.hierarchy, source.pageNodeId),
    previous,
    allowRemovals,
    categoryId,
  );
  const token = getToken();
  await replaceDirectory(join(packageRoot, 'source/catalog'), async (stage) => {
    const current = catalogSchema.parse(
      JSON.parse(
        await readFile(
          join(packageRoot, 'source/catalog/metadata.json'),
          'utf8',
        ),
      ),
    );
    const catalog = resolveMapping(
      mapping,
      parseHierarchy(await getHierarchy(token, source), source.pageNodeId),
      current,
      allowRemovals,
      categoryId,
    );
    const variants = catalog.families
      .filter((family) => family.categoryId === categoryId)
      .flatMap((family) => family.variants);
    await mkdir(join(stage, 'svg'));
    // Other categories are carried over unchanged; only this category is replaced.
    for (const family of current.families.filter(
      (item) => item.categoryId !== categoryId,
    ))
      for (const variant of family.variants)
        await cp(
          join(packageRoot, 'source/catalog/svg', variant.svg),
          join(stage, 'svg', variant.svg),
        );
    for (let offset = 0; offset < variants.length; offset += 25) {
      const batch = variants.slice(offset, offset + 25);
      // Download each bounded batch immediately; signed URLs must not expire while later batches export.
      const urls = await exportSvgUrls(
        batch.map((variant) => variant.nodeId),
        token,
        source.fileKey,
      );
      for (let index = 0; index < batch.length; index += 4) {
        const results = await Promise.allSettled(
          batch.slice(index, index + 4).map(async (variant) => {
            const url = urls.get(variant.nodeId);
            if (!url) throw new Error(`Missing SVG URL for ${variant.nodeId}.`);
            const svg = await (await request(url)).text();
            // Decode and render every SVG before committing any source changes.
            await renderPng(svg, variant);
            await writeFile(join(stage, 'svg', variant.svg), svg);
          }),
        );
        const failed = results.find((result) => result.status === 'rejected');
        if (failed?.status === 'rejected') throw failed.reason;
      }
      console.log(
        `Validated ${Math.min(offset + batch.length, variants.length)}/${variants.length} ${categoryId} variants.`,
      );
    }
    await writeFile(
      join(stage, 'metadata.json'),
      JSON.stringify(catalog, null, 2) + '\n',
    );
  });
  console.log(
    'Replaced canonical SVGs and metadata after validating all exports. Review the source diff before committing.',
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Import failed.');
  process.exitCode = 1;
}
