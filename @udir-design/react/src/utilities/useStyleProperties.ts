import type { Ref, RefCallback } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

// React 18 warns about `useLayoutEffect` during server rendering
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** CSS property names as written in CSS (`max-width`, `--custom-property`), and their values */
type StyleProperties = Record<string, string | undefined>;

/**
 * Sets CSS properties on an element with CSSOM after render, instead of with the `style` prop.
 * A strict Content Security Policy (`style-src` without `'unsafe-inline'`) blocks server-rendered
 * `style` attributes, but not CSSOM. Server-rendered HTML shows the CSS fallbacks until
 * hydration.
 *
 * Properties that are `undefined` are not set, so the CSS fallback applies.
 *
 * @returns A callback ref for the element. It also sets `forwardedRef`.
 */
export function useStyleProperties<T extends HTMLElement>(
  forwardedRef: Ref<T> | undefined,
  properties: StyleProperties,
): RefCallback<T> {
  const elementRef = useRef<T | null>(null);
  const applied = useRef<{ element: T; properties: StyleProperties }>(null);

  // No dependency list: `properties` is a new object on every render, and unchanged values are skipped
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const previous: StyleProperties =
      applied.current?.element === element ? applied.current.properties : {};
    for (const [name, value] of Object.entries(properties)) {
      if (value === previous[name]) continue;
      // Only removes what this hook set, so values from the `style` prop are kept
      if (value === undefined) element.style.removeProperty(name);
      else element.style.setProperty(name, value);
    }
    applied.current = { element, properties };
  });

  return useCallback(
    (element: T | null) => {
      elementRef.current = element;
      if (typeof forwardedRef === 'function') return forwardedRef(element);
      // oxlint-disable-next-line react/immutability -- Setting a forwarded ref object is how React itself attaches refs
      if (forwardedRef) forwardedRef.current = element;
    },
    [forwardedRef],
  );
}
