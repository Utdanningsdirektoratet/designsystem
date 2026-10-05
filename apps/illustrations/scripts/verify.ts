import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { catalogSchema } from '../src/schema.ts';
import { parseCli } from './category.ts';
import { exportSvgUrls, getToken, parseHierarchy, request } from './figma.ts';
import { packageRoot } from './files.ts';
import { resolveMapping } from './mapping.ts';
import { renderPng } from './svg.ts';

// Deliberately manual: reference PNGs are inspection evidence, not canonical assets.
try {
  const { categoryId, source, inventory } = parseCli(process.argv.slice(2));
  const evidence = JSON.parse(
    await readFile(join(inventory, 'hierarchy.json'), 'utf8'),
  );
  const mapping = JSON.parse(
    await readFile(join(packageRoot, 'source/import-map.json'), 'utf8'),
  );
  const previous = catalogSchema.parse(
    JSON.parse(
      await readFile(join(packageRoot, 'source/catalog/metadata.json'), 'utf8'),
    ),
  );
  const catalog = resolveMapping(
    mapping,
    parseHierarchy(evidence.hierarchy, source.pageNodeId),
    previous,
    false,
    categoryId,
  );
  const all = catalog.families
    .filter((family) => family.categoryId === categoryId)
    .flatMap((family) => family.variants);
  const samples = new Map<string, (typeof all)[number]>();
  for (const [key, values] of Object.entries({
    Format: ['Landskap (16:9)', 'Portrett (4:5)', 'Kvadrat (1:1)'],
    Bakgrunn: ['Ja', 'Nei'],
    'Geometrisk form': ['Ja', 'Nei'],
    Fargetema: ['grønn', 'blå', 'brun'],
  })) {
    for (const value of values) {
      const sample = all.find((variant) => variant.properties[key] === value);
      if (sample) samples.set(sample.nodeId, sample);
    }
  }
  for (const family of catalog.families.filter(
    (item) =>
      item.categoryId === categoryId && !item.name.startsWith('aktivitet'),
  )) {
    const sample = family.variants[0];
    if (
      ![...samples.values()].some(
        (item) => item.id.split('-')[0] === sample.id.split('-')[0],
      )
    )
      samples.set(sample.nodeId, sample);
  }
  const token = getToken();
  const ids = [...samples.keys()];
  const svgs = await exportSvgUrls(ids, token, source.fileKey);
  const pngs = await exportSvgUrls(ids, token, source.fileKey, fetch, 'png');
  const directory = join(inventory, 'fidelity');
  await mkdir(directory, { recursive: true });
  const report = [];
  for (const variant of samples.values()) {
    const svg = await (await request(svgs.get(variant.nodeId)!)).text();
    const derived = await renderPng(svg, variant);
    const reference = Buffer.from(
      await (await request(pngs.get(variant.nodeId)!)).arrayBuffer(),
    );
    const derivedImage = await sharp(derived)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const referenceImage = await sharp(reference)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const sameBounds =
      derivedImage.info.width === referenceImage.info.width &&
      derivedImage.info.height === referenceImage.info.height;
    let error = 0;
    if (sameBounds) {
      for (let i = 0; i < derivedImage.data.length; i += 4) {
        const a = derivedImage.data[i + 3] / 255;
        const b = referenceImage.data[i + 3] / 255;
        for (let channel = 0; channel < 3; channel++)
          error += Math.abs(
            derivedImage.data[i + channel] * a -
              referenceImage.data[i + channel] * b,
          );
        error += Math.abs(
          derivedImage.data[i + 3] - referenceImage.data[i + 3],
        );
      }
    }
    const meanError = sameBounds ? error / derivedImage.data.length : null;
    report.push({
      id: variant.id,
      properties: variant.properties,
      sameBounds,
      generatedDimensions: [derivedImage.info.width, derivedImage.info.height],
      figmaDimensions: [referenceImage.info.width, referenceImage.info.height],
      meanPremultipliedChannelError: meanError,
    });
    await writeFile(join(directory, `${variant.id}.svg`), svg);
    await writeFile(join(directory, `${variant.id}-derived.png`), derived);
    await writeFile(join(directory, `${variant.id}-figma.png`), reference);
    console.log(
      `${variant.id}: same bounds=${sameBounds}, mean error=${meanError?.toFixed(3) ?? 'n/a'}/255`,
    );
  }
  await writeFile(
    join(directory, 'report.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
  if (
    report.some(
      (sample) =>
        !sample.sameBounds ||
        sample.meanPremultipliedChannelError === null ||
        sample.meanPremultipliedChannelError > 3,
    )
  )
    throw new Error(
      'Reference comparison requires visual review before importing. Evidence saved in the category inventory fidelity folder.',
    );
  console.log(
    'Reference comparisons passed. Review representative images in inventory/fidelity before full import.',
  );
} catch (error) {
  console.error(
    error instanceof Error ? error.message : 'Fidelity check failed.',
  );
  process.exitCode = 1;
}
