import '@pagefind/component-ui/css';
import './searchDialog.css';
import {
  type PagefindFilterDropdown,
  type PagefindModal,
  configureInstance,
} from '@pagefind/component-ui';
import { getRootCategories, getTierBadges } from '../utils/sidebarLabels';

// Pagefind search, using the index that `buildSearchIndex.ts` builds.
//
// The search is in Norwegian while Storybook's own controls are in English, so
// the search elements get `lang="nb"` for screen readers, and `setLanguage`
// translates Pagefind's texts. Pagefind picks the index language from
// `<html lang>`, but the index only has `nb`, which it falls back to.

const searchInstance = configureInstance('default', {
  // Resolve against the page URL, so the search works when Storybook is
  // hosted in a subdirectory, also when the URL ends with `index.html`.
  baseUrl: new URL('.', window.location.href).pathname,
  bundlePath: new URL('pagefind/', window.location.href).pathname,
  // In Norwegian, å is a separate letter, not a with an accent. By default,
  // Pagefind treats them as the same, so "å" matched every word starting with
  // "a", and a quoted phrase with "å" found nothing on pages that also contain
  // the word "a", such as in `<a>` in code examples. This also stops "ide" from
  // matching "idé". Reconsider when these are fixed:
  // https://github.com/Pagefind/pagefind/issues/1377
  // https://github.com/Pagefind/pagefind/issues/1378
  exactDiacritics: true,
});
searchInstance.setLanguage('nb');

// The instance adds its screen reader announcements, such as the number of
// results, in a container directly in <body>.
for (const announcer of document.querySelectorAll<HTMLElement>(
  '[data-pagefind-announcer]',
)) {
  announcer.lang = 'nb';
}

// Pagefind also matches searches against the metadata stored with each page,
// so the index only stores the category and tier names. The template looks up
// their icon and colour, with one branch per category and tier.
const categoryIconTemplate = getRootCategories()
  .map(
    ({ label, icon }) =>
      `{{#if eq(meta.category, "${label}")}}<span class="sidebar-subheading-icon" aria-hidden="true" style="mask-image: var(--uds-icon-${icon})"></span>{{/if}}`,
  )
  .join('');
const tierBadgeTemplate = getTierBadges()
  .map(
    ({ text, color }) =>
      `{{#if eq(meta.tier, "${text}")}}<span class="ds-tag storybook-tag-badge" data-size="custom" data-variant="outline" data-color="${color}">${text}</span>{{/if}}`,
  )
  .join('');

// The modal lives in <body>, outside the sidebar, so it keeps working while
// the sidebar is hidden, and on small screens where the sidebar is in a menu.
const searchModal = document.createElement('pagefind-modal') as PagefindModal;
searchModal.lang = 'nb';
searchModal.innerHTML = `
  <pagefind-modal-header>
    <pagefind-input></pagefind-input>
    <pagefind-filter-dropdown filter="category" label="Kategori"></pagefind-filter-dropdown>
  </pagefind-modal-header>
  <pagefind-modal-body>
    ${
      // The index is only built by `build:storybook`, see `servePagefindIndex.ts`.
      process.env.NODE_ENV === 'production'
        ? ''
        : `<p class="uds-search-dev-note">
            Søket bruker indeksen fra siste bygg av Storybook. For å oppdatere
            den, kjør <code>pnpm build:storybook</code> og last inn siden på nytt.
          </p>`
    }
    <pagefind-summary></pagefind-summary>
    <pagefind-results>
      <script type="text/pagefind-template">
        <li class="pf-result">
          <div class="pf-result-card">
            <div class="pf-result-content">
              <p class="pf-result-title">
                {{#if meta.category}}
                  <span class="uds-search-result-category">
                    ${categoryIconTemplate}
                    {{ meta.category }}
                  </span>
                {{/if}}
                <a class="pf-result-link" href="{{ meta.url | default(url) | safeUrl }}">{{ meta.title }}</a>
                ${tierBadgeTemplate}
              </p>
              {{#if excerpt}}
                <p class="uds-search-excerpt">{{+ excerpt +}}</p>
              {{/if}}
            </div>
          </div>
          {{#if sub_results}}
            <ul class="pf-heading-chips">
              {{#each sub_results as sub}}
                <li class="pf-heading-chip">
                  <a class="pf-heading-link" href="{{ sub.url | safeUrl }}">{{ sub.title }}</a>
                  <p class="uds-search-excerpt uds-search-excerpt--section">{{+ sub.excerpt +}}</p>
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

// Pagefind's dialog closes on Escape in a capture-phase listener, before the
// category list sees the key, so Escape closed the whole dialog and left the
// list open for the next time. Close only the list, by listening in the
// capture phase on the dialog's parent, which runs first.
searchModal.addEventListener(
  'keydown',
  (event) => {
    const dropdown = searchModal.querySelector<PagefindFilterDropdown>(
      'pagefind-filter-dropdown',
    );
    if (event.key === 'Escape' && dropdown?.isOpen) {
      event.preventDefault();
      event.stopPropagation();
      dropdown.close();
    }
  },
  { capture: true },
);

// When a search has no matches, the category filter has no options, and
// Pagefind would open an empty list. Disable the filter instead, unless a
// category is selected, which can still be unselected.
searchInstance.on('filters', () => {
  const trigger = searchModal.querySelector<HTMLButtonElement>(
    'pagefind-filter-dropdown .pf-dropdown-trigger',
  );
  if (!trigger) return;
  const counts = Object.values(
    searchInstance.availableFilters?.['category'] ?? {},
  );
  const selected = searchInstance.searchFilters?.['category'] ?? [];
  trigger.disabled =
    !counts.some((count) => count > 0) && selected.length === 0;
});

// Take over ⌘K / Ctrl+K from Storybook's sidebar search, which
// `searchDialog.css` hides. Listen in the capture phase to run before
// Storybook's listener.
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
      trigger.lang = 'nb';
      wrapper?.after(trigger);
    }
  }
}).observe(document.body, { childList: true, subtree: true });
