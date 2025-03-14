import fs from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

export async function postprocessCssColors(file: string) {
  // Change default color from accent to neutral
  const css = (await fs.readFile(resolve(cwd(), file), { encoding: 'utf-8' }))
    .replace(
      ':root, [data-color-scheme], [data-color="accent"]',
      '[data-color="accent"]',
    )
    .replace(
      '[data-color="neutral"]',
      ':root, [data-color-scheme], [data-color="neutral"]',
    );

  await fs.writeFile(file, css, { encoding: 'utf-8' });
}
