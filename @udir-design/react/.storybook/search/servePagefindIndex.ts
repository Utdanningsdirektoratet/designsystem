import * as fs from 'node:fs';
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
      server.middlewares.use('/pagefind', (req, res) => {
        const { pathname } = new URL(req.url ?? '/', 'http://localhost');
        const filePath = path.join(INDEX_DIR, decodeURIComponent(pathname));
        const isFile =
          filePath.startsWith(INDEX_DIR) &&
          fs.statSync(filePath, { throwIfNoEntry: false })?.isFile();
        if (!isFile) {
          res.statusCode = 404;
          res.end();
          return;
        }
        res.setHeader(
          'Content-Type',
          CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream',
        );
        res.setHeader('Cache-Control', 'no-cache');
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}
