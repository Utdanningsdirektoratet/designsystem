import { useCallback, useEffect, useRef } from 'react';

/**
 * Returns a stable debounced version of `callback` that delays invocation
 * until `delay` ms have passed since the last call. Pending calls are
 * cancelled on unmount and when `delay` changes.
 *
 * Internal replacement for the deprecated `useDebounceCallback` export
 * from `@digdir/designsystemet-react`.
 */
export function useDebounceCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
