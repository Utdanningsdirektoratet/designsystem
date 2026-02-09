#!/usr/bin/env -S pnpm tsx

import { appendFile, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import type { ColorScheme } from './formats.js';
import { colorScheme } from './formats.js';
import { createConfig } from './sd-configs.js';

register(StyleDictionary);
StyleDictionary.registerFormat(colorScheme);

const DIST = path.resolve('dist');
const OUT = path.join(DIST, 'dataviz.css');

// 1) clear or create the combined file
await writeFile(OUT, '', 'utf8');

const colorSchemes: ColorScheme[] = ['light', 'dark'];

for (const scheme of colorSchemes) {
  console.log(`\n▶ Building ${scheme} theme…`);

  // 2) run Style Dictionary to generate the per-scheme CSS file
  const sd = await new StyleDictionary().extend(createConfig(scheme));
  await sd.buildAllPlatforms();

  // 3) read that file and append to the combined one
  const tmpFile = path.join(DIST, `dataviz-${scheme}.css`);
  const css = await readFile(tmpFile, 'utf8');
  await appendFile(OUT, css + '\n\n', 'utf8');

  // 4) clean up the temporary file
  await unlink(tmpFile);
}

console.log(`\n✅ All done! File at ${OUT}`);
