import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useState } from 'react';

export interface FileUploadFileSizeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  /** Size in bytes */
  size: number | undefined;
  /**
   * Language for number formatting.
   * Auto-detected from the nearest ancestor `lang` attribute if not set.
   */
  lang?: string;
}

export const FileUploadFileSize = forwardRef<
  HTMLSpanElement,
  FileUploadFileSizeProps
>(function FileUploadFileSize({ size, lang, ...rest }, ref) {
  const [locale, setNode] = useResolvedLocale(lang);
  const formatted = size ? formatFileSize(size, locale) : null;

  const setRef = useCallback(
    (node: HTMLSpanElement | null) => {
      setNode(node);
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref, setNode],
  );

  if (formatted === null) {
    return null;
  }

  return (
    <span lang={lang} ref={setRef} {...rest}>
      {formatted}
    </span>
  );
});

function isValidLocale(tag?: string | null): tag is string {
  if (!tag) return false;
  try {
    Intl.getCanonicalLocales(tag);
    return true;
  } catch {
    return false;
  }
}

function useResolvedLocale(lang?: string) {
  const [node, setNode] = useState<Element | null>(null);
  const detected = node?.closest('[lang]')?.getAttribute('lang');
  // fall back to nb-NO if neither explicit nor ancestor lang is valid
  const locale = [lang, detected, 'nb-NO'].filter(isValidLocale)[0];
  return [locale, setNode] as const;
}

const KB = 1024;
const MB = 1024 * 1024;

export function formatFileSize(size: number, locale: string): string | null {
  if (size === 0) {
    return null;
  }
  const format = (value: number, maximumFractionDigits: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);

  if (size < KB) {
    return `${format(size, 0)} ${size === 1 ? 'byte' : 'bytes'}`;
  }
  if (size < MB) {
    return `${format(size / KB, 0)} KB`;
  }
  return `${format(size / MB, 2)} MB`;
}
