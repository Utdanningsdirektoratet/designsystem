import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema, getSource, isCategoryId } from '../src/schema.ts';
import type { IllustrationVariant } from '../src/schema.ts';
import { exportSvgUrls, getToken, request } from './figma.ts';
import { packageRoot } from './files.ts';
import { checkSvg } from './svg.ts';

const svgDirectory = join(packageRoot, 'source/catalog/svg');

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// Downloads artwork named by metadata.json into the ignored svg directory. Existing files are
// kept unless --force is passed, so an interrupted run resumes where it stopped.
try {
  let only: string | undefined =
    process.env.ILLUSTRATIONS_CATEGORY || undefined;
  let force = false;
  for (const arg of process.argv.slice(2)) {
    if (arg === '--force') force = true;
    else if (arg.startsWith('--category=')) only = arg.slice(11);
    else throw new Error(`Unsupported argument: ${arg}.`);
  }
  if (only !== undefined && !isCategoryId(only))
    throw new Error(`Unknown category: ${only}.`);

  const catalog = catalogSchema.parse(
    JSON.parse(
      await readFile(join(packageRoot, 'source/catalog/metadata.json'), 'utf8'),
    ),
  );
  const wanted = new Map<string, IllustrationVariant[]>();
  let total = 0;
  for (const family of catalog.families) {
    if (only && family.categoryId !== only) continue;
    for (const variant of family.variants) {
      total++;
      if (!force && (await exists(join(svgDirectory, variant.svg)))) continue;
      wanted.set(family.categoryId, [
        ...(wanted.get(family.categoryId) ?? []),
        variant,
      ]);
    }
  }
  const count = [...wanted.values()].reduce((n, list) => n + list.length, 0);
  if (!count) {
    console.log(`All ${total} SVGs are present.`);
  } else {
    const token = getToken();
    await mkdir(svgDirectory, { recursive: true });
    const started = Date.now();
    const failures: string[] = [];
    let done = 0;
    for (const [categoryId, variants] of wanted) {
      const { fileKey } = getSource(categoryId);
      for (let offset = 0; offset < variants.length; offset += 25) {
        const batch = variants.slice(offset, offset + 25);
        // Signed URLs expire, so each batch is downloaded before the next is requested.
        const urls = await exportSvgUrls(
          batch.map((variant) => variant.nodeId),
          token,
          fileKey,
        );
        for (let index = 0; index < batch.length; index += 4) {
          const group = batch.slice(index, index + 4);
          const results = await Promise.allSettled(
            group.map(async (variant) => {
              const url = urls.get(variant.nodeId);
              if (!url)
                throw new Error(`Missing SVG URL for ${variant.nodeId}.`);
              const svg = await (await request(url)).text();
              await checkSvg(svg, variant);
              const target = join(svgDirectory, variant.svg);
              await writeFile(`${target}.tmp`, svg);
              await rename(`${target}.tmp`, target);
            }),
          );
          results.forEach((result, position) => {
            if (result.status !== 'rejected') return;
            const reason =
              result.reason instanceof Error ? result.reason.message : 'failed';
            failures.push(`${group[position].id}: ${reason}`);
          });
        }
        done += batch.length;
        console.log(
          `[${Math.round((Date.now() - started) / 1000)}s] ${done}/${count} SVGs (${categoryId}), ${failures.length} failed.`,
        );
      }
    }
    if (failures.length)
      throw new Error(
        `${failures.length} SVGs failed; rerun to retry them.\n${failures.slice(0, 20).join('\n')}`,
      );
    console.log(`Downloaded ${count} SVGs.`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Fetch failed.');
  process.exitCode = 1;
}
