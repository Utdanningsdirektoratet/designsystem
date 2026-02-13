import type { DocsTypes } from '@storybook/addon-docs';
import camelcase from 'camelcase';
import type { Plugin } from 'prettier';
import * as EstreePlugin from 'prettier/plugins/estree';
import * as HtmlPlugin from 'prettier/plugins/html';
import * as TypescriptPlugin from 'prettier/plugins/typescript';
import { format as prettierFormat } from 'prettier/standalone';
import type { StoryContext } from 'storybook/internal/types';
import type { RequiredDeep } from 'type-fest';
import type { Parameters } from '.storybook/types';

type SourceTransformer =
  RequiredDeep<DocsTypes>['parameters']['docs']['source']['transform'];

/**
 * Use this as parameters.docs.source.transform as needed to better format React code.
 * Not enabled by default to avoid unnecessary performance hit.
 */
export const formatReactSource: SourceTransformer = async (
  src,
  ctx: StoryContext,
) => {
  const extractedRenderMatches = src.match(
    /(^ +)(render[:(])( ?(?:.|\n)+)(^\1[})])/m,
  );
  const fullMatch = extractedRenderMatches?.[0];
  const endingMatch = extractedRenderMatches?.[4];

  let srcToFormat = src;
  if (fullMatch && endingMatch) {
    const matchLines = fullMatch.split('\n');
    // The ending match might be later than the end of the render function,
    // e.g. if a multiline object follows the render function.
    // We need to find the location of the first match and cut the code example there.
    const firstEndingMatchLocation = matchLines.findIndex((line) =>
      line.startsWith(endingMatch),
    );
    const extractedRender = matchLines
      .slice(0, firstEndingMatchLocation + 1)
      .join('\n')
      .trim();
    const storyNamePascal = camelcase(ctx.name, { pascalCase: true });
    srcToFormat = extractedRender
      .replace(/^render:/, `const ${storyNamePascal} =`)
      .replace(/^render\(/, `function ${storyNamePascal}(`);
  }

  return formatWithPrettier('typescript', srcToFormat);
};

/**
 * Helper to format code with prettier in Storybook docs
 */
async function formatWithPrettier(
  format: 'html' | 'typescript',
  unformatted: string,
) {
  const parserPlugins = {
    html: [HtmlPlugin] as Plugin[],
    typescript: [EstreePlugin, TypescriptPlugin] as Plugin[],
  };
  return prettierFormat(unformatted, {
    parser: format,
    plugins: parserPlugins[format],
  });
}

/** Set parameters.docs to this for better (but static) code examples when using hooks etc */
export const advancedCodeDocs = {
  source: { type: 'code', transform: formatReactSource },
} satisfies Parameters['docs'];
