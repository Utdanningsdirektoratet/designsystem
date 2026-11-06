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
import { setInterval } from 'node:timers/promises';
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

try {
  const { index } = checkPagefind(
    'Failed to create Pagefind index',
    await pagefind.createIndex({
      forceLanguage: 'nb',
      excludeSelectors: EXCLUDE_SELECTORS,
    }),
  );
  await using browser = await chromium.launch();
  await using context = await browser.newContext();
  await serveBuildDir(context);
  // Track only changes to the content that is indexed. Changes inside live
  // examples don't count, since some keep changing, but adding or removing an
  // example does.
  await context.addInitScript(trackContentChanges, {
    root: ROOT_SELECTOR,
    exclude: EXCLUDE_SELECTORS.join(', '),
  });

  // Render several pages at a time. The workers share one iterator, so each
  // takes the next page until none are left.
  const remaining = pages.values();
  const workers = Math.min(os.availableParallelism(), 8);
  await Promise.all(
    Array.from({ length: workers }, async () => {
      await using page = await context.newPage();
      for (const entry of remaining) {
        const html = await renderDocsPage(page, entry).catch((error) => {
          throw new Error(`Failed to render ${entry.importPath}`, {
            cause: error,
          });
        });
        checkPagefind(
          `Pagefind failed to index ${entry.importPath}`,
          await index.addHTMLFile({
            url: `?path=/docs/${entry.id}`,
            content: toPageHtml(entry, html),
          }),
        );
      }
    }),
  );

  const outputPath = path.join(buildDir, 'pagefind');
  checkPagefind(
    'Failed to write Pagefind index',
    await index.writeFiles({ outputPath }),
  );
  console.log(
    `[pagefind] Indexed ${pages.length} MDX docs pages in ${Date.now() - start} ms, written to ${outputPath}`,
  );
} finally {
  await pagefind.close();
}

/**
 * Returns a Pagefind response with all its fields, or throws `failure` with
 * Pagefind's errors if the response reports any.
 */
function checkPagefind<T extends { errors: string[] }>(
  failure: string,
  response: T,
): Required<T> {
  if (response.errors.length > 0) {
    throw new Error(`${failure}: ${response.errors.join('\n')}`);
  }
  // Pagefind only leaves out the other fields when it reports errors.
  return response as Required<T>;
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
 * Records in `window.lastContentChange` when content inside `root`, but not
 * inside `exclude`, last changed. Added to every page as an init script.
 */
function trackContentChanges({
  root,
  exclude,
}: {
  root: string;
  exclude: string;
}) {
  // Playwright runs this function from its source in the browser, so it can
  // only use its arguments, not the constants in this module.
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

/**
 * Tracks the requests from the docs page itself, to tell when it has stopped
 * loading. Stops tracking when disposed.
 */
function trackRequests(page: Page) {
  const pending = new Set<Request>();
  let lastChange = Date.now();
  const onRequest = (request: Request) => {
    // Live examples rendered in iframes aren't indexed, so their requests
    // don't count.
    if (request.frame() !== page.mainFrame()) return;
    pending.add(request);
    lastChange = Date.now();
  };
  const onRequestDone = (request: Request) => {
    if (pending.delete(request)) lastChange = Date.now();
  };
  page
    .on('request', onRequest)
    .on('requestfinished', onRequestDone)
    .on('requestfailed', onRequestDone);
  return {
    /** How many requests from the page are in flight. */
    inFlight: () => pending.size,
    /** How long the page has had no requests in flight. */
    quietFor: () => (pending.size ? 0 : Date.now() - lastChange),
    [Symbol.dispose]: () =>
      page
        .off('request', onRequest)
        .off('requestfinished', onRequestDone)
        .off('requestfailed', onRequestDone),
  };
}

/** Renders a docs page in Storybook's preview, and returns its HTML. */
async function renderDocsPage(page: Page, entry: DocsIndexEntry) {
  using requests = trackRequests(page);
  await page.goto(`${ORIGIN}/iframe.html?id=${entry.id}&viewMode=docs`);
  // Storybook's error display is always in the page, but hidden until a page
  // fails to render.
  const heading = page.locator(`${ROOT_SELECTOR} h1`);
  const error = page.locator('.sb-errordisplay:visible');
  await heading.or(error).first().waitFor();
  if (await error.isVisible()) throw new Error(await error.innerText());
  // Parts of the page, such as code blocks, load their code and appear after
  // the heading, in steps. Storybook has no event for when they're done: its
  // `docsRendered` comes before them. Playwright's `networkidle` can miss the
  // end of the requests and wait forever, and is discouraged:
  // https://github.com/microsoft/playwright/issues/42598
  const deadline = Date.now() + SETTLE_TIMEOUT_MS;
  for await (const _ of setInterval(100)) {
    const contentQuiet = await page.evaluate(
      () => performance.now() - window.lastContentChange,
    );
    if (Math.min(contentQuiet, requests.quietFor()) >= SETTLE_MS) break;
    if (Date.now() > deadline) {
      throw new Error(
        `Still changing after ${SETTLE_TIMEOUT_MS} ms, with ${requests.inFlight()} requests in flight`,
      );
    }
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
 * Wraps the page content in an HTML document with the title, the category and
 * tier for the result template in `searchDialog.ts`, and the category filter.
 */
function toPageHtml(entry: DocsIndexEntry, html: string) {
  const category = getRootCategory(entry.title)?.label;
  const tier = getTierBadge(entry.tags ?? [])?.text;
  // Pagefind also matches searches against this metadata, so only store names
  // that are fine to find, not icon names or colours.
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
