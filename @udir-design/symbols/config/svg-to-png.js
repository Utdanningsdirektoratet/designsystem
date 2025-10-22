import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../symbols');
const outputDir = path.resolve(__dirname, '../png');

const baseCanvas = 64; // reference box
const finalCanvas = 500; // final box
const measureDensity = 72; // normalize pt→px: 64pt ⇒ 64px
const renderDensity = 300; // high DPI for crisp final render
const scale = finalCanvas / baseCanvas; // shared scale

// clean + recreate output
if (fs.existsSync(outputDir))
  fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

// Find SVGs
const files = fs
  .readdirSync(inputDir)
  .filter((f) => f.toLowerCase().endsWith('.svg'));
console.log(`Found ${files.length} SVG files in ${inputDir}`);

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.svg$/i, '.png'));

  // measure natural size at 72dpi
  const measuredBuf = await sharp(inputPath, { density: measureDensity })
    .png()
    .toBuffer();
  const measuredMeta = await sharp(measuredBuf).metadata();
  const w = measuredMeta.width ?? 0;
  const h = measuredMeta.height ?? 0;
  if (!Number.isFinite(w) || !Number.isFinite(h) || w === 0 || h === 0) {
    console.warn(`Could not measure ${file} (got ${w}×${h}). Skipping.`);
    continue;
  }

  // apply shared 64→500 factor
  let targetW = Math.max(1, Math.round(w * scale));
  let targetH = Math.max(1, Math.round(h * scale));

  // safety: clamp if any dimension would exceed the 500×500 canvas
  if (targetW > finalCanvas || targetH > finalCanvas) {
    const fit = Math.min(finalCanvas / targetW, finalCanvas / targetH);
    targetW = Math.floor(targetW * fit);
    targetH = Math.floor(targetH * fit);
  }

  // render SVG directly to targetW×targetH
  const iconBuffer = await sharp(inputPath, { density: renderDensity })
    .resize(targetW, targetH, {
      fit: 'fill',
      withoutEnlargement: false,
      kernel: 'lanczos3',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  // center on 500×500 canvas
  await sharp({
    create: {
      width: finalCanvas,
      height: finalCanvas,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([{ input: iconBuffer, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(
    `✅ ${path.relative(__dirname, outputPath)} — measured ${w}×${h} → scaled ${targetW}×${targetH} into ${finalCanvas}×${finalCanvas}`,
  );
}

console.log('All done!');
