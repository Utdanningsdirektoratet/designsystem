import * as R from 'ramda';
import type { Format } from 'style-dictionary/types';
import { createPropertyFormatter } from 'style-dictionary/utils';

export type ColorScheme = 'light' | 'dark';

const prefersColorScheme = (colorScheme: ColorScheme, content: string) => `
@media (prefers-color-scheme: ${colorScheme}) {
  [data-color-scheme="auto"] ${content}
}
`;

export const colorScheme: Format = {
  name: 'ds/css-colorscheme',
  format: async ({ dictionary, options, platform }) => {
    const { allTokens } = dictionary;
    const { outputReferences, usesDtcg } = options;
    const { selector, colorScheme, layer } = platform;

    const colorScheme_ = colorScheme;

    const format = createPropertyFormatter({
      outputReferences,
      dictionary,
      format: 'css',
      usesDtcg,
    });

    const colorSchemeProperty =
      colorScheme_ === 'dark' || colorScheme_ === 'light'
        ? `\n  color-scheme: ${colorScheme_};\n`
        : '';

    const formattedTokens = allTokens.map(format).join('\n');
    const content = `{\n${formattedTokens}\n${colorSchemeProperty}}\n`;
    const autoSelectorContent = ['light', 'dark'].includes(colorScheme_)
      ? prefersColorScheme(colorScheme_, content)
      : '';
    const body = R.isNotNil(layer)
      ? `@layer ${layer} {\n${selector} ${content} ${autoSelectorContent}\n}\n`
      : `${selector} ${content} ${autoSelectorContent}\n`;

    return body;
  },
};
