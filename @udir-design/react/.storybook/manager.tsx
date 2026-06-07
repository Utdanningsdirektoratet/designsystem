import './style.css';
import './manager.css';
import './addons/sourceCodeToolbar';
import '@pagefind/component-ui';
import '@pagefind/component-ui/css';
import React from 'react';
import type { API_HashEntry } from 'storybook/internal/types';
import { addons } from 'storybook/manager-api';
import {
  ComponentIcon,
  ImageIcon,
  LayersIcon,
  PuzzlePieceIcon,
  RectangleSectionsIcon,
  TokenIcon,
  WrenchIcon,
} from '@udir-design/icons';
import { type TagProps } from 'src/components/tag';
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
        if (item.id === 'hooks') {
          return (
            <>
              <PuzzlePieceIcon
                aria-hidden
                className="sidebar-subheading-icon"
              />
              Hooks
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

// ── Pagefind search modal (PoC) ─────────────────────────────────────────
// Storybook has no sidebar slot API, so we inject the search trigger into
// the sidebar DOM once it renders.

// Intercept ⌘K / Ctrl+K before Storybook's handler fires, so the
// Pagefind modal opens instead of "Find components". We stop the event
// AND programmatically click the trigger since stopPropagation blocks
// Pagefind's own listener too.
document.addEventListener(
  'keydown',
  (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      e.stopPropagation();
      document
        .querySelector<HTMLElement>('pagefind-modal-trigger button')
        ?.click();
    }
  },
  { capture: true },
);

// Listen for ⌘K from the preview iframe (which is a separate browsing context)
window.addEventListener('message', (e) => {
  if (e.data === 'pagefind:open') {
    document
      .querySelector<HTMLElement>('pagefind-modal-trigger button')
      ?.click();
  }
});
const searchRoot = document.createElement('div');
searchRoot.id = 'pagefind-search-root';
searchRoot.innerHTML = `
  <pagefind-config bundlepath="./pagefind/"></pagefind-config>
  <pagefind-modal-trigger placeholder="Search"></pagefind-modal-trigger>
  <pagefind-modal>
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
                  <span class="pf-result-category" style="display:block;font-size:0.7rem;opacity:0.5;margin-bottom:0.1rem">{{ meta.category }}</span>
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
  </pagefind-modal>
`;

const observer = new MutationObserver(() => {
  // The sidebar's flex container is the grandparent of .sidebar-header.
  // Insert our search root as a sibling of the wrapper div that contains
  // .sidebar-header, the filter input, and the tree nav.
  const sidebarHeaderWrapper = document.querySelector(
    'div:has(> .sidebar-header)',
  );
  if (
    sidebarHeaderWrapper &&
    !document.getElementById('pagefind-search-root')
  ) {
    sidebarHeaderWrapper.after(searchRoot);
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
