import { addons } from '@storybook/manager-api';
import {
  defaultConfig,
  type TagBadgeParameters,
} from 'storybook-addon-tag-badges';
import customTheme from './customTheme';
import './style.css';

addons.setConfig({
  theme: customTheme,
  tagBadges: [
    {
      tags: 'alpha',
      badge: {
        text: 'Alpha',
        bgColor: 'var(--ds-color-danger-surface-tinted)',
        borderColor: 'var(--ds-color-danger-border-subtle)',
        fgColor: 'var(--ds-color-danger-text-default)',
      },
    },
    {
      tags: 'beta',
      badge: {
        text: 'Beta',
        bgColor: 'var(--ds-color-warning-surface-tinted)',
        borderColor: 'var(--ds-color-warning-border-subtle)',
        fgColor: 'var(--ds-color-warning-text-default)',
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
