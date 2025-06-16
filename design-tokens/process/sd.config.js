// process/sd.config.js
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { colorScheme } from './formats.js';

register(StyleDictionary);
StyleDictionary.registerFormat(colorScheme);

const schemes = ['light', 'dark'];

// scope your source to pick up nested files
const baseSource = schemes.map(s =>
  `visualization/data-visualization/**/${s}.json`
);

const platforms = schemes.reduce((acc, scheme) => {
  const isLight = scheme === 'light';
  acc[`css_${scheme}`] = {
    source: [`visualization/data-visualization/**/${scheme}.json`],
    // actually run the tokens-studio preprocessor
    preprocessors: ['tokens-studio'],
    selector:    `${isLight ? ':root, ' : ''}[data-color-scheme="${scheme}"]`,
    layer:       `ds.theme.color-scheme.${scheme}`,
    transformGroup: 'tokens-studio',
    transforms: ['name/kebab'],
    buildPath: 'dist/',
    files: [{
      destination: `udir-data-${scheme}.css`,
      format:   colorScheme.name,
      filter:      t => t.filePath.endsWith(`${scheme}.json`),
    }],
  };
  return acc;
}, {});

export default {
  source: baseSource,
  platforms,
};
