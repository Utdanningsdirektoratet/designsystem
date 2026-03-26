import type { Config } from '@svgr/core';
import template from './config/template.ts';

export default {
  typescript: true,
  ref: true,
  titleProp: false,
  dimensions: false,
  jsxRuntime: 'automatic',
  svgProps: {
    focusable: 'false',
    role: 'img',
  },
  template,
} satisfies Config;
