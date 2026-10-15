import type { ComponentProps } from 'react';
import { useAssetUrl } from './assets';
import type { AssetFormat } from './assets';
import type { IllustrationVariant } from './metadata';

export function AssetImage({
  variant,
  format = 'svg',
  alt,
  ...props
}: {
  variant: IllustrationVariant;
  format?: AssetFormat;
  alt: string;
} & Omit<ComponentProps<'img'>, 'src' | 'alt'>) {
  const src = useAssetUrl(variant, format);
  return <img src={src} alt={alt} {...props} />;
}
