import { create } from '@storybook/theming';

export default create({
  brandImage: '/img/udir-logo.png',
  fontBase: '"Inter", sans-serif',
  // Colors
  base: 'light',
  colorSecondary: '#0A71BF',
  barTextColor: '#2B2B2B',
  textColor: '#2B2B2B', // Text colors does not work with css vars
  inputTextColor: '#243142',
  appBg: 'var(--ds-color-neutral-background-tinted)',
  appPreviewBg: 'var(--ds-color-neutral-background-default)',
  appContentBg: 'var(--ds-color-neutral-background-default)',
});
