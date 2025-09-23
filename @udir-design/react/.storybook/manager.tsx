import React from 'react';
import { addons } from 'storybook/manager-api';
import {
  defaultConfig,
  renderLabel,
  type TagBadgeParameters,
} from 'storybook-addon-tag-badges';
import customTheme from './customTheme';
import './style.css';
import {
  ComponentIcon,
  RectangleSectionsIcon,
  WrenchIcon,
} from '@navikt/aksel-icons';

addons.setConfig({
  theme: customTheme,
  tagBadges: [
    {
      tags: 'alpha',
      badge: {
        text: 'Alpha',
        style: {
          backgroundColor: 'var(--ds-color-danger-surface-tinted)',
          borderColor: 'var(--ds-color-danger-surface-tinted)',
          borderRadius: 'var(--ds-border-radius-sm)',
          color: 'var(--ds-color-danger-text-default)',
        },
      },
    },
    {
      tags: 'beta',
      badge: {
        text: 'Beta',
        style: {
          backgroundColor: 'var(--ds-color-warning-surface-tinted)',
          borderColor: 'var(--ds-color-warning-surface-tinted)',
          borderRadius: 'var(--ds-border-radius-sm)',
          color: 'var(--ds-color-warning-text-default)',
        },
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
  sidebar: {
    renderLabel(item) {
      if (item.type === 'root') {
        if (item.id === 'demo') {
          return (
            <>
              <RectangleSectionsIcon aria-hidden fontSize={18} />
              Demosider
            </>
          );
        }
        if (item.id === 'components') {
          return (
            <>
              <ComponentIcon aria-hidden fontSize={18} />
              Komponenter
            </>
          );
        }
        if (item.id === 'utilities') {
          return (
            <>
              <WrenchIcon aria-hidden fontSize={18} />
              Hjelpeverktøy
            </>
          );
        }
      }
      if (item.type === 'docs' && item.name === 'Docs') {
        return 'Dokumentasjon';
      }
      return renderLabel(item);
    },
  },
});
