import { loadCsf } from 'storybook/internal/csf-tools';
import type { Plugin } from 'vite';

export function addStorySourceLocations(
  code: string,
  fileName: string,
): string {
  const csf = loadCsf(code, {
    fileName,
    makeTitle: (title) => title || 'Story',
  }).parse();
  // These AST fields are internal to Storybook; cover them with runtime tests
  // so upgrades cannot silently invalidate the generated annotations.
  const scope = Object.values(csf._storyPaths)[0]?.scope;
  if (!scope) return code;
  const isStory = scope.generateUidIdentifier('udirIsStory').name;
  const entries = Object.keys(csf._storyExports).flatMap((exportName) => {
    const node = csf._storyPaths[exportName]?.node;
    const location = node?.loc;
    if (!location) return [];
    return [
      `[${isStory}(${exportName}) ? ${exportName}.input : ${exportName}, ${JSON.stringify({ startLine: location.start.line, endLine: location.end.line })}]`,
    ];
  });
  if (!entries.length) return code;
  // The factory parser does not classify alias exports as stories. Count all
  // local exports, not just recognized stories, to detect shared references.
  const exports = csf._ast.program.body.flatMap((statement) => {
    if (statement.type !== 'ExportNamedDeclaration' || statement.source)
      return [];
    if (statement.declaration?.type === 'VariableDeclaration') {
      return statement.declaration.declarations.flatMap(({ id }) =>
        id.type === 'Identifier' ? [id.name] : [],
      );
    }
    if (statement.declaration?.type === 'FunctionDeclaration') {
      return statement.declaration.id ? [statement.declaration.id.name] : [];
    }
    return statement.specifiers.flatMap((specifier) =>
      specifier.type === 'ExportSpecifier' &&
      statement.exportKind !== 'type' &&
      specifier.exportKind !== 'type'
        ? [specifier.local.name]
        : [],
    );
  });
  const exportedAnnotations = exports.map(
    (name) => `${isStory}(${name}) ? ${name}.input : ${name}`,
  );
  // Evaluate exports before declaring block-local variables, avoiding shadowing
  // of story names. Shared annotations cannot represent two export locations:
  // leave those untouched so both links fall back to the source file.
  return `${code}\nimport { isStory as ${isStory} } from 'storybook/internal/csf';
((entries, exports) => {
  for (const [annotations, location] of entries) {
    if (exports.filter(value => value === annotations).length !== 1) continue;
    annotations.parameters = { ...annotations.parameters, udirSourceLocation: location };
  }
})([${entries.join(',\n')}], [${exportedAnnotations.join(',\n')}]);`;
}

export function storySourceLocationPlugin(): Plugin {
  return {
    name: 'udir-story-source-location',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.stories\.[jt]sx?$/.test(id) || id.includes('/node_modules/'))
        return;
      try {
        const transformed = addStorySourceLocations(code, id);
        if (transformed === code) return;
        // Original source is retained verbatim; only annotations are appended.
        return { code: transformed, map: null };
      } catch (error) {
        this.warn(
          `Could not extract story source locations for ${id}: ${String(error)}`,
        );
        return;
      }
    },
  };
}
