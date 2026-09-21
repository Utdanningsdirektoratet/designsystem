/**
 * Forbid relative imports that cross a package boundary.
 *
 * Import another workspace package by name instead, so dependency declarations
 * and package exports apply as they do for external consumers.
 *
 * Unlike `import/no-relative-packages`, this rule does not resolve modules,
 * stops at unnamed `package.json` files, and checks `import()` types.
 */

import { dirname, relative, resolve, sep } from 'node:path';
import type { RuleTester } from 'oxlint/plugins-dev';
import { findPackageDir, readPackageName } from './package-json.ts';

// Oxlint does not export plugin rule types; infer them from `RuleTester`.
type Rule = Parameters<RuleTester['run']>[1];
type RuleContext = Parameters<NonNullable<Rule['create']>>[0];

// Minimal AST shapes used by this rule.
type NodeWithSource = { source?: unknown };

type SourceLiteral = {
  raw: string | null;
  value: string;
  range: [number, number];
};

export const noRelativePackages = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid reaching into another workspace package through a relative path.',
    },
    // Required by Oxlint for a rule that reports fixes.
    fixable: 'code',
    messages: {
      relativePackage:
        'Relative import reaches into another package. Import from `{{suggestion}}` instead.',
    },
  },

  create(context: RuleContext) {
    const fileDir = dirname(context.filename);
    const ownPackageDir = findPackageDir(fileDir);

    function checkSource(node: NodeWithSource) {
      const source = node.source;
      if (!isStringLiteral(source) || !isRelative(source.value)) return;

      const suggestion = crossPackageSpecifier(
        fileDir,
        ownPackageDir,
        source.value,
      );
      if (suggestion === null) return;

      context.report({
        node: source,
        messageId: 'relativePackage',
        data: { suggestion },
        fix: (fixer) =>
          fixer.replaceText(source, requote(source.raw, suggestion)),
      });
    }

    return {
      ImportDeclaration: checkSource,
      ExportNamedDeclaration: checkSource,
      ExportAllDeclaration: checkSource,
      // `import('…')` as an expression, and the same syntax in type position.
      ImportExpression: checkSource,
      TSImportType: checkSource,
    };
  },
} satisfies Rule;

/** Accept only string-literal specifiers; computed imports cannot be checked. */
function isStringLiteral(source: unknown): source is SourceLiteral {
  return (
    typeof source === 'object' &&
    source !== null &&
    'value' in source &&
    typeof source.value === 'string'
  );
}

/** Only a relative specifier can bypass a package boundary. */
function isRelative(specifier: string): boolean {
  return /^\.\.?(\/|$)/.test(specifier);
}

/**
 * Return the package-name specifier for an import crossing a package boundary,
 * or `null` when the import stays within its package.
 */
function crossPackageSpecifier(
  fileDir: string,
  ownPackageDir: string | null,
  specifier: string,
): string | null {
  const targetPath = resolve(fileDir, specifier);
  const targetPackageDir = findPackageDir(targetPath);

  // There is no boundary to cross if either end sits outside every package, and
  // staying inside one package is exactly what relative paths are for.
  if (ownPackageDir === null || targetPackageDir === null) return null;
  if (targetPackageDir === ownPackageDir) return null;

  const packageName = readPackageName(targetPackageDir);
  if (packageName === null) return null;

  const subpath = relative(targetPackageDir, targetPath).split(sep).join('/');
  return subpath === '' ? packageName : `${packageName}/${subpath}`;
}

/** Preserve the original quote style when applying an autofix. */
function requote(originalRaw: string | null, specifier: string): string {
  const quote = originalRaw?.startsWith('"') ? '"' : "'";
  const escaped = specifier
    .replaceAll('\\', '\\\\')
    .replaceAll(quote, `\\${quote}`);
  return `${quote}${escaped}${quote}`;
}
