#!/usr/bin/env -S pnpm tsx

import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import type { ColorScheme } from './formats.js';
import { colorScheme } from './formats.js';
import { createConfig } from './sd-configs.js';

register(StyleDictionary);
StyleDictionary.registerFormat(colorScheme);

const DIST = path.resolve('dist');
const OUT = path.join(DIST, 'datavis.css');

const colorSchemes: ColorScheme[] = ['light', 'dark'];

/** The per-scheme CSS file that Style Dictionary writes, see `createConfig`. */
const tmpFile = (scheme: ColorScheme) =>
  path.join(DIST, `datavis-${scheme}.css`);

/** Builds the CSS for one color scheme with Style Dictionary. */
async function buildSchemeCss(scheme: ColorScheme) {
  console.log(`\n▶ Building ${scheme} theme…`);
  const sd = await new StyleDictionary().extend(createConfig(scheme));
  await sd.buildAllPlatforms();
  return readFile(tmpFile(scheme), 'utf8');
}

try {
  // One scheme at a time, so that the console output stays in order
  const css: string[] = [];
  for (const scheme of colorSchemes) {
    css.push(await buildSchemeCss(scheme));
  }
  await writeFile(OUT, css.map((block) => `${block}\n\n`).join(''), 'utf8');
} finally {
  await Promise.all(
    colorSchemes.map((scheme) => rm(tmpFile(scheme), { force: true })),
  );
}

console.log(`\n✅ All done! File at ${OUT}`);
