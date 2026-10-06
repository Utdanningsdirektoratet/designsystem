import sharp from 'sharp';
import type { IllustrationVariant } from '../src/schema.ts';

// Conservative fail-closed checks, not an SVG sanitizer. Unsupported constructs require review,
// never automatic rewriting. Reject entity/CSS escapes that can conceal external references.
export function validateSvg(svg: string) {
  if (
    !/^\s*(?:<\?xml[^?]*\?>\s*)?<svg\b/i.test(svg) ||
    !/<\/svg>\s*$/i.test(svg)
  )
    throw new Error('Expected a standalone SVG document.');
  // Embedded bitmaps are inert; every other data: URI stays rejected.
  const plain = svg.replace(
    /(<image\b[^>]*?\s(?:xlink:)?href=)(["'])data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=\s]*\2/gi,
    '$1$2#embedded-image$2',
  );
  if (
    /<!DOCTYPE|<!ENTITY|<!\[CDATA\[|&#|&(?!amp;|lt;|gt;|quot;|apos;)|\\|<\?(?!xml\s)/i.test(
      plain,
    )
  )
    throw new Error('Unsafe SVG entities, processing instructions or escapes.');
  const active =
    /<\s*\/?\s*(?:[\w-]+:)?(?:script|foreignObject|iframe|object|embed|animate\w*|set)\b|\bon[\w-]+\s*=|@|(?:javascript|https?|file|data):/i.exec(
      plain
        .replace(
          /xmlns="http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xlink)"/g,
          '',
        )
        .replace(/xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, ''),
    );
  if (active) {
    throw new Error(
      `Unsafe SVG active content or external URL: "${active[0]}".`,
    );
  }
  for (const match of plain.matchAll(
    /\b(?:[\w-]+:)?(?:href|src)\s*=\s*(["'])(.*?)\1/gis,
  )) {
    if (!/^#[a-z0-9_.:-]+$/i.test(match[2]))
      throw new Error('SVG references must be local fragments.');
  }
  for (const match of plain.matchAll(/url\s*\(([^)]*)\)/gi)) {
    if (!/^\s*(["']?)#[a-z0-9_.:-]+\1\s*$/i.test(match[1]))
      throw new Error('SVG CSS URLs must be local fragments.');
  }
}

export async function checkSvg(
  svg: string,
  variant: Pick<IllustrationVariant, 'width' | 'height'>,
) {
  validateSvg(svg);
  const bounds = await sharp(Buffer.from(svg), { density: 144 }).metadata();
  if (
    !bounds.width ||
    !bounds.height ||
    Math.abs(bounds.width / bounds.height - variant.width / variant.height) >
      (0.01 * variant.width) / variant.height
  ) {
    throw new Error('SVG aspect ratio does not match the mapped frame bounds.');
  }
}

export async function renderPng(
  svg: string,
  variant: Pick<IllustrationVariant, 'width' | 'height'>,
) {
  await checkSvg(svg, variant);
  const width = Math.round(variant.width * 2);
  const height = Math.round(variant.height * 2);
  const input = sharp(Buffer.from(svg), { density: 144 });
  // Uniform contain avoids stretching; transparent padding only accounts for rounding differences.
  const png = await input
    .resize(width, height, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const output = await sharp(png).metadata();
  if (output.width !== width || output.height !== height)
    throw new Error('Incorrect PNG output dimensions.');
  return png;
}
