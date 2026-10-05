import { Tooltip } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Button, type ButtonProps } from '../button';

export interface FileUploadItemButtonProps extends Omit<
  ButtonProps,
  | 'children'
  | 'icon'
  | 'variant'
  | 'asChild'
  | 'onClick'
  | 'aria-label'
  | 'aria-labelledby'
> {
  /**
   * Name of the file the button acts on. Shown and read out after the button
   * text, so every button in the list has a name of its own.
   */
  fileName: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * An icon button in a `FileUpload.Item`. `kind` sets the class
 * `uds-file-upload__<kind>-button`, which the text is set on in CSS through
 * `--ds-tooltip`.
 */
export const FileUploadItemButton = forwardRef<
  HTMLButtonElement,
  FileUploadItemButtonProps & { icon: ReactNode; kind: 'delete' | 'download' }
>(function FileUploadItemButton(
  { fileName, icon, kind, className, ...rest },
  ref,
) {
  const kindClass = `uds-file-upload__${kind}-button`;

  const node = useRef<HTMLButtonElement | null>(null);
  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (!el && node.current) handleRemoval(node.current, kindClass);
      node.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    },
    [ref, kindClass],
  );

  /* Read from the button, so it follows the `lang` the button is in. */
  const [label, setLabel] = useState<string>();
  useLayoutEffect(() => {
    if (node.current) setLabel(cssText(node.current, '--ds-tooltip'));
  }, []);

  /* The tooltip shows the file name too, since its text is also the
     button's name: Digdir's tooltip sets it as `aria-label`, overwriting
     any we set ourselves, and the file name tells the buttons in a list
     apart. A name from `aria-labelledby` instead, pointing at the tooltip's
     `aria-label` and the file name on a hidden element, would have kept the
     tooltip short, but TalkBack 16, which Samsung phones come with, read such
     a button as "Knapp" with no name at all, in Chrome 150 and later;
     `aria-label` it reads. */
  return (
    <Tooltip content={label ? `${label} ${fileName}` : ''}>
      <Button
        ref={setRef}
        icon
        variant="tertiary"
        className={cl(kindClass, className)}
        {...rest}
      >
        {icon}
      </Button>
    </Tooltip>
  );
});

/** A text from CSS, such as one that follows `lang`, without its quotes. */
function cssText(element: Element, property: string) {
  return getComputedStyle(element)
    .getPropertyValue(property)
    .trim()
    .replace(/^["']|["']$/g, '');
}

/**
 * Called as the button leaves the page, which happens to the delete button
 * along with its row, and to every button while the item is `loading`. If the
 * button had focus, the browser left focus on the page itself. Tab still
 * continued from where the button had been, but until the user pressed it,
 * nothing showed where they were, and a screen reader had nothing to read.
 *
 * Focus moves instead to the same kind of button in the next row, or in the
 * row before when there is no next one, as APG describes for a deleted list
 * item and tab:
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#discernibleandpredictablekeyboardfocus
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#keyboardinteraction
 * Landing on the same kind of button lets the user remove one file after
 * another. When the list has none left, focus is left to the consumer.
 *
 * If there is no button to move focus to, Digdir's tooltip implementation
 * currently stays open, pointing at where the button was, since it only closes
 * on focus, mouse movement or Escape. The same happens to a button under the
 * mouse, which Safari does not focus on click. We work around this by closing
 * the tooltip here.
 */
function handleRemoval(button: HTMLButtonElement, kindClass: string) {
  const focused = document.activeElement === button;
  if (!focused && !button.matches(':hover')) return;
  const row = button.closest('.uds-file-upload__item');
  const rows = row?.parentElement ? Array.from(row.parentElement.children) : [];
  const index = row ? rows.indexOf(row) : -1;
  const candidates =
    index < 0
      ? []
      : [...rows.slice(index + 1), ...rows.slice(0, index).reverse()];

  /* React lets go of the ref before it removes the button, so wait until it
     has. A button that is still there only had its ref changed. */
  queueMicrotask(() => {
    if (button.isConnected) return;
    if (focused) {
      /* Focus that is somewhere else, such as on a message the consumer moved
         it to, stays put, and the focus event has already moved the
         tooltip. */
      const active = document.activeElement;
      if (active && active !== document.body) return;
      for (const candidate of candidates) {
        const target =
          candidate.isConnected &&
          candidate.querySelector<HTMLElement>(`.${kindClass}`);
        if (target) {
          target.focus();
          return;
        }
      }
    }

    /* A workaround until Digdir closes the tooltip when its button is removed.
       Digdir still counts it as open and closes it again on the next focus or
       mouse movement, which does nothing to a closed popover. `popover` is
       only set once the tooltip has been shown. */
    const tooltip = document.querySelector<HTMLElement>('.ds-tooltip');
    if (tooltip?.popover) tooltip.hidePopover();
  });
}
