/**
 * Builds the Pagefind search index for a static Storybook build, by rendering
 * every MDX docs page in a headless browser and indexing what readers see.
 * This includes text that docs components render, such as tables of design
 * tokens, which isn't in the MDX source.
 *
 * Run after `storybook build`, see the `build:storybook` script. Writes the
 * index to `pagefind/` in the build directory.
 *
 * Usage: tsx .storybook/search/buildSearchIndex.ts [build directory]
 */
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as pagefind from 'pagefind';
import { type BrowserContext, type Page, chromium } from 'playwright';
import type {
  DocsIndexEntry,
  IndexEntry,
  StoryIndex,
} from 'storybook/internal/types';
import { getRootCategory, getTierBadge } from '../utils/sidebarLabels.js';

/** The rendered docs page, without the table of contents. */
const ROOT_SELECTOR = '.sbdocs-content';

/**
 * Parts of the docs page that aren't prose: live examples with their code, the
 * table of component props, and buttons, such as "Copy code".
 */
const EXCLUDE_SELECTORS = ['.sbdocs-preview', '.docblock-argstable', 'button'];

/** Pages are loaded from the build directory through this made-up origin. */
const ORIGIN = 'http://storybook.local';

const buildDir = path.resolve(process.argv[2] ?? 'storybook-static');
const start = Date.now();

const storyIndex: StoryIndex = JSON.parse(
  fs.readFileSync(path.join(buildDir, 'index.json'), 'utf-8'),
);
const pages = Object.values(storyIndex.entries).filter(isMdxDocsEntry);

const { index, errors } = await pagefind.createIndex({
  forceLanguage: 'nb',
  excludeSelectors: EXCLUDE_SELECTORS,
});
if (!index) {
  throw new Error(`Failed to create Pagefind index: ${errors.join('\n')}`);
}

const browser = await chromium.launch();
try {
  const context = await browser.newContext();
  await serveBuildDir(context);

  // Render several pages at a time. Each worker takes the next page until
  // none are left.
  const queue = [...pages];
  const workers = Math.min(os.availableParallelism(), 8);
  await Promise.all(
    Array.from({ length: workers }, async () => {
      const page = await context.newPage();
      for (let entry = queue.shift(); entry; entry = queue.shift()) {
        const html = await renderDocsPage(page, entry);
        const result = await index.addHTMLFile({
          url: `?path=/docs/${entry.id}`,
          content: toPageHtml(entry, html),
        });
        if (result.errors.length > 0) {
          throw new Error(
            `Pagefind failed to index ${entry.importPath}: ${result.errors.join('\n')}`,
          );
        }
      }
      await page.close();
    }),
  );

  const outputPath = path.join(buildDir, 'pagefind');
  const written = await index.writeFiles({ outputPath });
  if (written.errors.length > 0) {
    throw new Error(
      `Failed to write Pagefind index: ${written.errors.join('\n')}`,
    );
  }
  console.log(
    `[pagefind] Indexed ${pages.length} MDX docs pages in ${Date.now() - start} ms, written to ${outputPath}`,
  );
} finally {
  await browser.close();
  await pagefind.close();
}

function isMdxDocsEntry(entry: IndexEntry): entry is DocsIndexEntry {
  return entry.type === 'docs' && entry.importPath.endsWith('.mdx');
}

/**
 * Serves the build directory to the browser without starting a server, and
 * blocks other requests, such as web fonts, so the result doesn't depend on
 * the network.
 */
async function serveBuildDir(context: BrowserContext) {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== ORIGIN) return route.abort();
    const filePath = path.join(buildDir, decodeURIComponent(url.pathname));
    if (
      !filePath.startsWith(buildDir) ||
      !fs.statSync(filePath, { throwIfNoEntry: false })?.isFile()
    ) {
      return route.fulfill({ status: 404 });
    }
    return route.fulfill({ path: filePath });
  });
}

/** Renders a docs page in Storybook's preview, and returns its HTML. */
async function renderDocsPage(
  page: Page,
  entry: DocsIndexEntry,
): Promise<string> {
  await page.goto(`${ORIGIN}/iframe.html?id=${entry.id}&viewMode=docs`);
  // Storybook's error display is always in the page, but hidden until a page
  // fails to render.
  const heading = page.locator(`${ROOT_SELECTOR} h1`);
  const error = page.locator('.sb-errordisplay:visible');
  await heading.or(error).first().waitFor();
  if (await error.isVisible()) {
    throw new Error(
      `Failed to render ${entry.importPath}:\n${await error.innerText()}`,
    );
  }
  // Docs components may load more code or data after the first render.
  await page.waitForLoadState('networkidle');
  return page.locator(ROOT_SELECTOR).evaluate((root) => {
    const clone = root.cloneNode(true) as HTMLElement;
    // Pagefind uses the h1 as the title. Without an id, it doesn't also become
    // a section of the page.
    clone.querySelector('h1')?.removeAttribute('id');
    return clone.outerHTML;
  });
}

/**
 * Wraps the page content in an HTML document with the metadata that the
 * result template in `manager.tsx` shows, and the category filter.
 */
function toPageHtml(entry: DocsIndexEntry, html: string) {
  const category = getRootCategory(entry.title)?.label;
  const tier = getTierBadge(entry.tags ?? []);
  const head = [
    `<title>${escapeHtml(entry.title.split('/').at(-1) ?? '')}</title>`,
    tier && `<meta data-pagefind-meta="tier:${escapeHtml(tier.text)}">`,
    tier && `<meta data-pagefind-meta="tier_color:${escapeHtml(tier.color)}">`,
    category &&
      `<meta data-pagefind-filter="category:${escapeHtml(category)}">`,
    category && `<meta data-pagefind-meta="category:${escapeHtml(category)}">`,
  ];
  return `<html lang="nb"><head>${head.filter(Boolean).join('')}</head><body>${html}</body></html>`;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
