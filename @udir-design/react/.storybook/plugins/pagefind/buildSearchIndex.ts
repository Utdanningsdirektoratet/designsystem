import * as fs from 'node:fs';
import * as path from 'node:path';
import * as pagefind from 'pagefind';
import type {
  DocsIndexEntry,
  IndexEntry,
  StoryIndex,
} from 'storybook/internal/types';
import { getRootCategory, getTierBadge } from '../../utils/sidebarLabels.js';
import { type SearchHtml, mdxToSearchHtml } from './mdxToSearchHtml.js';

/** Pagefind's output files, keyed by path relative to the `pagefind/` directory. */
export type SearchIndexFiles = Map<string, Uint8Array>;

/**
 * Indexes every MDX docs page in Storybook's story index. The story index
 * provides each page's URL, title and tags, so they always match the sidebar.
 */
export async function buildSearchIndex(
  storyIndex: StoryIndex,
): Promise<SearchIndexFiles> {
  const { index, errors } = await pagefind.createIndex({ forceLanguage: 'nb' });
  if (!index) {
    throw new Error(`Failed to create Pagefind index: ${errors.join('\n')}`);
  }

  try {
    const pages = Object.values(storyIndex.entries).filter(isMdxDocsEntry);
    let indexed = 0;
    for (const entry of pages) {
      // Storybook resolves `importPath` against its working directory, which
      // is the current working directory.
      const mdxPath = path.resolve(entry.importPath);
      const searchHtml = mdxToSearchHtml(
        fs.readFileSync(mdxPath, 'utf-8'),
        mdxPath,
      );
      if (!searchHtml.html.trim()) continue;

      const result = await index.addHTMLFile({
        url: `?path=/docs/${entry.id}`,
        content: toPageHtml(entry, searchHtml),
      });
      if (result.errors.length > 0) {
        console.warn(
          `[pagefind] Errors indexing ${entry.importPath}:`,
          result.errors,
        );
      } else {
        indexed++;
      }
    }
    console.log(`[pagefind] Indexed ${indexed}/${pages.length} MDX docs pages`);

    const { files } = await index.getFiles();
    return new Map(files.map((file) => [file.path, file.content]));
  } finally {
    await index.deleteIndex();
  }
}

function isMdxDocsEntry(entry: IndexEntry): entry is DocsIndexEntry {
  return entry.type === 'docs' && entry.importPath.endsWith('.mdx');
}

/**
 * Wraps the page content in an HTML document with the metadata that the
 * result template in `manager.tsx` shows, and the category filter.
 */
function toPageHtml(entry: DocsIndexEntry, { html, title }: SearchHtml) {
  const category = getRootCategory(entry.title)?.label;
  const tier = getTierBadge(entry.tags ?? []);
  const head = [
    `<title>${escapeHtml(title ?? entry.title.split('/').at(-1) ?? '')}</title>`,
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
