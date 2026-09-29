import type { Config } from '@svgr/core';
import template from './config/template.ts';

/**
 * The options of @navikt/aksel-icons
 * (https://github.com/navikt/aksel/blob/main/@navikt/aksel-icons/.svgrrc.js),
 * so the components render the same markup as Aksel's. Their
 * `replaceAttrValues` is left out because the published SVGs we read already
 * use `currentColor`.
 */
export default {
  typescript: true,
  ref: true,
  icon: true,
  titleProp: true,
  jsxRuntime: 'automatic',
  svgProps: {
    // svgr turns `{…}` into a JSX expression, giving `focusable={false}` like Aksel
    focusable: '{false}',
    role: 'img',
  },
  // The SVGs are read from node_modules. Don't let svgr pick up an svgo config
  // from a directory above them; use svgr's built-in svgo settings, as Aksel does.
  runtimeConfig: false,
  template,
} satisfies Config;
