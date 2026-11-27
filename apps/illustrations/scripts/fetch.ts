import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as R from 'ramda';
import yargs, { type Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getSource } from '../src/schema.ts';
import type { IllustrationVariant } from '../src/schema.ts';
import { loadCatalog } from './catalog.ts';
import { categoryOption } from './category.ts';
import { ID_BATCH_SIZE, exportSvgUrls, getToken, request } from './figma.ts';
import { packageRoot, writeFileAtomically } from './files.ts';
import { checkSvg } from './svg.ts';

const svgDirectory = join(packageRoot, 'source/catalog/svg');
/** How many SVGs to download at a time, to stay within Figma's rate limits. */
const DOWNLOAD_CONCURRENCY = 4;

// Downloads the artwork the catalog names into the ignored svg directory. Existing files are
// kept unless --force is passed, so an interrupted run resumes where it stopped.
const yargsInstance = yargs(hideBin(process.argv));
const { category: only, force } = await yargsInstance
  .version(false)
  .strict()
  .options({
    category: {
      ...categoryOption,
      // For build:assets and the deploy workflow, which sets it empty for every category.
      default: process.env.ILLUSTRATIONS_CATEGORY || undefined,
      defaultDescription: '$ILLUSTRATIONS_CATEGORY, or every category',
    },
    force: {
      description: 'Download the SVGs that are already present again',
      type: 'boolean',
      default: false,
    },
  } satisfies Record<string, Options>)
  .wrap(yargsInstance.terminalWidth())
  .parseAsync();

const catalog = await loadCatalog(only);
const missing = catalog.families.flatMap((family) =>
  family.variants
    .filter((variant) => force || !existsSync(join(svgDirectory, variant.svg)))
    .map((variant) => ({ categoryId: family.categoryId, variant })),
);

if (!missing.length) {
  console.log('All SVGs are present.');
} else {
  const token = getToken();
  await mkdir(svgDirectory, { recursive: true });
  // Each category is its own Figma file, so a batch never mixes categories.
  const batches = Object.entries(
    Object.groupBy(missing, ({ categoryId }) => categoryId),
  ).flatMap(([categoryId, entries]) =>
    R.splitEvery(
      ID_BATCH_SIZE,
      entries.map(({ variant }) => variant),
    ).map((variants) => ({ categoryId, variants })),
  );
  const downloadedAfter = R.scan(
    (total, { variants }) => total + variants.length,
    0,
    batches,
  ).slice(1);
  const started = Date.now();
  const failures: string[] = [];
  for (const [index, { categoryId, variants }] of batches.entries()) {
    failures.push(...(await downloadBatch(categoryId, variants, token)));
    console.log(
      `[${Math.round((Date.now() - started) / 1000)}s] ${downloadedAfter[index]}/${missing.length} SVGs (${categoryId}), ${failures.length} failed.`,
    );
  }
  if (failures.length)
    throw new Error(
      `${failures.length} SVGs failed; rerun to retry them.\n${failures.slice(0, 20).join('\n')}`,
    );
  console.log(`Downloaded ${missing.length} SVGs.`);
}

/**
 * Downloads up to `ID_BATCH_SIZE` variants of a category, and describes the ones that failed, so
 * one bad SVG doesn't stop the rest.
 */
async function downloadBatch(
  categoryId: string,
  variants: IllustrationVariant[],
  token: string,
) {
  // Signed URLs expire, so each batch is downloaded before the next is requested.
  const urls = await exportSvgUrls(
    variants.map((variant) => variant.nodeId),
    token,
    getSource(categoryId).fileKey,
  );
  const results = await Array.fromAsync(
    R.splitEvery(DOWNLOAD_CONCURRENCY, variants),
    (group) =>
      Promise.allSettled(
        group.map((variant) => downloadSvg(variant, urls.get(variant.nodeId))),
      ),
  );
  return R.zip(variants, results.flat()).flatMap(([variant, result]) =>
    result.status === 'rejected'
      ? [
          `${variant.id}: ${result.reason instanceof Error ? result.reason.message : 'failed'}`,
        ]
      : [],
  );
}

/** Downloads, checks and saves the SVG of one variant. */
async function downloadSvg(variant: IllustrationVariant, url?: string) {
  if (!url) throw new Error(`Missing SVG URL for ${variant.nodeId}.`);
  const svg = await (await request(url)).text();
  await checkSvg(svg, variant);
  await writeFileAtomically(join(svgDirectory, variant.svg), svg);
}
