import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'postcss';
import atImport from 'postcss-import';
import atImportGlob from 'postcss-import-ext-glob';
import nesting from 'postcss-nesting';
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
    postcssComposes(),
    nesting,
    cssnano({ preset: 'default' }),
    autoprefixer,
  ],
};

/** @import { Plugin } from 'postcss'; */
/** @returns {Plugin} */
function postcssComposes() {
  return {
    postcssPlugin: '@composes', // Allows `@composes classname from './file.css'` directive
    AtRule: {
      composes: async (rule) => {
        const cache = {};
        const sanitizedParams = rule.params.replace(/["']/g, '').trim();
        const [selector, from] = sanitizedParams.split(/\s+from\s+/);

        let resolvedFrom;
        if (!from.match(/^[/.]/)) {
          // If it looks like an external module, try to resolve it from node_modules
          try {
            const moduleFrom = import.meta.resolve(from);
            resolvedFrom = fileURLToPath(moduleFrom);
          } catch {
            // do nothing, and fall back to regular path resolution
          }
        }
        if (!resolvedFrom) {
          resolvedFrom = path.resolve(
            path.dirname(rule.source.input.file),
            from,
          );
        }

        if (!cache[resolvedFrom])
          cache[resolvedFrom] = await postcss([]).process(
            fs.readFileSync(resolvedFrom),
            {
              from: resolvedFrom,
            },
          );

        cache[resolvedFrom].root.walkRules((fromRule) => {
          if (fromRule.selector.split(/:|\s/)[0] === `.${selector}`) {
            rule.replaceWith(
              fromRule.clone({
                selector: fromRule.selector.replace(`.${selector}`, '&'),
              }),
            );
          }
        });
      },
    },
  };
}
