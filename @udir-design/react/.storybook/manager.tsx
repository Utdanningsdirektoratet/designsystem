import './style.css';
import React from 'react';
import type { DocsIndexEntry } from 'storybook/internal/types';
import { addons } from 'storybook/manager-api';
import {
  ComponentIcon,
  ImageIcon,
  LayersIcon,
  RectangleSectionsIcon,
  TokenIcon,
  WrenchIcon,
} from '@udir-design/icons';
import { type TagProps } from 'src/components/tag/Tag';
import customTheme from './docs/customTheme';

const tagBadges = {
  alpha: {
    text: 'Alpha',
    color: 'danger',
  },
  beta: {
    text: 'Beta',
    color: 'warning',
  },
} satisfies Record<string, { text: string; color: TagProps['data-color'] }>;

type TagWithBadge = keyof typeof tagBadges;

const isTagBadge = (tag: string): tag is TagWithBadge =>
  tagBadges[tag as TagWithBadge] !== undefined;

const getBadgeFromTags = (tags: string[]) => {
  const typedTag = tags.find(isTagBadge);
  if (!typedTag) {
    return;
  }
  return {
    tag: typedTag,
    ...tagBadges[typedTag],
  };
};

addons.setConfig({
  theme: customTheme,
  sidebar: {
    renderLabel(item) {
      if (item.type === 'root') {
        if (item.id === 'iconsandsymbols') {
          return (
            <>
              <ImageIcon aria-hidden className="sidebar-subheading-icon" />
              Ikoner og symboler
            </>
          );
        }
        if (item.id === 'demo') {
          return (
            <>
              <RectangleSectionsIcon
                aria-hidden
                className="sidebar-subheading-icon"
              />
              Demosider
            </>
          );
        }
        if (item.id === 'design-tokens') {
          return (
            <>
              <TokenIcon aria-hidden className="sidebar-subheading-icon" />
              Design tokens
            </>
          );
        }
        if (item.id === 'patterns') {
          return (
            <>
              <LayersIcon aria-hidden className="sidebar-subheading-icon" />
              Bruksmønstre
            </>
          );
        }
        if (item.id === 'components') {
          return (
            <>
              <ComponentIcon aria-hidden className="sidebar-subheading-icon" />
              Komponenter
            </>
          );
        }
        if (item.id === 'utilities') {
          return (
            <>
              <WrenchIcon aria-hidden className="sidebar-subheading-icon" />
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
            .replace('patterns', 'Bruksmønstre')
            .replace('components', 'Komponenter')
            .replace('design-tokens', 'Design tokens')
            .replace('utilities', 'Hjelpeverktøy');
        }
      }

      // Add Tag component to tags that need it
      const badge = getBadgeFromTags(item.tags);
      if (badge && item.type !== 'story') {
        return (
          <>
            <span>{item.name}</span>
            <span
              className="ds-tag storybook-tag-badge"
              data-size="custom"
              data-variant="outline"
              data-color={badge.color}
            >
              {badge.text}
            </span>
          </>
        );
      }
    },
  },
});
