import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadCatalog } from './catalog.ts';
import { packageRoot, replaceDirectory } from './files.ts';
import { optimizeSvg, renderPng } from './svg.ts';

const svgDirectory = join(packageRoot, 'source/catalog/svg');
// Limits the build to one category, for trying the whole chain on a small set first.
const only = process.env.ILLUSTRATIONS_CATEGORY || undefined;

await replaceDirectory(
  join(packageRoot, 'public/illustrations-assets'),
  async (stage) => {
    const catalog = await loadCatalog(only);
    await mkdir(join(stage, 'svg'));
    await mkdir(join(stage, 'png'));
    const variants = catalog.families.flatMap((family) => family.variants);
    const missing = variants.filter(
      (variant) => !existsSync(join(svgDirectory, variant.svg)),
    );
    if (missing.length)
      throw new Error(
        `${missing.length} SVGs are missing from source/catalog/svg. Run "pnpm fetch:svgs" (needs FIGMA_TOKEN).`,
      );
    const total = variants.length;
    const started = Date.now();
    let done = 0;
    for (const family of catalog.families) {
      for (const variant of family.variants) {
        const svg = optimizeSvg(
          await readFile(join(svgDirectory, variant.svg), 'utf8'),
        );
        const png = await renderPng(svg, variant);
        await writeFile(join(stage, 'svg', variant.svg), svg);
        await writeFile(join(stage, 'png', `${variant.id}.png`), png);
        done++;
        if (done % 100 === 0 || done === total)
          console.log(
            `[${Math.round((Date.now() - started) / 1000)}s] ${done}/${total} PNGs (${family.categoryId}).`,
          );
      }
    }
    await writeFile(
      join(stage, 'metadata.json'),
      JSON.stringify(catalog, null, 2) + '\n',
    );
    console.log(
      `Built ${total} SVGs and PNGs for ${catalog.families.length} families (${catalog.state}).`,
    );
  },
);
