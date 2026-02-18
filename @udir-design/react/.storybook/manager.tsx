import './style.css';
import './manager.css';
import React from 'react';
import type { API_HashEntry } from 'storybook/internal/types';
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

      if (item.type === 'group' && item.parent === 'patterns') {
        // Trick Storybook into rendering grouped pattern documentation like a component instead of a folder.
        // That way, it automatically opens the primary documentation page when opening the group.
        item.type = 'component' as 'group';
      }

      if (
        (item.type === 'docs' && item.name === 'Docs') ||
        item.type === 'story'
      ) {
        let prettyName = item.name;
        if (item.type === 'docs') {
          prettyName = item.title.includes('components')
            ? // For component docs, rename "Docs" to "Dokumentasjon"
              'Dokumentasjon'
            : // For non-component docs, use the parent's name
              (item.title.split('/').at(-1) ?? item.name);
        }
        let hierarchicalName = item.title
          .replaceAll('/', ' › ')
          .replace('iconsandsymbols', 'Ikoner og symboler')
          .replace('patterns', 'Bruksmønstre')
          .replace('components', 'Komponenter')
          .replace('design-tokens', 'Design tokens')
          .replace('utilities', 'Hjelpeverktøy');
        if (item.type === 'story') {
          // For stories, add the story name as well
          hierarchicalName += ` › ${item.name}`;
        }
        return (
          <RenderWithTagBadge item={item}>
            {/* Show the hierarchical name on the button to open the nav menu on mobile */}
            <span className="uds-sb-mobile-nav-button">{hierarchicalName}</span>
            {/* Show the pretty name in the sidebar */}
            <span className="uds-sb-sidebar-name">{prettyName}</span>
          </RenderWithTagBadge>
        );
      }

      // Add Tag component to tags that need it
      return <RenderWithTagBadge item={item} />;
    },
  },
});

function RenderWithTagBadge({
  item,
  children,
}: {
  item: API_HashEntry;
  children?: React.ReactNode;
}) {
  // Add Tag component to tags that need it
  const badge = getBadgeFromTags(item.tags);
  if (badge && item.type !== 'story') {
    return (
      <>
        <span>{children ?? item.name}</span>
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
  } else {
    return children ?? item.name;
  }
}
