import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'postcss';
import easyImport from 'postcss-easy-import';
import nesting from 'postcss-nesting';
import pkg from './package.json' with { type: 'json' };

const dependencies = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

/** @type Array<(path: string) => boolean> */
const importFilters = [
  // Don't inline external dependencies
  (path) => !dependencies.includes(path),
  // Don't inline local imports
  (path) => !path.startsWith('./'),
];

/** @import { Config } from 'postcss-load-config'; */
/** @type {Config} */
export default {
  plugins: [
    easyImport({
      /** @type (path: string) => boolean */
      filter: (path) => importFilters.every((fn) => fn(path)),
    }),
    postcssComposes(),
    inlineIconColors(),
    nesting,
    cssnano({ preset: 'default' }),
    autoprefixer,
  ],
};

/**
 * Resolves the `{{DSC-ICON-COLOR-LIGHT}}` / `{{DSC-ICON-COLOR-DARK}}` placeholders
 * left in components' hardcoded icon data-URIs (see e.g.
 * `@udir-design/react/src/components/chevronIcon.css`).
 *
 * SVG `background-image`s can't inherit `currentColor`, so those icons are hardcoded
 * as color variants swapped per color scheme, instead of using upstream's gradient
 * trick. Rather than duplicating the theme's hex value by hand (which could drift
 * out of sync if the theme changes), this plugin reads the actual resolved
 * `--ds-color-neutral-text-default` value straight out of `@udir-design/theme`'s
 * build output and inlines it at build time.
 *
 * @returns {Plugin}
 */
function inlineIconColors() {
  const placeholders = {
    light: '{{DSC-ICON-COLOR-LIGHT}}',
    dark: '{{DSC-ICON-COLOR-DARK}}',
  };

  /** @type {{ light: string; dark: string } | undefined} */
  let colors;

  function getColors() {
    if (colors) return colors;

    const themeCssPath = path.resolve(
      import.meta.dirname,
      '../theme/dist/index.css',
    );
    const themeCss = fs.readFileSync(themeCssPath, 'utf-8');

    const darkSchemeIndex = themeCss.indexOf('[data-color-scheme="dark"]');
    if (darkSchemeIndex === -1) {
      throw new Error(
        `Could not find '[data-color-scheme="dark"]' in ${themeCssPath} while resolving icon colors.`,
      );
    }
    const lightSection = themeCss.slice(0, darkSchemeIndex);
    const darkSection = themeCss.slice(darkSchemeIndex);

    const extractHex = (section, schemeLabel) => {
      const match = section.match(
        /--ds-color-neutral-text-default:\s*#([0-9a-fA-F]{3,8})/,
      );
      if (!match) {
        throw new Error(
          `Could not resolve --ds-color-neutral-text-default for the ${schemeLabel} scheme in ${themeCssPath} while resolving icon colors.`,
        );
      }
      return match[1];
    };

    colors = {
      light: extractHex(lightSection, 'light'),
      dark: extractHex(darkSection, 'dark'),
    };
    return colors;
  }

  return {
    postcssPlugin: 'inline-icon-colors',
    OnceExit(root) {
      root.walkDecls((decl) => {
        if (!decl.value.includes('DSC-ICON-COLOR-')) return;

        const { light, dark } = getColors();
        decl.value = decl.value
          .replaceAll(placeholders.light, light)
          .replaceAll(placeholders.dark, dark);

        if (decl.value.includes('DSC-ICON-COLOR-')) {
          throw decl.error('Found an unresolved DSC-ICON-COLOR-* placeholder.');
        }
      });
    },
  };
}

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
