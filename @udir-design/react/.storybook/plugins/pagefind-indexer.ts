import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import {
  type Tier,
  buildTierMap as buildSharedTierMap,
  resolveStoryTier,
} from '../../tiers.js';

interface PagefindIndexerOptions {
  /** Directory containing MDX source files, relative to Vite root */
  srcDir: string;
}

/**
 * Vite plugin that builds a Pagefind search index from MDX documentation files
 * and serves it for both dev and production Storybook builds.
 *
 * - In dev mode, the index is built on startup, served via middleware at `/pagefind/`,
 *   and rebuilt automatically when MDX files change.
 * - In production builds, the index files are written to the output directory.
 *
 * Requires the `pagefind` npm package to be installed as a dev dependency.
 */
export function pagefindIndexerPlugin(options: PagefindIndexerOptions): Plugin {
  let resolvedConfig: ResolvedConfig;
  let cachedFiles: Map<string, Uint8Array> | null = null;
  let buildPromise: Promise<void> | null = null;
  let rebuildTimer: ReturnType<typeof setTimeout> | null = null;

  function getSrcDir(): string {
    return path.resolve(resolvedConfig.root, options.srcDir);
  }

  async function buildSearchIndex(
    srcDir: string,
  ): Promise<Map<string, Uint8Array>> {
    // Dynamic import — pagefind communicates with a native binary in the background
    const pagefind = await import('pagefind');
    const { index } = await pagefind.createIndex({ forceLanguage: 'nb' });

    if (!index) {
      throw new Error('Failed to create Pagefind index');
    }

    try {
      const mdxFiles = findMdxFiles(srcDir);
      let indexed = 0;

      const tierMap = buildSharedTierMap();

      for (const file of mdxFiles) {
        const absolutePath = path.join(srcDir, file);
        const rawContent = fs.readFileSync(absolutePath, 'utf-8');
        const url = deriveStorybookUrl(file, rawContent, srcDir);
        const { html, title } = await mdxToSearchHtml(rawContent, absolutePath);

        if (!html.trim()) continue;

        const tier = resolveTier(file, rawContent, tierMap, srcDir);
        const category = resolveCategory(file);
        const metaTags = [
          tier &&
            `<meta data-pagefind-meta="tier:${tier.label}"><meta data-pagefind-meta="tier_color:${tier.color}">`,
          category &&
            `<meta data-pagefind-filter="category:${escapeHtml(category)}"><meta data-pagefind-meta="category:${escapeHtml(category)}">`,
        ]
          .filter(Boolean)
          .join('');
        const fullHtml = `<html lang="nb"><head><title>${escapeHtml(title ?? '')}</title>${metaTags}</head><body>${html}</body></html>`;

        const result = await index.addHTMLFile({ url, content: fullHtml });
        if (result.errors.length > 0) {
          console.warn(`[pagefind] Errors indexing ${file}:`, result.errors);
        } else {
          indexed++;
        }
      }

      console.log(`[pagefind] Indexed ${indexed}/${mdxFiles.length} MDX files`);

      const { files } = await index.getFiles();
      const fileMap = new Map<string, Uint8Array>();
      for (const file of files) {
        fileMap.set(file.path, file.content);
      }

      return fileMap;
    } finally {
      await index.deleteIndex();
    }
  }

  function scheduleBuild() {
    // Debounce rapid successive changes (e.g., git branch switch)
    if (rebuildTimer) clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => {
      buildPromise = (async () => {
        try {
          const start = Date.now();
          cachedFiles = await buildSearchIndex(getSrcDir());
          console.log(
            `[pagefind] Search index ready in ${Date.now() - start}ms (${cachedFiles.size} files)`,
          );
        } catch (err) {
          console.error('[pagefind] Failed to build search index:', err);
        } finally {
          buildPromise = null;
        }
      })();
    }, 200);
  }

  return {
    name: 'pagefind-mdx-indexer',

    configResolved(config) {
      resolvedConfig = config;
    },

    // ── Dev mode: serve index via middleware ──────────────────────────────

    configureServer(server: ViteDevServer) {
      scheduleBuild();

      // Watch for MDX file changes and rebuild
      const srcDir = getSrcDir();
      const handleChange = (changedPath: string) => {
        if (changedPath.endsWith('.mdx') && changedPath.startsWith(srcDir)) {
          console.log(
            `[pagefind] MDX changed: ${path.relative(srcDir, changedPath)}, rebuilding index...`,
          );
          scheduleBuild();
        }
      };
      server.watcher.on('change', handleChange);
      server.watcher.on('add', handleChange);
      server.watcher.on('unlink', handleChange);

      // Serve pagefind files at /pagefind/*
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/pagefind/')) return next();

        // Wait for the index to finish building
        if (buildPromise) await buildPromise;

        if (!cachedFiles) {
          res.statusCode = 503;
          res.end('Search index not yet available');
          return;
        }

        const filePath = req.url.replace('/pagefind/', '').split('?')[0];
        const content = cachedFiles.get(filePath);

        if (!content) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }

        const ext = path.extname(filePath);
        const contentTypes: Record<string, string> = {
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.wasm': 'application/wasm',
          '.css': 'text/css',
        };
        res.setHeader(
          'Content-Type',
          contentTypes[ext] ?? 'application/octet-stream',
        );
        res.setHeader('Cache-Control', 'no-cache');
        res.end(Buffer.from(content));
      });
    },

    // ── Build mode: write index to output directory ──────────────────────

    async closeBundle() {
      if (resolvedConfig.command !== 'build') return;

      const srcDir = getSrcDir();
      const outDir = path.resolve(
        resolvedConfig.root,
        resolvedConfig.build.outDir,
      );
      const pagefindDir = path.join(outDir, 'pagefind');

      console.log('[pagefind] Building search index for production...');
      const start = Date.now();
      const files = await buildSearchIndex(srcDir);

      for (const [filePath, content] of files) {
        const outputPath = path.join(pagefindDir, filePath);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, content);
      }

      console.log(
        `[pagefind] Wrote ${files.size} index files to ${pagefindDir} in ${Date.now() - start}ms`,
      );
    },
  };
}

