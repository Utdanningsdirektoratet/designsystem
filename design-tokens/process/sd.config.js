// process/sd.config.js
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { colorScheme } from './formats.js';

// register transforms & format
register(StyleDictionary);
StyleDictionary.registerFormat(colorScheme);

// helper: generates a platform object for a given scheme
const colorSchemeVariables = ({ 'color-scheme': scheme = 'light' }) => {
  const selector = `${scheme === 'light' ? ':root, ' : ''}[data-color-scheme="${scheme}"]`;
  const layer = `ds.theme.color-scheme.${scheme}`;

  return {
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        colorScheme: scheme,
        selector,
        layer,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: 'dist/',
        files: [
          {
            destination: `udir-data-${scheme}.css`,
            format: colorScheme.name,
            filter: (token) => token.filePath.endsWith(`/${scheme}.json`),
          },
        ],
      },
    },
  };
};

// build a config with two platforms: css_light and css_dark
const schemes = ['light', 'dark'];
const baseSource = ['visualization/data-visualization/**/*.json'];
const basePreprocessors = ['tokens-studio'];

const platforms = schemes.reduce((acc, scheme) => {
  const cfg = colorSchemeVariables({ 'color-scheme': scheme });
  // pull out the `css` platform and rename it
  acc[`css_${scheme}`] = cfg.platforms.css;
  return acc;
}, {});

export default  {
  source: baseSource,
  preprocessors: basePreprocessors,
  platforms,
};

