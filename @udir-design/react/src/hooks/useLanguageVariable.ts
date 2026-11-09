import { useLayoutEffect, useRef, useState } from 'react';

type LanguageObserver = {
  callbacks: Set<() => void>;
  observer: MutationObserver;
};

// Hooks in the same document share one observer instead of observing every
// component separately.
const languageObservers = new WeakMap<Document, LanguageObserver>();

function subscribeToLanguageChanges(
  document: Document,
  callback: () => void,
): (() => void) | undefined {
  let languageObserver = languageObservers.get(document);

  if (!languageObserver) {
    const MutationObserverConstructor = document.defaultView?.MutationObserver;
    if (!MutationObserverConstructor) return;

    const callbacks = new Set<() => void>();
    const observer = new MutationObserverConstructor(() => {
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
) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(fallback);

  // Layout effect so the translated text is in place before first paint.
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const nextValue = element.ownerDocument.defaultView
        ?.getComputedStyle(element)
        .getPropertyValue(variable)
        .trim()
        // CSS string custom properties include their wrapping quotes.
        .replace(/^['"]|['"]$/g, '');
      setValue(nextValue || fallback);
    };

    update();
    return subscribeToLanguageChanges(element.ownerDocument, update);
  }, [fallback, ref, variable]);

  return [ref, value] as const;
}
