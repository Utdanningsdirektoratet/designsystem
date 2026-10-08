import { AssetError, assetFilename } from './assets';
import type { AssetFormat, AssetSource } from './assets';
import { catalogSchema } from './schema';
import type { IllustrationVariant } from './schema';

export interface StorageConfig {
  storageAccount: string;
  container: string;
  /** Hash path that ties the uploaded files to the metadata this build was made from. */
  version: string;
}

const storageVersion = '2023-11-03';
const mimeTypes: Record<AssetFormat, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
};

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
  getToken: () => Promise<string>,
): AssetSource {
  const root = `https://${config.storageAccount}.blob.core.windows.net/${config.container}/${config.version}`;
  const blobs = new Map<string, Promise<Blob>>();
  const urls = new Map<string, Promise<string>>();

  async function get(path: string) {
    const response = await fetch(`${root}/${path}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'x-ms-version': storageVersion,
      },
    });
    if (!response.ok) throw new AssetError(response.status);
    return response;
  }

  const blob = (variant: IllustrationVariant, format: AssetFormat) =>
    memoize(blobs, `${format}:${variant.id}`, async () => {
      const response = await get(
        `${format}/${encodeURIComponent(assetFilename(variant, format))}`,
      );
      // An object URL only renders as an image when the type is explicit.
      return new Blob([await response.arrayBuffer()], {
        type: mimeTypes[format],
      });
    });

  return {
    blob,
    url: (variant, format) =>
      memoize(urls, `${format}:${variant.id}`, async () =>
        URL.createObjectURL(await blob(variant, format)),
      ),
    catalog: async () =>
      catalogSchema.parse(await (await get('metadata.json')).json()),
  };
}
