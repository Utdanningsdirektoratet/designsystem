import fs from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

/*
 * A list of selectors that should reset the color palette to "neutral"
 * instead of inheriting the closest ancestor color palette
 */
const neutralComponents = [
  '.ds-breadcrumbs',
  '.ds-button',
  '.ds-field',
  '.ds-input',
  '.ds-pagination',
  '.ds-suggestion',
  '.ds-togglegroup',
];

const infoComponents = ['.ds-link'];

export async function postprocessCssColors(file: string) {
  // Change default color from accent to neutral
  const css = (await fs.readFile(resolve(cwd(), file), { encoding: 'utf-8' }))
    .replace(
      ':root, [data-color-scheme], [data-color="accent"]',
      '[data-color="accent"]',
    )
    .replace(
      '[data-color="neutral"]',
      `:root, [data-color-scheme], :not([data-color]):where(${neutralComponents.join(', ')}), [data-color="neutral"]`,
    )
    .replace(
      '[data-color="info"]',
      `[data-color="info"], :not([data-color]):where(${infoComponents.join(', ')})`,
    );

  await fs.writeFile(file, css, { encoding: 'utf-8' });
}
