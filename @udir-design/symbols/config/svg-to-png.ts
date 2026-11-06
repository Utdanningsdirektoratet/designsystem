import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = path.resolve(import.meta.dirname, '../symbols');
const outputDir = path.resolve(import.meta.dirname, '../png');

const baseCanvas = 64; // reference box
const finalCanvas = 500; // final box
const measureDensity = 72; // normalize pt→px: 64pt ⇒ 64px
const renderDensity = 300; // high DPI for crisp final render
const scale = finalCanvas / baseCanvas; // shared scale
const transparent = { r: 255, g: 255, b: 255, alpha: 0 };

/** The size to render a symbol measured at `width`×`height` on the 64×64 reference box. */
const fitToCanvas = (width: number, height: number) => {
  // apply shared 64→500 factor
  const scaledW = Math.max(1, Math.round(width * scale));
  const scaledH = Math.max(1, Math.round(height * scale));
  if (scaledW <= finalCanvas && scaledH <= finalCanvas) {
    return { width: scaledW, height: scaledH };
  }
  // safety: clamp if any dimension would exceed the 500×500 canvas
  const fit = Math.min(finalCanvas / scaledW, finalCanvas / scaledH);
  return {
    width: Math.floor(scaledW * fit),
    height: Math.floor(scaledH * fit),
  };
};

// clean + recreate output
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

// Find SVGs
const files = fs
  .readdirSync(inputDir)
  .filter((f) => f.toLowerCase().endsWith('.svg'));
console.log(`Found ${files.length} SVG files in ${inputDir}`);

const skipped: string[] = [];

// one file at a time: sharp already spreads each conversion over its own thread pool
for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.svg$/i, '.png'));

  // measure natural size at 72dpi
  const measuredBuf = await sharp(inputPath, { density: measureDensity })
    .png()
    .toBuffer();
  const { width: w, height: h } = await sharp(measuredBuf).metadata();
  if (!Number.isFinite(w) || !Number.isFinite(h) || w === 0 || h === 0) {
    console.warn(`Could not measure ${file} (got ${w}×${h}). Skipping.`);
    skipped.push(file);
    continue;
  }

  const target = fitToCanvas(w, h);

  // render SVG directly to the target size
  const iconBuffer = await sharp(inputPath, { density: renderDensity })
    .resize(target.width, target.height, {
      fit: 'fill',
      withoutEnlargement: false,
      kernel: 'lanczos3',
      background: transparent,
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  // center on 500×500 canvas
  await sharp({
    create: {
      width: finalCanvas,
      height: finalCanvas,
      channels: 4,
      background: transparent,
    },
  })
    .composite([{ input: iconBuffer, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(
    `✅ ${path.relative(import.meta.dirname, outputPath)} — measured ${w}×${h} → scaled ${target.width}×${target.height} into ${finalCanvas}×${finalCanvas}`,
  );
}

if (skipped.length > 0) {
  console.warn(`Skipped ${skipped.length} file(s): ${skipped.join(', ')}`);
}
console.log('All done!');
