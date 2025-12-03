import './style.css';
import React from 'react';
import type { DocsIndexEntry } from 'storybook/internal/types';
import { addons } from 'storybook/manager-api';
import {
  type TagBadgeParameters,
  defaultConfig,
  renderLabel,
} from 'storybook-addon-tag-badges/manager-helpers';
import {
  ComponentIcon,
  ImageIcon,
  LayersIcon,
  RectangleSectionsIcon,
  TokenIcon,
  WrenchIcon,
} from '@udir-design/icons';
import customTheme from './docs/customTheme';

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
        if (item.id === 'iconsandsymbols') {
          return (
            <>
              <ImageIcon aria-hidden fontSize={18} />
              Ikoner og symboler
            </>
          );
        }
        if (item.id === 'demo') {
          return (
            <>
              <RectangleSectionsIcon aria-hidden fontSize={18} />
              Demosider
            </>
          );
        }
        if (item.id === 'design-tokens') {
          return (
            <>
              <TokenIcon aria-hidden fontSize={18} />
              Design tokens
            </>
          );
        }
        if (item.id === 'patterns') {
          return (
            <>
              <LayersIcon aria-hidden fontSize={18} />
              Bruksmønstre
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
        if (
          // A docs page generated for a stories file always has sibling pages
          item.importPath.includes('.stories.') ||
          // When a docs page imports stories, we know it has sibling pages
          (item as unknown as DocsIndexEntry).storiesImports.length
        ) {
          // Rename the "Docs" page to "Dokumentasjon". Unfortunately we can't show the full hierarchical name
          // in the mobile navigation, since in this case `item.name` will also be shown in the sidebar tree navigation.
          item.name = 'Dokumentasjon';
        } else {
          // When a docs page doesn't have sibling pages, `item.name` is only shown in the mobile navigation.
          // This means we can rename it to show the full hierarchical name, which makes more sense
          // in context of Storybooks mobile navigation and has no impact on the desktop view.
          item.name = item.title
            .replaceAll('/', ' › ')
            .replace('bruksmønstre', 'Bruksmønstre')
            .replace('components', 'Komponenter')
            .replace('design-tokens', 'Design tokens')
            .replace('utilities', 'Hjelpeverktøy');
        }
      }
      return renderLabel(item);
    },
  },
});
