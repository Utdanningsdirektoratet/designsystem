import path from 'path';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';

const schemes = ['light', 'dark'];
const DIST = path.resolve('dist');
const OUT = path.join(DIST, 'udir-data.css');

// 1) clear or create the combined file
writeFileSync(OUT, '', 'utf8');

for (const scheme of schemes) {
  console.log(`\n▶ Building ${scheme} theme…`);

  // 2) run Style Dictionary to generate the per-scheme CSS file
  execSync('style-dictionary build --config process/sd.config.js', {
    env: { ...process.env, COLOR_SCHEME: scheme },
    stdio: 'inherit',
  });

  // 3) read that file and append to the combined one
  const tmpFile = path.join(DIST, `udir-data-${scheme}.css`);
  const css = readFileSync(tmpFile, 'utf8');
  appendFileSync(OUT, css + '\n\n', 'utf8');

  // 4) clean up the temporary file
  unlinkSync(tmpFile);
}

console.log(`\n✅ All done! File at ${OUT}`);
