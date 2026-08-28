import type { Ref } from 'react';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Keeps the file input's own `files` list in sync with the attached files, and
 * returns a ref callback to put on the input.
 *
 * The input never learns about dropped files or removals, so it cannot track
 * them by itself. Pass `undefined` to opt out; the caller then clears the value
 * after each selection instead.
 */
export function useFileInput(
  files: File[] | undefined,
  forwardedRef: Ref<HTMLInputElement> | undefined,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const ref = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      // `getInputProps()` puts `react-dropzone`'s own ref on the input, which it
      // needs to open the file dialog programmatically.
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        // oxlint-disable-next-line react/immutability -- Assigning to a forwarded ref object is what a ref callback is for; there is no other way to hand the node back to `react-dropzone`.
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  useEffect(() => {
    const input = inputRef.current;
    if (!input || !files) return;

    if (!canAssignFiles(input)) return;

    const dataTransfer = new DataTransfer();
    for (const file of files) dataTransfer.items.add(file);
    // Assigning `files` fires no `change` event, so this cannot loop back into
    // the consumer's `onChange`.
    input.files = dataTransfer.files;
  }, [files]);

  return ref;
}

/**
 * Mirroring is an enhancement, so it must not throw where `files` cannot be
 * assigned: engines without the setter, and test utilities such as
 * `@testing-library/user-event`, which replaces `files` with a getter-only own
 * property when it uploads.
 */
function canAssignFiles(input: HTMLInputElement) {
  const descriptor =
    Object.getOwnPropertyDescriptor(input, 'files') ??
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'files');

  return typeof descriptor?.set === 'function';
}
