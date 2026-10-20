import './style.css';
import './manager.css';
import './addons/sourceCodeToolbar';
import './search/searchDialog';
import React from 'react';
import type { API_HashEntry } from 'storybook/internal/types';
import { addons } from 'storybook/manager-api';
import customTheme from './docs/customTheme';
import { getRootCategory, getTierBadge } from './utils/sidebarLabels';
import { isSidebarEntryVisible } from './utils/sidebarVisibility';

addons.setConfig({
  theme: customTheme,
  sidebar: {
    filters: {
      'udir-production-docs-only': (entry) =>
        isSidebarEntryVisible(entry, process.env.NODE_ENV === 'production'),
    },
    renderLabel(item) {
      if (item.type === 'root') {
        const category = getRootCategory(item.id);
        if (category) {
          return (
            <>
              <SidebarIcon name={category.icon} />
              {category.label}
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
        const [root, ...rest] = item.title.split('/');
        let hierarchicalName = [
          getRootCategory(root)?.label ?? root,
          ...rest,
        ].join(' › ');
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
  const badge = getTierBadge(item.tags);
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
