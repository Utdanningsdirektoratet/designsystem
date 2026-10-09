import { createContext, use, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { illustrationAssetUrl } from './gallery.utils';
import { catalogSchema } from './schema';
import type { IllustrationCatalog, IllustrationVariant } from './schema';

export type AssetFormat = 'svg' | 'png';

/** Carries the HTTP status so the UI can tell missing access from other failures. */
export class AssetError extends Error {
  status: number;
  constructor(status: number) {
    super(`Asset request failed with HTTP ${status}.`);
    this.status = status;
  }
}

export interface AssetSource {
  /** Set when the browser can request files without credentials (development). */
  directUrl?: (variant: IllustrationVariant, format: AssetFormat) => string;
  /** A URL usable in `src` and `href`; may be an object URL. */
  url: (variant: IllustrationVariant, format: AssetFormat) => Promise<string>;
  blob: (variant: IllustrationVariant, format: AssetFormat) => Promise<Blob>;
  catalog: () => Promise<IllustrationCatalog>;
}

export function assetFilename(
  variant: IllustrationVariant,
  format: AssetFormat,
) {
  return format === 'svg' ? variant.svg : `${variant.id}.png`;
}

// Files written by build:assets, served by Vite or any static host without login.
export const localAssetSource: AssetSource = {
  directUrl: (variant, format) => illustrationAssetUrl(variant, format),
  url: async (variant, format) => illustrationAssetUrl(variant, format),
  blob: async (variant, format) => {
    const response = await fetch(illustrationAssetUrl(variant, format));
    if (!response.ok) throw new AssetError(response.status);
    return response.blob();
  },
  catalog: async () => {
    const response = await fetch(
      `${import.meta.env.BASE_URL}illustrations-assets/metadata.json`,
    );
    if (!response.ok) throw new AssetError(response.status);
    return catalogSchema.parse(await response.json());
  },
};

export const AssetContext = createContext<AssetSource>(localAssetSource);

export function useAssetSource() {
  return use(AssetContext);
}

export function useAssetUrl(variant: IllustrationVariant, format: AssetFormat) {
  const source = useAssetSource();
  const direct = source.directUrl?.(variant, format);
  const key = `${format}:${variant.id}`;
  const [loaded, setLoaded] = useState<{ key: string; url: string }>();

  useEffect(() => {
    if (direct !== undefined) return;
    let current = true;
    source
      .url(variant, format)
      .then((url) => {
        if (current) setLoaded({ key, url });
      })
      .catch(() => {});
    return () => {
      current = false;
    };
  }, [direct, source, variant, format, key]);

  // The previous image stays visible while the next one loads.
  return direct ?? loaded?.url;
}

/** Props for an `<a>`: a plain link when possible, otherwise a download with credentials. */
export function useAssetLinkProps(
  variant: IllustrationVariant,
  format: AssetFormat,
) {
  const source = useAssetSource();
  const filename = assetFilename(variant, format);
  const direct = source.directUrl?.(variant, format);
  return {
    href: direct ?? '#',
    download: filename,
    onClick:
      direct === undefined
        ? async (event: MouseEvent) => {
            event.preventDefault();
            const link = document.createElement('a');
            link.href = await source.url(variant, format);
            link.download = filename;
            link.click();
          }
        : undefined,
  };
}
