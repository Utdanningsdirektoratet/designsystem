import {
  type Ref,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

/**
 * Keeps the `hidden` attribute on a `<ds-suggestion>` clear button in sync with the
 * current value of its input. Returns the ref to place on that button, and forwards
 * the node to `forwardedRef` as well.
 *
 * `u-combobox` derives the attribute from the input value, but only recomputes it on
 * connect, on real `input` events, and when the clear button blurs. A value that comes
 * from React state is therefore stale in both directions: the button stays hidden for
 * a field that has a value, and stays visible for a field that was emptied.
 *
 * Works around https://github.com/digdir/designsystemet/issues/5295. A value written
 * straight to the DOM through a ref is still missed, since nothing re-renders — that
 * case needs an `input` event dispatched anyway, for React's own sake.
 *
 * Suggestion does not need this. It owns the input value itself in single mode, and
 * every change to it routes through u-combobox's own `setValue`, which dispatches a
 * real `input` event. Search has no item model, so its value is the consumer's React
 * state and never makes that round trip.
 */
export function useSyncedClearButton(
  forwardedRef: Ref<HTMLButtonElement> | undefined,
): RefObject<HTMLButtonElement | null> {
  const clearRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(
    forwardedRef,
    () => clearRef.current as HTMLButtonElement,
  );

  // No dependency array: the value we compare against lives in the DOM, so there is
  // nothing to diff. Every render of the clear button is our signal to re-check it.
  useEffect(() => {
    const clear = clearRef.current;
    const input = clear?.closest('ds-suggestion')?.querySelector('input');
    if (!clear || !input) return;

    // Same condition as u-combobox's own `isIdle`, so a disabled or read-only field
    // keeps its clear button hidden.
    const idle = !input.value || input.disabled || input.readOnly;
    if (clear.hasAttribute('hidden') !== idle) {
      clear.toggleAttribute('hidden', idle);
    }
  });

  return clearRef;
}
