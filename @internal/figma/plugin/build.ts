import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pluginCode } from './plugin-code.ts';

const outDir = path.join(import.meta.dirname, 'dist');
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, 'code.js'), pluginCode());
console.log(
  `Wrote ${path.relative(process.cwd(), path.join(outDir, 'code.js'))}`,
);