// ─── MDX Processing ──────────────────────────────────────────────────────────

/**
 * JSX wrapper tags whose markdown children should be preserved.
 * These components are used in MDX as styling or callout wrappers around prose.
 * All other JSX elements are removed entirely.
 */
const KEEP_CHILDREN_TAGS = new Set(['SimpleAlert', 'Alert', 'Unstyled']);

// ─── URL Derivation ──────────────────────────────────────────────────────────

/**
 * Derives the Storybook docs URL for an MDX file.
 *
 * Handles three cases:
 * 1. Explicit `<Meta title="..." />` — uses the title directly
 * 2. Attached to stories `<Meta of={FooStories} />` — resolves the story import path
 *    and reads the stories file for an explicit `title:`
 * 3. Auto-titled — derives from the MDX file path
 *
 * @param relativeFilePath - Path relative to the src directory (e.g., "components/alert/Alert.mdx")
 * @param content - Raw MDX file content
 * @param srcDir - Absolute path to the src directory
 */
function deriveStorybookUrl(
  relativeFilePath: string,
  content: string,
  srcDir: string,
): string {
  // Case 1: Explicit title — <Meta title="patterns/Introduksjon" />
  const titleMatch = content.match(/<Meta\s[^>]*title=["']([^"']+)["']/);
  if (titleMatch) {
    return buildStorybookUrl(titleMatch[1]);
  }

  // Case 2: Attached to stories — <Meta of={AlertStories} />
  const ofMatch = content.match(/<Meta\s[^>]*of=\{(\w+)\}/);
  if (ofMatch) {
    const storyVar = ofMatch[1];
    const importPattern = new RegExp(
      `import\\s+(?:\\*\\s+as\\s+${storyVar}|\\{[^}]*\\b${storyVar}\\b[^}]*\\})\\s+from\\s+['"]([^'"]+)['"]`,
    );
    const importMatch = content.match(importPattern);
    if (importMatch) {
      const importPath = importMatch[1];
      const mdxDir = path.dirname(relativeFilePath);
      const storyImportRel = importPath.replace(/^\.\//, '');

      // Try to read the stories file for an explicit title
      const storyTitle = readStoryTitle(
        srcDir,
        path.join(mdxDir, storyImportRel),
      );

      if (storyTitle) {
        return buildStorybookUrl(storyTitle);
      }

      // No explicit title — derive from the file path
      const storyRelPath = storyImportRel.replace(/\.stories(\.tsx?)?$/, '');
      const fullPath = path.join(mdxDir, storyRelPath);
      return buildStorybookUrl(fullPath);
    }
  }

  // Case 3: Auto-titled from file path
  const withoutExt = relativeFilePath.replace(/\.mdx$/, '');
  return buildStorybookUrl(withoutExt);
}

/**
 * Builds a Storybook docs URL from a title or file path.
 * Applies Storybook's auto-title deduplication: removes the last directory/title
 * segment when it matches the filename (case-insensitive).
 *
 * E.g., "components/alert/Alert" → "?path=/docs/components-alert--docs"
 * E.g., "Components/Logo/Logo" → "?path=/docs/components-logo--docs"
 */
function buildStorybookUrl(titleOrPath: string, suffix = 'docs'): string {
  const normalized = titleOrPath.replace(/\\/g, '/');
  const parts = normalized.split('/');

  // Storybook deduplication: remove last directory segment if it matches filename
  if (parts.length >= 2) {
    const dir = parts[parts.length - 2];
    const file = parts[parts.length - 1];
    if (dir.toLowerCase() === file.toLowerCase()) {
      parts.splice(parts.length - 2, 1);
    }
  }

  const id = parts.join('-').toLowerCase().replace(/\s+/g, '-');
  return `?path=/docs/${id}--${suffix}`;
}

// ─── Story File Reading ──────────────────────────────────────────────────────

/**
 * Reads a stories file and extracts the explicit `title`.
 * Returns null if the file can't be found or has no explicit title.
 *
 * @param srcDir - Absolute path to the src directory
 * @param importPath - Import path relative to srcDir, e.g. "icons/icons.stories"
 */
function readStoryTitle(srcDir: string, importPath: string): string | null {
  let storyContent: string | null = null;

  // The import may or may not include a file extension
  // (e.g., './Alert.stories' vs './dataVisualisation.stories.tsx').
  // Try the path as-is first, then try appending common extensions.
  const candidates = [importPath];
  if (!/\.[jt]sx?$/.test(importPath)) {
    candidates.push(
      importPath + '.tsx',
      importPath + '.ts',
      importPath + '.jsx',
      importPath + '.js',
    );
  }

  for (const candidate of candidates) {
    try {
      storyContent = fs.readFileSync(path.join(srcDir, candidate), 'utf-8');
      break;
    } catch {
      // try next candidate
    }
  }

  if (!storyContent) return null;

  // Match title only when the value contains '/' — Storybook meta titles are
  // hierarchy paths (e.g., 'Components/Logo/Logo'). This avoids false positives
  // from story args or data objects that also have a `title:` property.
  const titleMatch = storyContent.match(/title:\s*['"]([^'"]*\/[^'"]+)['"]/);
  return titleMatch?.[1] ?? null;
}

// ─── MDX → Search HTML ──────────────────────────────────────────────────────

/**
 * Parses MDX content and produces clean HTML for Pagefind indexing.
 *
 * Uses the remark MDX parser to build a proper AST instead of regex-based
 * stripping. The AST is walked to:
 * - Resolve `<IncludeMarkdown>` tags by reading the referenced `?raw` imports,
 *   extracting the requested section via the shared `remarkGetSection` plugin,
 *   and splicing the resulting AST nodes in place.
 * - Remove remaining ESM nodes (imports/exports)
 * - Remove JSX elements, except those in {@link KEEP_CHILDREN_TAGS} whose
 *   markdown children are preserved (tags are unwrapped). A `heading="..."`
 *   attribute on kept tags is emitted as a `<strong>` so it's indexed.
 * - Remove JS expression nodes (`{variable}`)
 * - Extract the page title from the first `<h1>`
 * - Add `id` attributes to `<h2>`–`<h6>` for Pagefind sub-result anchors
 *   (h1 is excluded — Pagefind uses it as `meta.title`)
 */
async function mdxToSearchHtml(
  mdxContent: string,
  mdxAbsolutePath: string,
): Promise<{ html: string; title: string | undefined }> {
  const { unified } = await import('unified');
  const remarkParse = (await import('remark-parse')).default;
  const remarkGfm = (await import('remark-gfm')).default;
  const remarkMdx = (await import('remark-mdx')).default;
  const { toHast } = await import('mdast-util-to-hast');
  const { toHtml } = await import('hast-util-to-html');
  const { visit, SKIP } = await import('unist-util-visit');
  const { remove } = await import('unist-util-remove');
  const { remarkGetSection, remarkSlugHeadings } =
    await import('../utils/remarkGetSection.js');

  // Parse MDX into a full AST (markdown + JSX + ESM nodes)
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMdx)
    .parse(mdxContent);

  // Collect `?raw` import mappings from ESM nodes before removing them.
  // e.g. `import README from '../README.md?raw'` → { README: '/abs/path/README.md' }
  const rawImports = new Map<string, string>();
  visit(tree, 'mdxjsEsm', (node: { value: string }) => {
    for (const match of node.value.matchAll(
      /import\s+(\w+)\s+from\s+['"]([^'"]+)\?raw['"]/g,
    )) {
      rawImports.set(
        match[1],
        path.resolve(path.dirname(mdxAbsolutePath), match[2]),
      );
    }
  });

  // Remove ESM (imports/exports) and JS expression nodes
  remove(tree, ['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression']);

  // Process JSX elements: resolve IncludeMarkdown, unwrap keep-children tags,
  // or remove entirely.
  visit(
    tree,
    ['mdxJsxFlowElement', 'mdxJsxTextElement'],
    (node, index, parent) => {
      if (index == null || !parent) return;
      const jsxNode = node as typeof node & {
        name: string | null;
        attributes?: Array<{ name?: string; value?: unknown }>;
        children: (typeof parent.children)[number][];
      };
      const tagName = jsxNode.name;

      // Resolve <IncludeMarkdown markdown={VAR} sectionId="..." />
      if (tagName === 'IncludeMarkdown') {
        const markdownAttr = jsxNode.attributes?.find(
          (a) => a.name === 'markdown',
        );
        // The value is a JSX expression `{VAR}` — extract the variable name
        const varExpr = markdownAttr?.value;
        const varName =
          typeof varExpr === 'object' && varExpr !== null && 'value' in varExpr
            ? String((varExpr as { value: string }).value)
            : undefined;
        const filePath = varName ? rawImports.get(varName) : undefined;

        if (filePath) {
          try {
            const markdownContent = fs.readFileSync(filePath, 'utf-8');
            const sectionAttr = jsxNode.attributes?.find(
              (a) => a.name === 'sectionId',
            );
            const sectionId =
              typeof sectionAttr?.value === 'string'
                ? sectionAttr.value
                : undefined;

            // Parse the imported markdown, assign heading IDs, and
            // extract the section using the shared remarkGetSection plugin.
            const processor = unified()
              .use(remarkParse)
              .use(remarkSlugHeadings)
              .use(remarkGetSection, { sectionId });

            const parsed = processor.parse(markdownContent);
            const processed = processor.runSync(parsed) as typeof tree;

            // Splice the resolved nodes into the parent
            parent.children.splice(
              index,
              1,
              ...(processed.children as (typeof parent.children)[number][]),
            );
            return [SKIP, index] as const;
          } catch {
            // File not found or parse error — remove the node
          }
        }

        parent.children.splice(index, 1);
        return [SKIP, index] as const;
      }

      if (tagName && KEEP_CHILDREN_TAGS.has(tagName)) {
        // Unwrap: replace the JSX node with its children.
        // If the tag has a heading="..." attribute, prepend a strong node
        // so the heading text gets indexed.
        const headingAttr = jsxNode.attributes?.find(
          (a) => a.name === 'heading' && typeof a.value === 'string',
        );
        const replacement = [...jsxNode.children];
        if (headingAttr) {
          replacement.unshift({
            type: 'paragraph',
            children: [
              {
                type: 'strong',
                children: [
                  { type: 'text', value: headingAttr.value as string },
                ],
              },
            ],
          } as (typeof parent.children)[number]);
        }
        parent.children.splice(index, 1, ...replacement);
        return [SKIP, index] as const;
      }

      // Remove the JSX node entirely
      parent.children.splice(index, 1);
      return [SKIP, index] as const;
    },
  );

  // Convert the cleaned mdast to hast (HTML AST)
  const hast = toHast(tree);
  if (!hast) return { html: '', title: undefined };

  // Extract the page title from the first h1, and add id to h2–h6
  let title: string | undefined;
  visit(hast, 'element', (node) => {
    if (node.tagName === 'h1' && title === undefined) {
      title = hastNodeToText(node);
    }
    if (/^h[2-6]$/.test(node.tagName)) {
      node.properties ??= {};
      if (!node.properties.id) {
        node.properties.id = slugify(hastNodeToText(node));
      }
    }
  });

  return { html: toHtml(hast), title };
}

// ─── Utilities ───────────────────────────────────────────────────────────────

/** Basic HTML entity escaping for use in element text content */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Recursively extracts plain text from a hast node */
function hastNodeToText(node: {
  type: string;
  value?: string;
  children?: unknown[];
}): string {
  if (node.type === 'text') return node.value ?? '';
  if (node.children) {
    return (node.children as (typeof node)[]).map(hastNodeToText).join('');
  }
  return '';
}

/**
 * GitHub-style heading slugification matching Storybook's anchor scheme.
 * Preserves Unicode letters (Norwegian å, ø, æ, etc.).
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ─── File Discovery ──────────────────────────────────────────────────────────

/** Recursively finds all .mdx files in a directory */
function findMdxFiles(dir: string, prefix = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMdxFiles(path.join(dir, entry.name), relative));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(relative);
    }
  }

  return files;
}

