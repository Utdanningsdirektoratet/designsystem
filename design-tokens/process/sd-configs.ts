import { basename } from 'node:path';
import { Config } from 'style-dictionary/types';
import { type ColorScheme, colorScheme } from './formats.js';

export const createConfig = (scheme: ColorScheme): Config => ({
  source: [`visualization/data-visualization/${scheme}.json`],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'dist/',
      selector:
        scheme === 'light'
          ? ':root, [data-color-scheme="light"]'
          : '[data-color-scheme="dark"]',
      layer: `ds.theme.color-scheme.${scheme}`,
      files: [
        {
          destination: `udir-data-${scheme}.css`,
          format: colorScheme.name,
          filter: (t) =>
            basename(t.filePath).toLowerCase() === `${scheme}.json`,
        },
      ],
    },
  },
});
