import './style.css';
import './manager.css';
import './addons/sourceCodeToolbar';
import '@pagefind/component-ui/css';
import { type PagefindModal, configureInstance } from '@pagefind/component-ui';
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

// ── Search ───────────────────────────────────────────────────────────────────
// Pagefind search, using the index built by `plugins/pagefind`.

configureInstance('default', {
  // Resolve against the page URL, so the search works when Storybook is
  // hosted in a subdirectory, also when the URL ends with `index.html`.
  baseUrl: new URL('.', window.location.href).pathname,
  bundlePath: new URL('pagefind/', window.location.href).pathname,
}).setLanguage('nb');

// The modal lives in <body>, outside the sidebar, so it keeps working while
// the sidebar is hidden, and on small screens where the sidebar is in a menu.
const searchModal = document.createElement('pagefind-modal') as PagefindModal;
searchModal.innerHTML = `
  <pagefind-modal-header>
    <pagefind-input></pagefind-input>
    <pagefind-filter-dropdown filter="category" label="Kategori"></pagefind-filter-dropdown>
  </pagefind-modal-header>
  <pagefind-modal-body>
    <pagefind-summary></pagefind-summary>
    <pagefind-results>
      <script type="text/pagefind-template">
        <li class="pf-result">
          <div class="pf-result-card">
            <div class="pf-result-content">
              <p class="pf-result-title">
                {{#if meta.category}}
                  <span class="uds-search-result-category">{{ meta.category }}</span>
                {{/if}}
                <a class="pf-result-link" href="{{ meta.url | default(url) | safeUrl }}">{{ meta.title }}</a>
                {{#if meta.tier}}
                  <span class="ds-tag storybook-tag-badge" data-size="custom" data-variant="outline" data-color="{{ meta.tier_color }}">{{ meta.tier }}</span>
                {{/if}}
              </p>
              {{#if excerpt}}
                <p class="pf-result-excerpt">{{+ excerpt +}}</p>
              {{/if}}
            </div>
          </div>
          {{#if sub_results}}
            <ul class="pf-heading-chips">
              {{#each sub_results as sub}}
                <li class="pf-heading-chip">
                  <a class="pf-heading-link" href="{{ sub.url | safeUrl }}">{{ sub.title }}</a>
                  <p class="pf-heading-excerpt">{{+ sub.excerpt +}}</p>
                </li>
              {{/each}}
            </ul>
          {{/if}}
        </li>
      </script>
    </pagefind-results>
  </pagefind-modal-body>
  <pagefind-modal-footer>
    <pagefind-keyboard-hints></pagefind-keyboard-hints>
  </pagefind-modal-footer>
`;
document.body.append(searchModal);

// Take over ⌘K / Ctrl+K from Storybook's sidebar search, which manager.css
// hides. Listen in the capture phase to run before Storybook's listener.
document.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      event.stopPropagation();
      searchModal.open();
    }
  },
  { capture: true },
);

// The preview iframe forwards the shortcut, see `preview-head.html`.
window.addEventListener('message', (event) => {
  if (
    event.origin === window.location.origin &&
    event.data === 'pagefind:open'
  ) {
    searchModal.open();
  }
});

// Storybook has no API for adding to the sidebar, so add a search button below
// the sidebar header whenever Storybook renders one: on load, after the sidebar
// is hidden and shown again, and when the menu opens on small screens.
new MutationObserver(() => {
  for (const header of document.querySelectorAll('.sidebar-header')) {
    const wrapper = header.parentElement;
    if (wrapper?.nextElementSibling?.localName !== 'pagefind-modal-trigger') {
      const trigger = document.createElement('pagefind-modal-trigger');
      // The Norwegian translation would use the lowercase "søk".
      trigger.setAttribute('placeholder', 'Søk');
      wrapper?.after(trigger);
    }
  }
}).observe(document.body, { childList: true, subtree: true });
