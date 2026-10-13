import './style.css';
import './manager.css';
import './addons/sourceCodeToolbar';
import React from 'react';
import type { API_HashEntry } from 'storybook/internal/types';
import { addons } from 'storybook/manager-api';
import { type TagProps } from 'src/components/tag';
import customTheme from './docs/customTheme';
import { isSidebarEntryVisible } from './utils/sidebarVisibility';

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
    filters: {
      'udir-production-docs-only': (entry) =>
        isSidebarEntryVisible(entry, process.env.NODE_ENV === 'production'),
    },
    renderLabel(item) {
      if (item.type === 'root') {
        if (item.id === 'introduksjon') {
          return (
            <>
              <SidebarIcon name="informationSquare" />
              Introduksjon
            </>
          );
        }
        if (item.id === 'iconsandsymbols') {
          return (
            <>
              <SidebarIcon name="image" />
              Ikoner og symboler
            </>
          );
        }
        if (item.id === 'demo') {
          return (
            <>
              <SidebarIcon name="rectangleSections" />
              Demosider
            </>
          );
        }
        if (item.id === 'design-tokens') {
          return (
            <>
              <SidebarIcon name="token" />
              Design tokens
            </>
          );
        }
        if (item.id === 'patterns') {
          return (
            <>
              <SidebarIcon name="layers" />
              Bruksmønstre
            </>
          );
        }
        if (item.id === 'components') {
          return (
            <>
              <SidebarIcon name="component" />
              Komponenter
            </>
          );
        }
        if (item.id === 'hooks') {
          return (
            <>
              <SidebarIcon name="puzzlePiece" />
              Hooks
            </>
          );
        }
        if (item.id === 'utilities') {
          return (
            <>
              <SidebarIcon name="wrench" />
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
          .replace('hooks', 'Hooks')
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

/**
 * The icon is a CSS mask, so its `--uds-icon-<name>` variable must be imported in `manager.css`.
 */
function SidebarIcon({ name }: { name: string }) {
  return (
    <span
      className="sidebar-subheading-icon"
      style={{ maskImage: `var(--uds-icon-${name})` }}
    />
  );
}

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