// ─── Tier Resolution ─────────────────────────────────────────────────────────

/** Display metadata for a tier badge in search results. */
type TierBadge = { label: string; color: string };

const TIER_BADGES: Record<Exclude<Tier, 'stable'>, TierBadge> = {
  alpha: { label: 'Alpha', color: 'danger' },
  beta: { label: 'Beta', color: 'warning' },
};

/**
 * Resolves the tier badge for an MDX file.
 *
 * 1. Path-based: uses the shared `resolveStoryTier` from `tiers.ts` which
 *    covers components, grouped components, hooks, and utilities.
 * 2. Inline MDX tags: reads `<Meta tags={['beta']} />` directly from the MDX
 *    content (used by standalone pattern docs).
 * 3. Attached stories: when the MDX uses `<Meta of={Stories} />`, reads the
 *    referenced stories file for `tags: ['alpha']` / `tags: ['beta']` in its
 *    meta definition (used by pattern docs with stories).
 *
 * Stable components return `null` (no badge).
 */
function resolveTier(
  relativeFilePath: string,
  content: string,
  tierMap: Map<string, Tier>,
  srcDir: string,
): TierBadge | null {
  // Path-based resolution via shared utility (components, hooks, utilities).
  // Prepend `/` because resolveStoryTier regexes expect an absolute-style path.
  const tier = resolveStoryTier(`/${relativeFilePath}`, tierMap);
  if (tier && tier !== 'stable') return TIER_BADGES[tier];
  if (tier === 'stable') return null;

  // Fallback: check for tags directly in <Meta tags={[...]} /> (used by patterns)
  const tagsMatch = content.match(/<Meta\s[^>]*tags=\{\[([^\]]+)\]\}/);
  if (tagsMatch) {
    const tags = tagsMatch[1];
    if (tags.includes("'alpha'") || tags.includes('"alpha"'))
      return TIER_BADGES.alpha;
    if (tags.includes("'beta'") || tags.includes('"beta"'))
      return TIER_BADGES.beta;
  }

  // Fallback: when attached to stories via <Meta of={...} />, read the stories
  // file for alpha/beta tags (used by pattern docs with stories).
  const ofMatch = content.match(/<Meta\s[^>]*of=\{(\w+)\}/);
  if (ofMatch) {
    const storyVar = ofMatch[1];
    const importPattern = new RegExp(
      `import\\s+(?:\\*\\s+as\\s+${storyVar}|${storyVar}|\\{[^}]*\\b${storyVar}\\b[^}]*\\})\\s+from\\s+['"]([^'"]+)['"]`,
    );
    const importMatch = content.match(importPattern);
    if (importMatch) {
      const importPath = importMatch[1].replace(/^\.\//, '');
      const mdxDir = path.dirname(relativeFilePath);
      const storyFilePath = path.join(mdxDir, importPath);
      return readStoryTags(srcDir, storyFilePath);
    }
  }

  return null;
}

