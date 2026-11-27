#!/usr/bin/env -S pnpm tsx

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import camelcase from 'camelcase';

const iconsDir = path.resolve(
  import.meta.dirname,
  './node_modules/@navikt/aksel-icons/dist/svg',
);
const outputDir = path.resolve(import.meta.dirname, './dist/css');
await mkdir(outputDir, { recursive: true });

const svgFilePaths = (await readdir(iconsDir)).filter((file) =>
  file.endsWith('.svg'),
);

await Promise.all(
  svgFilePaths.map(async (svgPath) => {
    const svgContent = await readFile(path.resolve(iconsDir, svgPath), 'utf-8');
    const iconName = camelcase(path.basename(svgPath, '.svg'), {
      preserveConsecutiveUppercase: true,
    });
    const cssContent = `:root { 
  --uds-icon-${iconName}: url("data:image/svg+xml,${encodeURIComponent(svgContent)}"); 
}`;
    await writeFile(path.join(outputDir, `${iconName}.css`), cssContent);
  }),
);
