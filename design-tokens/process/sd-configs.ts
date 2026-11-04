import { basename } from 'node:path';
import { Config, type TransformedToken } from 'style-dictionary/types';
import { type ColorScheme, colorScheme } from './formats.js';

export const createConfig = (scheme: ColorScheme): Config => ({
  source: [`visualization/data-visualization/${scheme}.json`],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      prefix: 'uds-data-color',
      buildPath: 'dist/',
      selector:
        scheme === 'light'
          ? ':root, [data-color-scheme="light"]'
          : '[data-color-scheme="dark"]',
      layer: `ds.theme.color-scheme.${scheme}`,
      files: [
        {
          destination: `datavis-${scheme}.css`,
          format: colorScheme.name,
          filter: (t) =>
            basename(t.filePath).toLowerCase() === `${scheme}.json`,
        },
        // Bundled by `@udir-design/react` as the anchors of the generated sequential palettes,
        // which are light mode only
        ...(scheme === 'light'
          ? [
              {
                destination: 'datavis-light.json',
                format: 'json/nested',
                filter: (t: TransformedToken) =>
                  basename(t.filePath).toLowerCase() === 'light.json',
              },
            ]
          : []),
      ],
    },
  },
});