/**
 * Reads a stories file and checks for alpha/beta in its `tags` array.
 */
function readStoryTags(srcDir: string, importPath: string): TierBadge | null {
  const candidates = [importPath];
  if (!/\.[jt]sx?$/.test(importPath)) {
    candidates.push(
      importPath + '.tsx',
      importPath + '.ts',
      importPath + '.jsx',
      importPath + '.js',
    );
  }

  for (const candidate of candidates) {
    try {
      const content = fs.readFileSync(path.join(srcDir, candidate), 'utf-8');
      if (/['"]alpha['"]/.test(content)) return TIER_BADGES.alpha;
      if (/['"]beta['"]/.test(content)) return TIER_BADGES.beta;
      return null;
    } catch {
      // try next candidate
    }
  }

  return null;
}

// ─── Category Resolution ─────────────────────────────────────────────────────

/**
 * Maps from the first path segment of an MDX file to its Storybook root
 * category name. These match the sidebar labels in `manager.tsx`.
 */
const CATEGORY_MAP: Record<string, string> = {
  components: 'Komponenter',
  hooks: 'Hooks',
  utilities: 'Hjelpeverktøy',
  patterns: 'Bruksmønstre',
  'design-tokens': 'Design tokens',
  icons: 'Ikoner og symboler',
  symbols: 'Ikoner og symboler',
};

/** Resolves the Storybook root category for an MDX file from its path. */
function resolveCategory(relativeFilePath: string): string | null {
  const firstSegment = relativeFilePath.split('/')[0];
  return CATEGORY_MAP[firstSegment] ?? null;
}
