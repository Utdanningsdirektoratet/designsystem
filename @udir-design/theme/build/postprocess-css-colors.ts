#!/usr/bin/env -S pnpm tsx
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

/*
 * A list of selectors that should reset the color palette to "neutral"
 * instead of inheriting the closest ancestor color palette
 */
const neutralComponents = [
  '.ds-breadcrumbs',
  '.ds-button',
  '.ds-field',
  '.ds-input',
  '.ds-link',
  '.ds-pagination',
  '.ds-suggestion',
  '.ds-togglegroup',
];

/** Changes the default color from accent to neutral, as [selector, replacement] in order. */
const replacements: [string, string][] = [
  [
    ':root, [data-color-scheme], [data-color="accent"]',
    '[data-color="accent"]',
  ],
  [
    '[data-color="neutral"]',
    `:root, [data-color-scheme], :not([data-color]):where(${neutralComponents.join(', ')}), [data-color="neutral"]`,
  ],
];

/**
 * Replaces the first occurrence of `selector` in `css`. Throws if it's missing, so that an
 * upstream change to the generated CSS fails the build instead of silently skipping the change.
 */
function replaceSelector(
  css: string,
  file: string,
  selector: string,
  replacement: string,
) {
  if (!css.includes(selector)) {
    throw new Error(`Expected selector ${selector} in ${file}`);
  }
  return css.replace(selector, replacement);
}

async function postprocessCssColors(file: string) {
  const css = replacements.reduce(
    (result, [selector, replacement]) =>
      replaceSelector(result, file, selector, replacement),
    await fs.readFile(file, { encoding: 'utf-8' }),
  );
  await fs.writeFile(file, css, { encoding: 'utf-8' });
}

const [filename] = parseArgs({ allowPositionals: true }).positionals;
if (!filename) {
  console.error('Usage: postprocess-css-colors.ts <file>');
  process.exit(1);
}

await postprocessCssColors(resolve(filename));
