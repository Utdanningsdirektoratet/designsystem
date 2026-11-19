import { AssetError, assetFilename } from './assets';
import type { AssetFormat, AssetSource } from './assets';
import { catalogSchema } from './schema';
import type { IllustrationVariant } from './schema';

export interface StorageConfig {
  /** The artwork container's address, such as `https://design.udir.no/illustrasjoner-filer`. */
  baseUrl: string;
  /** Hash path that ties the uploaded files to the metadata this build was made from. */
  version: string;
}

const storageVersion = '2023-11-03';
const mimeTypes: Record<AssetFormat, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
};

/** Preloads run a few at a time, so they leave most of the bandwidth to what is on screen. */
const PRELOAD_CONCURRENCY = 2;

interface Preload {
  key: string;
  load: () => Promise<Blob>;
}

function memoize<T>(
  cache: Map<string, Promise<T>>,
  key: string,
  load: () => Promise<T>,
) {
  let value = cache.get(key);
  if (!value) {
    value = load();
    cache.set(key, value);
    // A failed request must not stay cached, so the next render can retry.
    value.catch(() => cache.delete(key));
  }
  return value;
}

/** Reads a private blob container with the signed-in user's access token. */
export function createStorageSource(
  config: StorageConfig,
  getToken: (forceRefresh?: boolean) => Promise<string>,
): AssetSource {
  const root = `${config.baseUrl}/${config.version}`;
  const blobs = new Map<string, Promise<Blob>>();
  const urls = new Map<string, Promise<string>>();
  // Preloads not started yet, in order. A file the page asks for leaves the queue and starts at once.
  let waiting: Preload[] = [];
  let running = 0;

  function startPreloads() {
    while (running < PRELOAD_CONCURRENCY && waiting.length > 0) {
      const [next, ...rest] = waiting;
      waiting = rest;
      running++;
      next
        .load()
        .catch(() => {})
        .finally(() => {
          running--;
          startPreloads();
        });
    }
  }

  const request = async (path: string, forceRefresh: boolean) =>
    fetch(`${root}/${path}`, {
      headers: {
        Authorization: `Bearer ${await getToken(forceRefresh)}`,
        'x-ms-version': storageVersion,
      },
    });

  async function get(path: string) {
    let response = await request(path, false);
    // A token revoked before it expired is only replaced by a forced refresh.
    if (response.status === 401) response = await request(path, true);
    if (!response.ok) throw new AssetError(response.status);
    return response;
  }

  const keyOf = (variant: IllustrationVariant, format: AssetFormat) =>
    `${format}:${variant.id}`;

  function blob(variant: IllustrationVariant, format: AssetFormat) {
    const key = keyOf(variant, format);
    waiting = waiting.filter((item) => item.key !== key);
    return memoize(blobs, key, async () => {
      const response = await get(
        `${format}/${encodeURIComponent(assetFilename(variant, format))}`,
      );
      // An object URL only renders as an image when the type is explicit.
      return new Blob([await response.arrayBuffer()], {
        type: mimeTypes[format],
      });
    });
  }

  return {
    blob,
    url: (variant, format) =>
      memoize(urls, `${format}:${variant.id}`, async () =>
        URL.createObjectURL(await blob(variant, format)),
      ),
    catalog: async () =>
      catalogSchema.parse(await (await get('metadata.json')).json()),
    prefetch: (variants, format) => {
      const queued = variants
        .map((variant) => ({
          key: keyOf(variant, format),
          load: () => blob(variant, format),
        }))
        .filter(
          ({ key }) =>
            !blobs.has(key) && !waiting.some((item) => item.key === key),
        );
      waiting = [...waiting, ...queued];
      startPreloads();
      return () => {
        waiting = waiting.filter((item) => !queued.includes(item));
      };
    },
  };
}
