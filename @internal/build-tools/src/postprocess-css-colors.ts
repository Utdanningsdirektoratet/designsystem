import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

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
    );

  await fs.writeFile(file, css, { encoding: 'utf-8' });
}
