import atImport from 'postcss-import';
import atImportGlob from 'postcss-import-ext-glob';
import nesting from 'postcss-nesting';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import pkg from './package.json' with { type: 'json' };

const dependencies = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

/** @import { Config } from 'postcss-load-config'; */
/** @type {Config} */
export default {
  plugins: [
    atImportGlob,
    atImport({
      // Don't inline external dependencies
      filter: (path) => !dependencies.includes(path),
    }),
    // postcssComposes(), // can copy the definition from Digdir if we want to use @composes
    nesting,
    cssnano({ preset: 'default' }),
    autoprefixer,
  ],
};
