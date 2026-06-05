# Beta → Stable: Batch 3 — PR Review Summary

This branch consolidates the following 10 component promotions from beta to stable into a single PR to save Chromatic credits.

## Approved (8 PRs)

### 1. Tooltip — [#777](https://github.com/Utdanningsdirektoratet/designsystem/pull/777)

- **Changes:** Moved export from `beta.ts` → `stable.ts`. Removed beta tag from stories. Spread `args` into story renders for correct Storybook code examples. Polished Norwegian docs (accessibility, guidelines, polyfill sections).
- **Review:** ✅ Approved by **adrianflatner**. No unresolved comments.

### 2. Breadcrumbs — [#776](https://github.com/Utdanningsdirektoratet/designsystem/pull/776)

- **Changes:** Export move + beta tag removal. New `PlacementWithHeader` story showing breadcrumbs below a Header. New play test verifying `aria-current="page"` on last breadcrumb. Docs updated with placement guidelines (max-width, centering). Grammar fixes. Demo page updated with breadcrumbs CSS.
- **Review:** ✅ Approved by **Hannareie**. 6 inline text suggestions — all applied. No unresolved comments.

### 3. Tabs — [#767](https://github.com/Utdanningsdirektoratet/designsystem/pull/767)

- **Changes:** Export move + beta tag removal. Added missing `Tabs.Panel` elements to stories (fixing a11y warnings). Replaced inline styles with CSS classes in Controlled example. Added `advancedCodeDocs` for docs source transform. Norwegian docs polished.
- **Review:** ✅ Approved by **adrianflatner**. 2 comments (add Tooltip link, remove unnecessary heading) — both addressed. No unresolved comments.

### 4. TableOfContents — [#766](https://github.com/Utdanningsdirektoratet/designsystem/pull/766)

- **Changes:** Minimal — export move + beta tag removal + minor Norwegian copy edits. Very small diff (4 files).
- **Review:** ✅ Approved by **adrianflatner**. No inline comments. Author noted a minor RTL icon direction issue (not blocking).

### 5. Textfield — [#760](https://github.com/Utdanningsdirektoratet/designsystem/pull/760)

- **Changes:** Export move + beta tag removal. Stories refactored: simplified play tests, added `autoComplete` attributes, switched `Format` story to use built-in `error` prop instead of external `<ValidationMessage>`. Docs expanded with "Passer ikke til å" section and improved accessibility guidance.
- **Review:** ✅ Approved by **Hannareie** ("Ser bra ut🚀"). All suggestions accepted. No unresolved comments.

### 6. Dialog — [#754](https://github.com/Utdanningsdirektoratet/designsystem/pull/754)

- **Changes:** Export move + beta tag removal. Extensive docs rewrite: restructured Modal vs Non-modal section to top, rewrote copy for clarity, improved explanations of `command`/`commandfor`, `closedby`, `closeButton`, `autofocus`. Stories updated with `{...args}` spread. No API changes.
- **Review:** ✅ Approved by **adrianflatner** ("Nice!"). 1 minor comment addressed. No unresolved comments.

### 7. Dropdown — [#753](https://github.com/Utdanningsdirektoratet/designsystem/pull/753)

- **Changes:** Export move only. Docs improved with better use-case guidance, new "Ikoner og andre komponenter" subheading, grammar polish, fixed Popover capitalization. No code changes.
- **Review:** ✅ Approved by **Hannareie** ("Ser bra ut🚀"). 3 inline suggestions all applied. No unresolved comments.

### 8. ProgressBar — [#751](https://github.com/Utdanningsdirektoratet/designsystem/pull/751)

- **Changes:** Export move. Also fixed `export type *` → `export *` so values are actually re-exported (not just types). Docs: added use-case bullet, fixed broken `FormNavigation` link, replaced "sider" → "steg". Very small diff (~11 lines).
- **Review:** ✅ Approved by **Hannareie** ("Ser bra ut 🚀"). 3 inline suggestions applied. No unresolved comments.

### 9. Badge — [#667](https://github.com/Utdanningsdirektoratet/designsystem/pull/667)

- **Changes:** Export move + beta tag removal. Fixed Nynorsk typos in docs. Stories refactored: replaced inline styles with CSS classes, added args passthrough. DashboardDemo updated with Badge on Header.UserButton and responsive small-screen variant with dropdown.
- **Review:** ✅ Approved by **adrianflatner** ("Looks good, må se på `dir`"). RTL positioning issue noted but documented — not blocking. No unresolved comments.

## Awaiting Approval (1 PR)

### 10. Textarea — [#761](https://github.com/Utdanningsdirektoratet/designsystem/pull/761)

- **Changes:** Export move + beta tag removal. Added `autoComplete: 'off'` to all story args. Added `advancedCodeDocs` to Controlled story. Docs rewritten with clearer Norwegian, fixed case-sensitive link. Snapshots updated.
- **Review:** ⚠️ **Review required** — **adrianflatner** commented (requesting `advancedCodeDocs` on Controlled story) which was addressed, but **no formal approval yet**. No unresolved comments remain.

## Common Pattern

Every PR follows the same structure: move export from `beta.ts` → `stable.ts`, remove `'beta'` Storybook tag, polish Norwegian documentation, and improve story quality (args spreading, accessibility fixes, `advancedCodeDocs`). No component API changes in any of them — all are purely promotions + docs/stories cleanup.
