// process/sd.config.js
import { basename } from 'node:path';
import { register } from '@tokens-studio/sd-transforms';
import * as SDmod from 'style-dictionary';
import { colorScheme } from './formats.js';

const StyleDictionary = SDmod.default || SDmod;
register(StyleDictionary);
StyleDictionary.registerFormat(colorScheme);

const scheme = (process.env.COLOR_SCHEME || 'light').toLowerCase();
const isLight = scheme === 'light';

export default {
  source: [`visualization/data-visualization/${scheme}.json`],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms:     ['name/kebab'],
      buildPath:      'dist/',
      selector:       isLight
                          ? ':root, [data-color-scheme="light"]'
                          : '[data-color-scheme="dark"]',
      layer:          `ds.theme.color-scheme.${scheme}`,
      files: [
        {
          destination: `udir-data-${scheme}.css`,
          format:      colorScheme.name,
          filter:      t => basename(t.filePath).toLowerCase() === `${scheme}.json`,
        },
      ],
    },
  },
};
