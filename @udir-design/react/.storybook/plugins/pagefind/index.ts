import * as fs from 'node:fs';
import * as path from 'node:path';
import type { StoryIndex } from 'storybook/internal/types';
import type { Plugin, ResolvedConfig } from 'vite';
import { type SearchIndex, buildSearchIndex } from './buildSearchIndex.js';

type PagefindPluginOptions = {
  /** Returns Storybook's current story index. */
  getStoryIndex: () => Promise<StoryIndex>;
};

const CONTENT_TYPES: Record<string, string> = {
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.css': 'text/css',
};

/**
 * Vite plugin that builds a Pagefind search index of the MDX docs pages, for
 * the search in `manager.tsx`.
 *
 * - In dev mode, the index is kept in memory, served at `/pagefind/`, and
 *   rebuilt when an MDX file or a file the index was built from changes.
 * - In production builds, the index is written to `pagefind/` in the output
 *   directory.
 */
export function pagefindPlugin({
  getStoryIndex,
}: PagefindPluginOptions): Plugin {
  let config: ResolvedConfig;

  async function build(): Promise<SearchIndex> {
    const start = Date.now();
    const searchIndex = await buildSearchIndex(await getStoryIndex());
    console.log(
      `[pagefind] Search index ready in ${Date.now() - start} ms (${searchIndex.files.size} files)`,
    );
    return searchIndex;
  }

  return {
    name: 'udir:pagefind',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    configureServer(server) {
      let searchIndex: Promise<SearchIndex | undefined> =
        Promise.resolve(undefined);
      const rebuild = () => {
        const previous = searchIndex;
        searchIndex = build().then(
          (built) => {
            // Vite only watches files outside its root once a page imports
            // them, such as the repository's README.md.
            server.watcher.add([...built.sourceFiles]);
            return built;
          },
          (error: unknown) => {
            console.error('[pagefind] Failed to build search index:', error);
            return previous;
          },
        );
      };
      rebuild();

      let rebuildTimer: NodeJS.Timeout | undefined;
      server.watcher.on('all', async (_event, changedPath) => {
        const isSource =
          changedPath.endsWith('.mdx') ||
          (await searchIndex)?.sourceFiles.has(changedPath);
        if (!isSource) return;
        // Debounce bursts of changes, such as when switching branches. This
        // also gives Storybook time to update its story index, which reacts
        // to the same changes.
        clearTimeout(rebuildTimer);
        rebuildTimer = setTimeout(rebuild, 200);
      });

      server.middlewares.use('/pagefind', async (req, res) => {
        const filePath = new URL(
          req.url ?? '/',
          'http://localhost',
        ).pathname.slice(1);
        const content = (await searchIndex)?.files.get(filePath);
        if (!content) {
          res.statusCode = 404;
          res.end();
          return;
        }
        res.setHeader(
          'Content-Type',
          CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream',
        );
        res.setHeader('Cache-Control', 'no-cache');
        res.end(content);
      });
    },

    async closeBundle() {
      if (config.command !== 'build') return;

      const outDir = path.resolve(config.root, config.build.outDir, 'pagefind');
      for (const [filePath, content] of (await build()).files) {
        const outputPath = path.join(outDir, filePath);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, content);
      }
    },
  };
}
