import type { StoryContext } from '@storybook/react-vite';
import type { Plugin } from 'prettier';
import * as EstreePlugin from 'prettier/plugins/estree';
import * as HtmlPlugin from 'prettier/plugins/html';
import * as TypescriptPlugin from 'prettier/plugins/typescript';
import { format as prettierFormat } from 'prettier/standalone';

/**
 * Use this as parameters.docs.source.transform as needed to better format React code.
 * Not enabled by default to avoid unnecessary performance hit.
 */
export const formatReactSource = async (src: string, ctx: StoryContext) => {
  return formatWithPrettier('typescript', src);
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
