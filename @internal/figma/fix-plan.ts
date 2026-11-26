/**
 * Writes `fix-plugin/plan.json`, the variable changes the fix plugin makes in Udir's library:
 * code syntax taken from Digdir's library and translated to the CSS variables Udir's theme
 * actually has, and Digdir's scopes, including the empty scopes that hide primitives from the
 * variable pickers. The plugin's binding fixes are rules in `fix-plugin/main.js`, not part of
 * the plan.
 *
 *   node @internal/figma/fix-plan.ts <digdir-snapshot-dir> <udir-snapshot-dir> <udir-theme-css>
 *
 * For example, after `pnpm turbo @udir-design/theme#build`:
 *
 *   node @internal/figma/fix-plan.ts @internal/figma/snapshots/digdir/v1.23.0 \
 *     @internal/figma/snapshots/udir/2026-11-26 @udir-design/theme/dist/index.css
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadRules } from './rules.ts';
import {
  type SnapshotFile,
  type VariableCollectionData,
  groupBy,
  loadFiles,
} from './snapshots.ts';

export type VariableFix = {
  /** `Collection/variable`, as in Udir's library. */
  label: string;
  /** The `WEB` code syntax. */
  codeSyntax?: string;
  scopes?: string[];
};

export type FixPlan = {
  variables: VariableFix[];
  /** Udir variables left without code syntax, with the reason. */
  skipped: { label: string; reason: string }[];
};

/**
 * Plans the variable fixes. `variableNames` maps Udir's names for parts of variable names to
 * Digdir's (`support1` → `brand1`), as in the rules file.
 */
export function planVariableFixes(
  digdirFiles: SnapshotFile[],
  udirFiles: SnapshotFile[],
  themeCss: string,
  variableNames: Record<string, string>,
): FixPlan {
  const cssProperties = new Set(themeCss.match(/--ds-[\w-]+(?=\s*:)/g));
  const digdir = variablesByLabel(digdirFiles);
  const toDigdir = (label: string) =>
    label
      .split('/')
      .map((part) => variableNames[part] ?? part)
      .join('/');
  const toUdirCss = (property: string) =>
    Object.entries(variableNames).reduce(
      (text, [udir, digdirName]) =>
        text.replace(new RegExp(`-${digdirName}(?=-|$)`, 'g'), `-${udir}`),
      property,
    );

  const variables: VariableFix[] = [];
  const skipped: FixPlan['skipped'] = [];
  for (const [label, variable] of variablesByLabel(udirFiles)) {
    const digdirVariable = digdir.get(toDigdir(label));
    const fix: VariableFix = { label };

    const digdirSyntax = digdirVariable?.codeSyntax?.WEB;
    if (typeof digdirSyntax === 'string') {
      const property = /^var\((--[\w-]+)\)$/.exec(digdirSyntax)?.[1];
      const udirProperty = property && toUdirCss(property);
      if (udirProperty && cssProperties.has(udirProperty)) {
        fix.codeSyntax = `var(${udirProperty})`;
      } else {
        skipped.push({
          label,
          reason: udirProperty
            ? `${udirProperty} is not in Udir's theme CSS`
            : `Digdir's code syntax ${digdirSyntax} is not a single var()`,
        });
      }
    } else if (variable.codeSyntax?.WEB === undefined) {
      skipped.push({
        label,
        reason: digdirVariable
          ? "Digdir's variable has no code syntax either"
          : 'no Digdir variable with this name',
      });
    }

    // Digdir's scopes wherever they differ, also when they are empty (hidden from the pickers).
    if (digdirVariable && !sameScopes(digdirVariable.scopes, variable.scopes)) {
      fix.scopes = [...digdirVariable.scopes];
    }
    if (fix.codeSyntax !== undefined || fix.scopes !== undefined) {
      variables.push(fix);
    }
  }
  return { variables, skipped };
}

function sameScopes(a: string[], b: string[]): boolean {
  const key = (scopes: string[]) =>
    [...scopes].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0)).join();
  return key(a) === key(b);
}

function variablesByLabel(files: SnapshotFile[]) {
  const result = new Map<string, VariableCollectionData['variables'][number]>();
  for (const file of files) {
    if (file.part !== 'variables') continue;
    for (const collection of file.data as VariableCollectionData[]) {
      for (const variable of collection.variables) {
        result.set(`${collection.name}/${variable.name}`, variable);
      }
    }
  }
  return result;
}

if (import.meta.main) {
  const [digdirDir, udirDir, cssFile] = process.argv.slice(2);
  if (!digdirDir || !udirDir || !cssFile) {
    console.error(
      'Usage: node @internal/figma/fix-plan.ts <digdir-snapshot-dir> <udir-snapshot-dir> <udir-theme-css>',
    );
    process.exit(2);
  }
  const rules = loadRules(
    path.join(import.meta.dirname, 'udir-to-digdir.json'),
  );
  const plan = planVariableFixes(
    loadFiles(digdirDir),
    loadFiles(udirDir),
    readFileSync(cssFile, 'utf8'),
    rules.variableNames ?? {},
  );
  const out = path.join(import.meta.dirname, 'fix-plugin', 'plan.json');
  writeFileSync(out, `${JSON.stringify(plan, null, 2)}\n`);
  const withSyntax = plan.variables.filter((fix) => fix.codeSyntax).length;
  const withScopes = plan.variables.filter((fix) => fix.scopes).length;
  console.log(
    `Wrote ${path.relative(process.cwd(), out)}: code syntax for ${withSyntax} variables, scopes for ${withScopes}, ${plan.skipped.length} left without code syntax.`,
  );
  for (const [reason, entries] of groupBy(plan.skipped, (entry) =>
    entry.reason.replace(/^--[\w-]+/, '<property>'),
  )) {
    console.log(`  ${entries.length} skipped: ${reason}`);
  }
}
