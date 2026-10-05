import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema } from '../src/schema.ts';
import { packageRoot, replaceDirectory } from './files.ts';
import { renderPng } from './svg.ts';

await replaceDirectory(
  join(packageRoot, 'public/illustrations-assets'),
  async (stage) => {
    const catalog = catalogSchema.parse(
      JSON.parse(
        await readFile(
          join(packageRoot, 'source/catalog/metadata.json'),
          'utf8',
        ),
      ),
    );
    await mkdir(join(stage, 'svg'));
    await mkdir(join(stage, 'png'));
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
