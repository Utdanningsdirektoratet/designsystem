import { Tooltip } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef, useCallback, useId, useRef } from 'react';
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
   * Name of the file the button acts on. Read out after `tooltip`, so every
   * button in the list has a name of its own.
   */
  fileName: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * The icon shown in the button, such as one from `@udir-design/icons`, with
   * `aria-hidden`. Should only contain an icon, not text.
   */
  icon: ReactNode;
  /**
   * What the button does, such as "Beskriv filen". Shown as a tooltip, and
   * read out before `fileName` as the name of the button, so it has to make
   * sense with the file name after it.
   */
  tooltip: string;
}

/**
 * The delete and download buttons take their text from CSS instead of
 * `tooltip`, so that it follows `lang`. `kind` sets the class
 * `uds-file-upload__<kind>-button`, which the text is set on through
 * `--ds-tooltip`.
 */
type ItemButtonProps = Omit<FileUploadItemButtonProps, 'tooltip'> &
  (
    | { tooltip: string; kind?: undefined }
    | { kind: 'delete' | 'download'; tooltip?: undefined }
  );

export const ItemButton = forwardRef<HTMLButtonElement, ItemButtonProps>(
  function ItemButton(
    { fileName, icon, kind, tooltip, id, className, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const buttonId = id ?? generatedId;
    const fileNameId = `${buttonId}-file`;
    const kindClass = kind && `uds-file-upload__${kind}-button`;

    const node = useRef<HTMLButtonElement | null>(null);
    const setRef = useCallback(
      (el: HTMLButtonElement | null) => {
        if (!el && node.current) {
          handleRemoval(
            node.current,
            kindClass
              ? `.${kindClass}`
              : `[data-tooltip="${CSS.escape(tooltip ?? '')}"]`,
          );
        }
        node.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [ref, kindClass, tooltip],
    );

    /* The tooltip sets its text as `aria-label` on the button, overwriting any
       we set ourselves. Pointing `aria-labelledby` at the button first picks
       that label up, and the file name after it tells the buttons in a list
       apart, while the tooltip stays short.

       The file name is an `aria-label` on a hidden element rather than its
       text, so the row does not contain the name twice for anyone looking it
       up by text, such as a test. `role="img"` is there because a plain span
       may not be named. The element lies outside the button: content inside
       it would make the tooltip a description instead. */
    return (
      <>
        <Tooltip content={tooltip ?? ''}>
          <Button
            ref={setRef}
            id={buttonId}
            icon
            variant="tertiary"
            aria-labelledby={`${buttonId} ${fileNameId}`}
            className={cl(kindClass, className)}
            {...rest}
          >
            {icon}
          </Button>
        </Tooltip>
        {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- An `<img>` needs a `src`; this element only carries a name for `aria-labelledby`. */}
        <span hidden id={fileNameId} role="img" aria-label={fileName} />
      </>
    );
  },
);

export const FileUploadItemButton = forwardRef<
  HTMLButtonElement,
  FileUploadItemButtonProps
>(function FileUploadItemButton(props, ref) {
  return <ItemButton ref={ref} {...props} />;
});

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
 * Buttons are of the same kind when they have the same class, or for a
 * `FileUpload.ItemButton` the same tooltip. Landing on the same kind of button
 * lets the user remove one file after another. When the list has none left,
 * focus is left to the consumer.
 *
 * If there is no button to move focus to, Digdir's tooltip implementation
 * currently stays open, pointing at where the button was, since it only closes
 * on focus, mouse movement or Escape. The same happens to a button under the
 * mouse, which Safari does not focus on click. We work around this by closing
 * the tooltip here.
 */
function handleRemoval(button: HTMLButtonElement, sameKind: string) {
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
          candidate.querySelector<HTMLElement>(sameKind);
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
