import template from './config/template.js';

export default {
  typescript: true,
  ref: true,
  titleProp: true,
  dimensions: false,
  jsxRuntime: 'automatic',
  svgProps: {
    focusable: false,
    role: 'img',
  },
  template,
};
