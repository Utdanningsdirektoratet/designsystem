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

export type SearchIndex = {
  /** Pagefind's output files, keyed by path relative to `pagefind/`. */
  files: Map<string, Uint8Array>;
  /** Absolute paths of the source files the index was built from. */
  sourceFiles: Set<string>;
};

/**
 * Indexes every MDX docs page in Storybook's story index. The story index
 * provides each page's URL, title and tags, so they always match the sidebar.
 */
export async function buildSearchIndex(
  storyIndex: StoryIndex,
): Promise<SearchIndex> {
  const { index, errors } = await pagefind.createIndex({ forceLanguage: 'nb' });
  if (!index) {
    throw new Error(`Failed to create Pagefind index: ${errors.join('\n')}`);
  }

  try {
    const pages = Object.values(storyIndex.entries).filter(isMdxDocsEntry);
    const sourceFiles = new Set<string>();
    for (const entry of pages) {
      // Storybook resolves these paths against its working directory, which
      // is the current working directory.
      const mdxPath = path.resolve(entry.importPath);
      sourceFiles.add(mdxPath);
      for (const storiesPath of entry.storiesImports) {
        sourceFiles.add(path.resolve(storiesPath));
      }

      let searchHtml: SearchHtml;
      try {
        searchHtml = mdxToSearchHtml(
          fs.readFileSync(mdxPath, 'utf-8'),
          mdxPath,
        );
      } catch (error) {
        // Storybook only prints the message, not the cause.
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to index ${entry.importPath}: ${reason}`, {
          cause: error,
        });
      }
      for (const file of searchHtml.includedFiles) sourceFiles.add(file);
      if (!searchHtml.html.trim()) continue;

      const result = await index.addHTMLFile({
        url: `?path=/docs/${entry.id}`,
        content: toPageHtml(entry, searchHtml),
      });
      if (result.errors.length > 0) {
        throw new Error(
          `Pagefind failed to index ${entry.importPath}: ${result.errors.join('\n')}`,
        );
      }
    }
    console.log(`[pagefind] Indexed ${pages.length} MDX docs pages`);

    const { files } = await index.getFiles();
    return {
      files: new Map(files.map((file) => [file.path, file.content])),
      sourceFiles,
    };
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
