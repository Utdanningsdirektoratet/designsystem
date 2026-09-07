import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

type LanguageObserver = {
  callbacks: Set<() => void>;
  observer: MutationObserver;
};

const languageObservers = new WeakMap<Document, LanguageObserver>();

function subscribeToLanguageChanges(document: Document, callback: () => void) {
  let languageObserver = languageObservers.get(document);

  if (!languageObserver) {
    const MutationObserver = document.defaultView?.MutationObserver;
    if (!MutationObserver) return () => undefined;

    const callbacks = new Set<() => void>();
    const observer = new MutationObserver(() => {
      callbacks.forEach((notify) => notify());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
      subtree: true,
    });

    languageObserver = { callbacks, observer };
    languageObservers.set(document, languageObserver);
  }

  languageObserver.callbacks.add(callback);

  return () => {
    languageObserver.callbacks.delete(callback);
    if (languageObserver.callbacks.size === 0) {
      languageObserver.observer.disconnect();
      languageObservers.delete(document);
    }
  };
}

export function useLanguageVariable<T extends HTMLElement>(
  variable: `--${string}`,
  fallback: string,
  providedRef?: RefObject<T | null>,
) {
  const internalRef = useRef<T>(null);
  const ref = providedRef ?? internalRef;
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const nextValue = element.ownerDocument.defaultView
        ?.getComputedStyle(element)
        .getPropertyValue(variable)
        .replace(/^['"]|['"]$/g, '')
        .trim();
      setValue(nextValue || fallback);
    };

    update();
    return subscribeToLanguageChanges(element.ownerDocument, update);
  }, [fallback, ref, variable]);

  return [ref, value] as const;
}
