#!/usr/bin/env -S pnpm tsx
/**
 * Generates the `exports` field in @udir-design/react/package.json from the
 * tier barrel files, ensuring each component/hook is only importable via its
 * correct tier prefix:
 *   - stable  →  @udir-design/react/<name>
 *   - beta    →  @udir-design/react/beta/<name>
 *   - alpha   →  @udir-design/react/alpha/<name>
 *
 * Run directly:          pnpm --filter @udir-design/react generate:exports
 * Runs automatically:    before `build` and `dev` (via pnpm pre-scripts)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line @nx/enforce-module-boundaries -- build-tool intentionally reads tiers.ts directly from the react package
import { tiers } from '../../../@udir-design/react/tiers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reactPkgPath = path.resolve(
  __dirname,
  '../../../@udir-design/react/package.json',
);

// ---------------------------------------------------------------------------
// Entry builders
// ---------------------------------------------------------------------------

type ExportConditions = {
  types?: string;
  import?: string;
  require?: string;
};

type Entry = [
  string,
  ExportConditions | { import: string; require: string } | string,
];

function entryFor(distPath: string): ExportConditions {
  return {
    types: `./dist/${distPath}.d.ts`,
    import: `./dist/${distPath}.js`,
    require: `./dist/${distPath}.cjs`,
  };
}

const componentEntry = (name: string) => entryFor(`components/${name}/index`);
const typographyEntry = (name: string) =>
  entryFor(`components/typography/${name}/index`);
const hookEntry = (name: string) => entryFor(`hooks/${name}/index`);
const utilityEntry = (name: string) => entryFor(`utilities/${name}/index`);

/** Produces one entry per name. Returns [] when names is empty. */
function fromNames(
  names: string[],
  prefix: string,
  toEntry: (name: string) => ExportConditions,
): Entry[] {
  return names.map((name) => [`${prefix}${name}`, toEntry(name)]);
}

/**
 * Produces a single tier-barrel entry, or null when the tier has no members.
 * Null entries are filtered out before writing to package.json.
 */
function barrel(key: string, distPath: string, names: string[]): Entry | null {
  return names.length === 0
    ? null
    : [
        key,
        { import: `./dist/${distPath}.js`, require: `./dist/${distPath}.cjs` },
      ];
}

// ---------------------------------------------------------------------------
// Build the exports map
// ---------------------------------------------------------------------------

const pkgExports = Object.fromEntries(
  (
    [
      // -----------------------------------------------------------------------
      // Tier barrel entries (no types field — these are bundled, not per-file)
      // -----------------------------------------------------------------------
      ['.', { import: './dist/stable.js', require: './dist/stable.cjs' }],
      ['./alpha', { import: './dist/alpha.js', require: './dist/alpha.cjs' }],
      ['./beta', { import: './dist/beta.js', require: './dist/beta.cjs' }],
      // Utility barrels are omitted when the corresponding barrel file is empty
      barrel('./utilities', 'utilities/stable', tiers.stable.utilities),
      barrel('./utilities/beta', 'utilities/beta', tiers.beta.utilities),
      [
        './utilities/alpha',
        {
          import: './dist/utilities/alpha.js',
          require: './dist/utilities/alpha.cjs',
        },
      ],

      // -----------------------------------------------------------------------
      // Special entries
      // -----------------------------------------------------------------------
      ['./html', { types: './dist/html.d.ts' }],
      ['./style.css', './dist/style.css'],

      // -----------------------------------------------------------------------
      // Stable — no tier prefix in the import path
      // -----------------------------------------------------------------------
      ...fromNames(tiers.stable.components, './', componentEntry),
      ...fromNames(tiers.stable.hooks, './', hookEntry),
      ...fromNames(tiers.stable.utilities, './utilities/', utilityEntry),

      // -----------------------------------------------------------------------
      // Beta — must import via @udir-design/react/beta/<name>
      // Typography components are flattened: ./beta/heading not ./beta/typography/heading
      // -----------------------------------------------------------------------
      ...fromNames(tiers.beta.components, './beta/', componentEntry),
      ...fromNames(tiers.beta.typographyComponents, './beta/', typographyEntry),
      ...fromNames(tiers.beta.hooks, './beta/', hookEntry),
      ...fromNames(tiers.beta.utilities, './beta/utilities/', utilityEntry),

      // -----------------------------------------------------------------------
      // Alpha — must import via @udir-design/react/alpha/<name>
      // -----------------------------------------------------------------------
      ...fromNames(tiers.alpha.components, './alpha/', componentEntry),
      ...fromNames(tiers.alpha.hooks, './alpha/', hookEntry),
      ...fromNames(tiers.alpha.utilities, './alpha/utilities/', utilityEntry),
    ] satisfies (Entry | null)[]
  ).filter((e): e is Entry => e !== null),
);

// ---------------------------------------------------------------------------
// Write back to package.json
// ---------------------------------------------------------------------------

const pkg = JSON.parse(fs.readFileSync(reactPkgPath, 'utf-8')) as Record<
  string,
  unknown
>;
pkg['exports'] = pkgExports;
fs.writeFileSync(reactPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

console.log('✓ Generated exports in @udir-design/react/package.json');
