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
        bgColor: '#D2E5F3',
        fgColor: 'var(--ds-color-text-default)',
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
