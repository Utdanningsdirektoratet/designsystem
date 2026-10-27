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
import {
  type BrowserContext,
  type Page,
  type Request,
  chromium,
} from 'playwright';
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

/**
 * A docs page counts as fully rendered when the indexed content hasn't changed
 * and the page has had no requests in flight for this long.
 */
const SETTLE_MS = 1000;

/** Give up on a page that hasn't settled after this long. */
const SETTLE_TIMEOUT_MS = 30_000;

declare global {
  interface Window {
    /** When the indexed content last changed, see `trackContentChanges`. */
    lastContentChange: number;
  }
}

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
  // Track only changes to the content that is indexed. Changes inside live
  // examples don't count, since some keep changing, but adding or removing an
  // example does.
  await context.addInitScript(trackContentChanges, {
    root: ROOT_SELECTOR,
    exclude: EXCLUDE_SELECTORS.join(', '),
  });

  // Render several pages at a time. Each worker takes the next page until
  // none are left.
  const queue = [...pages];
  const workers = Math.min(os.availableParallelism(), 8);
  await Promise.all(
    Array.from({ length: workers }, async () => {
      const page = await context.newPage();
      for (let entry = queue.shift(); entry; entry = queue.shift()) {
        const html = await renderDocsPage(page, entry).catch((error) => {
          throw new Error(`Failed to render ${entry.importPath}`, {
            cause: error,
          });
        });
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

/**
 * Runs in the page and records when content inside `root`, but not inside
 * `exclude`, last changed. Playwright runs it from its source in the browser,
 * so it can only use its arguments, not the constants in this module.
 */
function trackContentChanges({
  root,
  exclude,
}: {
  root: string;
  exclude: string;
}) {
  window.lastContentChange = performance.now();
  const isIndexed = (node: Node) => {
    const element = node instanceof Element ? node : node.parentElement;
    return !!element?.closest(root) && !element.closest(exclude);
  };
  new MutationObserver((records) => {
    if (records.some((record) => isIndexed(record.target))) {
      window.lastContentChange = performance.now();
    }
  }).observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
  });
}

/** Renders a docs page in Storybook's preview, and returns its HTML. */
async function renderDocsPage(
  page: Page,
  entry: DocsIndexEntry,
): Promise<string> {
  // Requests from the docs page itself. Live examples rendered in iframes
  // aren't indexed, so their requests don't count.
  const pending = new Set<Request>();
  let lastRequestChange = Date.now();
  const onRequest = (request: Request) => {
    if (request.frame() !== page.mainFrame()) return;
    pending.add(request);
    lastRequestChange = Date.now();
  };
  const onRequestDone = (request: Request) => {
    if (pending.delete(request)) lastRequestChange = Date.now();
  };
  page.on('request', onRequest);
  page.on('requestfinished', onRequestDone);
  page.on('requestfailed', onRequestDone);
  try {
    await page.goto(`${ORIGIN}/iframe.html?id=${entry.id}&viewMode=docs`);
    // Storybook's error display is always in the page, but hidden until a
    // page fails to render.
    const heading = page.locator(`${ROOT_SELECTOR} h1`);
    const error = page.locator('.sb-errordisplay:visible');
    await heading.or(error).first().waitFor();
    if (await error.isVisible()) {
      throw new Error(await error.innerText());
    }
    // Parts of the page, such as code blocks, load their code and appear after
    // the heading, in steps. Storybook has no event for when they're done: its
    // `docsRendered` comes before them. Playwright's `networkidle` can miss
    // the end of the requests and wait forever, and is discouraged:
    // https://github.com/microsoft/playwright/issues/42598
    const deadline = Date.now() + SETTLE_TIMEOUT_MS;
    for (;;) {
      const contentQuiet = await page.evaluate(
        () => performance.now() - window.lastContentChange,
      );
      const requestsQuiet = pending.size ? 0 : Date.now() - lastRequestChange;
      if (Math.min(contentQuiet, requestsQuiet) >= SETTLE_MS) break;
      if (Date.now() > deadline) {
        throw new Error(
          `Still changing after ${SETTLE_TIMEOUT_MS} ms, with ${pending.size} requests in flight`,
        );
      }
      await page.waitForTimeout(100);
    }
  } finally {
    page.off('request', onRequest);
    page.off('requestfinished', onRequestDone);
    page.off('requestfailed', onRequestDone);
  }
  // The page is only used for indexing, so it's fine to change it here.
  return page.locator(ROOT_SELECTOR).evaluate((root) => {
    // React renders elements without whitespace between them, and Pagefind
    // joins the text of adjacent table cells, so "Tracking categories" and
    // "Nødvendige" in two cells would be indexed as "categoriesNødvendige".
    // Separate the text of every element that isn't shown inline.
    for (const element of root.querySelectorAll('*')) {
      if (!getComputedStyle(element).display.startsWith('inline')) {
        element.after(' ');
      }
    }
    // Pagefind uses the h1 as the title. Without an id, it doesn't also become
    // a section of the page.
    root.querySelector('h1')?.removeAttribute('id');
    return root.outerHTML;
  });
}

/**
 * Wraps the page content in an HTML document with the category and tier for
 * the result template in `searchDialog.ts`, and the category filter. Pagefind
 * also matches searches against this metadata, so only store names that are
 * fine to find, not icon names or colours.
 */
function toPageHtml(entry: DocsIndexEntry, html: string) {
  const category = getRootCategory(entry.title)?.label;
  const tier = getTierBadge(entry.tags ?? [])?.text;
  const head = [
    `<title>${escapeHtml(entry.title.split('/').at(-1) ?? '')}</title>`,
    tier && `<meta data-pagefind-meta="tier:${escapeHtml(tier)}">`,
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
