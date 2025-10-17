import fg from 'fast-glob';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync, mkdirSync, rmSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { sync } = fg;

main();

function main() {
  const basePath = resolve(__dirname, '../symbols');
  const symbolFolder = resolve(__dirname, '../dist/svg');

  const svgList = sync('*.svg', { cwd: basePath });
  console.log('Found', svgList.length, 'SVG files');

  if (existsSync(symbolFolder)) {
    rmSync(symbolFolder, { recursive: true, force: true });
  }
  mkdirSync(symbolFolder, { recursive: true });

  svgList.forEach((svg) => {
    const symbol = readFileSync(`${basePath}/${svg}`, 'utf8');
    writeFileSync(`${symbolFolder}/${svg}`, parseSymbol(symbol));
    console.log('Parsing', svg);
  });
}

/**
 * @param {string} svgString
 * @returns {string}
 */
function parseSymbol(svgString) {
  return svgString
    .replace(`width="64"`, `width="1em"`)
    .replace(`height="64"`, `height="1em"`);
}

export default { parseSymbol, main };
