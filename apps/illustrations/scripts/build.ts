import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema } from '../src/schema.ts';
import { packageRoot, replaceDirectory } from './files.ts';
import { renderPng } from './svg.ts';

const svgDirectory = join(packageRoot, 'source/catalog/svg');
// Limits the build to one category, for trying the whole chain on a small set first.
const only = process.env.ILLUSTRATIONS_CATEGORY || undefined;

await replaceDirectory(
  join(packageRoot, 'public/illustrations-assets'),
  async (stage) => {
    const full = catalogSchema.parse(
      JSON.parse(
        await readFile(
          join(packageRoot, 'source/catalog/metadata.json'),
          'utf8',
        ),
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
    await mkdir(join(stage, 'svg'));
    await mkdir(join(stage, 'png'));
    const missing = catalog.families
      .flatMap((family) => family.variants)
      .filter((variant) => !existsSync(join(svgDirectory, variant.svg)));
    if (missing.length)
      throw new Error(
        `${missing.length} SVGs are missing from source/catalog/svg. Run "pnpm fetch:svgs" (needs FIGMA_TOKEN).`,
      );
    for (const family of catalog.families) {
      for (const variant of family.variants) {
        const svg = await readFile(
          join(packageRoot, 'source/catalog/svg', variant.svg),
          'utf8',
        );
        const png = await renderPng(svg, variant);
        await writeFile(join(stage, 'svg', variant.svg), svg);
        await writeFile(join(stage, 'png', `${variant.id}.png`), png);
      }
    }
    await writeFile(
      join(stage, 'metadata.json'),
      JSON.stringify(catalog, null, 2) + '\n',
    );
    console.log(
      `Offline build prepared (${catalog.state}, ${catalog.families.length} families).`,
    );
  },
);
console.log('Offline build complete.');
