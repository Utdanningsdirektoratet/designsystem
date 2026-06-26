#!/usr/bin/env -S pnpm tsx
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

type ColorTree = { [key: string]: string | ColorTree };

const knownPalettes = [
  'support1',
  'support2',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
  'focus',
];

type ColorEntry = {
  /** Nested path, e.g. ['accent', 'text', 'subtle'] */
  path: string[];
  /** Resolved hex value, e.g. '#3d6651' */
  value: string;
  /** CSS custom property name, e.g. '--ds-color-accent-text-subtle' */
  varName: string;
};

/** Converts kebab-case segments to a single camelCase string. */
function toCamelCase(parts: string[]): string {
  return (
    parts[0] +
    parts
      .slice(1)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
  );
}

/** Sets a value at a nested path in the tree, creating intermediate objects as needed. */
function setNested(obj: ColorTree, path: string[], value: string) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]] || typeof current[path[i]] === 'string') {
      current[path[i]] = {};
    }
    current = current[path[i]] as ColorTree;
  }
  current[path[path.length - 1]] = value;
}

/** Extracts --ds-color-* entries from a CSS block. */
function parseColorEntries(cssBlock: string): ColorEntry[] {
  const entries: ColorEntry[] = [];
  const regex = /--ds-color-([a-z0-9-]+):\s*(#[0-9a-fA-F]+)/g;
  let match;

  while ((match = regex.exec(cssBlock)) !== null) {
    const varPath = match[1];
    const value = match[2].toLowerCase();
    const varName = `--ds-color-${varPath}`;

    // Find matching palette (longest match first to handle support1/support2)
    const palette = knownPalettes
      .filter((p) => varPath === p || varPath.startsWith(p + '-'))
      .sort((a, b) => b.length - a.length)[0];

    if (!palette) continue;

    const rest = varPath.slice(palette.length + 1);
    if (!rest) continue;

    const parts = rest.split('-');

    const path =
      parts.length === 1
        ? [palette, parts[0]]
        : [palette, parts[0], toCamelCase(parts.slice(1))];

    entries.push({ path, value, varName });
  }

  return entries;
}

/** Builds a nested object from entries using a value selector. */
function buildTree(
  entries: ColorEntry[],
  getValue: (entry: ColorEntry) => string,
): ColorTree {
  const tree: ColorTree = {};
  for (const entry of entries) {
    setNested(tree, entry.path, getValue(entry));
  }
  return tree;
}

/** Extracts the content of the first CSS rule block matching the given selector. */
function extractCssBlock(css: string, selector: string): string {
  const idx = css.indexOf(selector);
  if (idx === -1) throw new Error(`Selector not found: ${selector}`);

  const braceStart = css.indexOf('{', idx);
  let depth = 0;
  for (let i = braceStart; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') {
      depth--;
      if (depth === 0) return css.slice(braceStart + 1, i);
    }
  }
  throw new Error(`Unmatched brace for selector: ${selector}`);
}

/** Formats a ColorTree as a JS object literal string. */
function formatJsValue(value: string | ColorTree, indent: number): string {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  const pad = ' '.repeat(indent);
  const entries = Object.entries(value)
    .map(([key, val]) => `${pad}  ${key}: ${formatJsValue(val, indent + 2)},`)
    .join('\n');
  return `{\n${entries}\n${pad}}`;
}

/** Formats a ColorTree as a TypeScript type literal string. */
function formatDtsValue(value: string | ColorTree, indent: number): string {
  if (typeof value === 'string') {
    return 'string';
  }
  const pad = ' '.repeat(indent);
  const entries = Object.entries(value)
    .map(([key, val]) => `${pad}  ${key}: ${formatDtsValue(val, indent + 2)};`)
    .join('\n');
  return `{\n${entries}\n${pad}}`;
}

const colorsJsdoc = `/**
 * Resolved color hex values for each color scheme (light and dark).
 *
 * @example
 * \`\`\`ts
 * colors.light.accent.text.subtle // '#3d6651'
 * colors.dark.neutral.text.default // '#ececec'
 * \`\`\`
 */`;

const colorVarsJsdoc = `/**
 * CSS custom property references for color tokens.
 * Values resolve to the correct color based on the active color scheme at runtime.
 *
 * @example
 * \`\`\`ts
 * colorVars.accent.text.subtle // 'var(--ds-color-accent-text-subtle)'
 * \`\`\`
 */`;

async function generateColorTokens(cssFile: string, outputDir: string) {
  const css = await fs.readFile(resolve(cwd(), cssFile), { encoding: 'utf-8' });

  const lightEntries = parseColorEntries(
    extractCssBlock(css, ':root, [data-color-scheme="light"]'),
  );
  const darkEntries = parseColorEntries(
    extractCssBlock(css, '[data-color-scheme="dark"]'),
  );

  const colors = {
    light: buildTree(lightEntries, (e) => e.value),
    dark: buildTree(darkEntries, (e) => e.value),
  };

  // Variable names are the same for both schemes
  const colorVars = buildTree(lightEntries, (e) => `var(${e.varName})`);

  const header =
    '/** Auto-generated from CSS color tokens. Do not edit manually. */';

  const js = [
    header,
    '',
    colorsJsdoc,
    `export const colors = ${formatJsValue(colors, 0)};`,
    '',
    colorVarsJsdoc,
    `export const colorVars = ${formatJsValue(colorVars, 0)};`,
    '',
  ].join('\n');

  const dts = [
    header,
    '',
    colorsJsdoc,
    `export declare const colors: ${formatDtsValue(colors, 0)};`,
    '',
    colorVarsJsdoc,
    `export declare const colorVars: ${formatDtsValue(colorVars, 0)};`,
    '',
  ].join('\n');

  await fs.writeFile(resolve(cwd(), outputDir, 'colors.js'), js, 'utf-8');
  await fs.writeFile(resolve(cwd(), outputDir, 'colors.d.ts'), dts, 'utf-8');
}

const inputFile = process.argv[2];
const outputDir = process.argv[3];
if (!inputFile || !outputDir) {
  console.error(
    'Usage: generate-color-tokens.ts <input-css-file> <output-dir>',
  );
  process.exit(1);
}

await generateColorTokens(inputFile, outputDir);
