import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import type { Plugin } from 'vite';

/** The search index that `buildSearchIndex.ts` wrote in the last build. */
const INDEX_DIR = path.resolve(
  import.meta.dirname,
  '../../storybook-static/pagefind',
);

const CONTENT_TYPES: Record<string, string> = {
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.css': 'text/css',
};

/**
 * Vite plugin that serves the search index from the last Storybook build at
 * `/pagefind/` in dev mode, since the index is only built by
 * `build:storybook`. The search dialog in `manager.tsx` says so in dev mode.
 */
export function servePagefindIndexPlugin(): Plugin {
  return {
    name: 'udir:serve-pagefind-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/pagefind', async (req, res) => {
        const { pathname } = new URL(req.url ?? '/', 'http://localhost');
        const filePath = path.join(INDEX_DIR, decodeURIComponent(pathname));
        // Reading can fail while `build:storybook` replaces the index, and an
        // unhandled error would stop the dev server.
        const content = filePath.startsWith(INDEX_DIR)
          ? await readFile(filePath).catch(() => undefined)
          : undefined;
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
  };
}
