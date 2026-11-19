import { useEffect, useRef, useState } from 'react';
import type { ComponentProps, RefObject } from 'react';
import { useAssetSource, useAssetUrl } from '../assets';
import type { AssetFormat } from '../assets';
import type { IllustrationVariant } from '../metadata';

/** About one row of cards, so scrolling rarely reaches an image before it has loaded. */
const NEAR_SCREEN_MARGIN = '300px 0px';

/**
 * Whether the element is on or near the screen; stays true once it has been. The browser does this
 * itself for `loading="lazy"` with a plain `src`, but not for files the source downloads first.
 */
function useNearScreen(ref: RefObject<HTMLElement | null>, lazy: boolean) {
  const [near, setNear] = useState(!lazy);
  useEffect(() => {
    const element = ref.current;
    if (near || !element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNear(true);
      },
      { rootMargin: NEAR_SCREEN_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near, ref]);
  return near;
}

export function AssetImage({
  variant,
  format = 'svg',
  alt,
  loading,
  ...props
}: {
  variant: IllustrationVariant;
  format?: AssetFormat;
  alt: string;
} & Omit<ComponentProps<'img'>, 'src' | 'alt'>) {
  const ref = useRef<HTMLImageElement>(null);
  const source = useAssetSource();
  const near = useNearScreen(ref, loading === 'lazy' && !source.directUrl);
  const src = useAssetUrl(variant, format, near);
  return <img ref={ref} src={src} alt={alt} loading={loading} {...props} />;
}
