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
    { fileName, icon, kind, tooltip, id, className, onClick, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const buttonId = id ?? generatedId;
    const fileNameId = `${buttonId}-file`;
    const kindClass = kind && `uds-file-upload__${kind}-button`;

    const node = useRef<HTMLButtonElement | null>(null);
    const setRef = useCallback(
      (el: HTMLButtonElement | null) => {
        const sameKind = kindClass
          ? `.${kindClass}`
          : `[data-tooltip="${CSS.escape(tooltip ?? '')}"]`;
        if (el) {
          restoreFocus(el, sameKind);
          if (kind === 'delete') keepAnnouncing(el);
        } else if (node.current) {
          handleRemoval(node.current, sameKind);
          if (kind === 'delete') announceRemoval(node.current);
        }
        node.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [ref, kind, kindClass, tooltip],
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
            onClick={(event) => {
              if (kind === 'delete') markRemoval(event.currentTarget, fileName);
              onClick(event);
            }}
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
 * Rows whose focused button went away while the row stayed, such as while the
 * item is `loading`, with the kind of button that had focus.
 */
const waitingRows = new WeakMap<
  Element,
  { sameKind: string; stop: () => void }
>();

/**
 * Called as the button leaves the page, which happens to the delete button
 * along with its row, and to every button while the item is `loading`. If the
 * button had focus, the browser left focus on the page itself. Tab still
 * continued from where the button had been, but until the user pressed it,
 * nothing showed where they were, and a screen reader had nothing to read.
 *
 * When the row is gone, focus moves instead to the same kind of button in the
 * next row, or in the row before when there is no next one, as APG describes
 * for a deleted list item and tab:
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#discernibleandpredictablekeyboardfocus
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#keyboardinteraction
 * Buttons are of the same kind when they have the same class, or for a
 * `FileUpload.ItemButton` the same tooltip. Landing on the same kind of button
 * lets the user remove one file after another. When the list has none left,
 * focus is left to the consumer.
 *
 * When the row is still there, its buttons are only hidden for a while, so
 * focus stays with the file instead of moving to another one. The row waits
 * for a button of the same kind to come back and gets focus back then, see
 * `restoreFocus`. If the row is removed while it waits, as when a file is set
 * to `loading` while it is deleted on the server, focus moves on as for any
 * removed row. Focus moving anywhere else ends the wait.
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
      if ((document.activeElement ?? document.body) !== document.body) return;
      if (row?.isConnected) {
        waitInRow(row, candidates, sameKind);
      } else if (focusFirst(candidates, sameKind)) {
        return;
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

/** Focuses the button of the given kind in the first row that has one. */
function focusFirst(rows: Element[], sameKind: string) {
  for (const row of rows) {
    const target = row.isConnected && row.querySelector<HTMLElement>(sameKind);
    if (target) {
      target.focus();
      return true;
    }
  }
  return false;
}

function waitInRow(row: Element, candidates: Element[], sameKind: string) {
  waitingRows.get(row)?.stop();
  const stopObserving = whenRemoved(row, () => {
    stop();
    if ((document.activeElement ?? document.body) === document.body) {
      focusFirst(candidates, sameKind);
    }
  });
  const stop = () => {
    stopObserving();
    document.removeEventListener('focusin', stop);
    waitingRows.delete(row);
  };
  document.addEventListener('focusin', stop);
  waitingRows.set(row, { sameKind, stop });
}

/**
 * Calls `then` once the row has left the page. Watches the whole page rather
 * than the list, since a list that is left empty may go along with the row.
 */
function whenRemoved(row: Element, then: () => void) {
  const observer = new MutationObserver(() => {
    if (row.isConnected) return;
    observer.disconnect();
    then();
  });
  observer.observe(row.getRootNode(), { childList: true, subtree: true });
  return () => observer.disconnect();
}

/**
 * Called as the button comes onto the page. Gives it focus if its row has been
 * waiting for this kind of button since the one that had focus went away, and
 * focus has not been anywhere else since.
 */
function restoreFocus(button: HTMLButtonElement, sameKind: string) {
  const row = button.closest('.uds-file-upload__item');
  const waiting = row && waitingRows.get(row);
  if (waiting?.sameKind !== sameKind) return;
  waiting.stop();
  if ((document.activeElement ?? document.body) === document.body) {
    button.focus();
  }
}

/**
 * Rows whose delete button has been pressed, with what to announce once the
 * row is gone, and while the row waits for that, how to stop waiting.
 *
 * A screen reader user hears focus land on the next file, which does not say
 * that the file was removed, and when the list is left empty they hear
 * nothing at all. The announcement waits for the row to go, so nothing is
 * said when `onRemove` asks first and the user cancels, or the removal fails.
 * Only the delete button announces: a row that goes for another reason, such
 * as a custom button that moves the file, has not necessarily been removed.
 */
const removals = new WeakMap<Element, { text: string; stop?: () => void }>();

/** Called as the delete button is pressed, while its row is still there. */
function markRemoval(button: HTMLButtonElement, fileName: string) {
  const row = button.closest('.uds-file-upload__item');
  /* Read from the row, so it follows the `lang` the row is in. */
  const removed =
    row &&
    getComputedStyle(row)
      .getPropertyValue('--udsc-fileUpload-removed-text')
      .trim()
      .replace(/^["']|["']$/g, '');
  if (removed) removals.set(row, { text: `${fileName} ${removed}` });
}

/**
 * Called as the delete button leaves the page. Announces the removal once its
 * row has gone too, which is right away unless the item is `loading`, as when
 * the file is deleted on the server first.
 */
function announceRemoval(button: HTMLButtonElement) {
  const row = button.closest('.uds-file-upload__item');
  const removal = row && removals.get(row);
  if (!removal) return;
  queueMicrotask(() => {
    if (button.isConnected) return;
    const done = () => {
      removals.delete(row);
      announce(removal.text);
    };
    if (row.isConnected) removal.stop = whenRemoved(row, done);
    else done();
  });
}

/**
 * Called as the delete button comes onto the page. Puts the live region in
 * place before it has anything to say, since a screen reader only announces
 * what changes in a region it already knows about. A button that comes back
 * while its row waits to be removed means the removal did not happen.
 */
function keepAnnouncing(button: HTMLButtonElement) {
  if (!status) {
    status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.className = 'ds-sr-only';
  }
  if (!status.isConnected) document.body.append(status);

  const row = button.closest('.uds-file-upload__item');
  const removal = row && removals.get(row);
  if (row && removal?.stop) {
    removal.stop();
    removals.delete(row);
  }
}

/**
 * One region for the whole page, outside every list, so it stays when the
 * consumer hides a list that is left empty.
 */
let status: HTMLElement | undefined;
let statusTimer = 0;

/**
 * Sets the text a moment after focus has moved. VoiceOver in Safari read the
 * text after the next file's button when it came right away, but dropped it
 * when focus went to an upload field, as the consumer does when the list is
 * left empty. Half a second later, it read the field and then the text. When
 * focus fell to the page instead, it dropped the text even a second later.
 */
function announce(text: string) {
  clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    if (!status) return;
    /* The same text again may not be read again, so it is told apart by a
       non-breaking space. */
    status.textContent = status.textContent === text ? `${text}\u00a0` : text;
    /* Emptied again, so the text is not found later when reading the page. */
    statusTimer = window.setTimeout(() => status?.replaceChildren(), 5000);
  }, 500);
}
