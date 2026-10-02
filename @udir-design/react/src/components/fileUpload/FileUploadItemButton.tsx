import { Tooltip } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef, useId } from 'react';
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

    /* The tooltip sets its text as `aria-label` on the button, overwriting any
       we set ourselves. Pointing `aria-labelledby` at the button first picks
       that label up, and the file name after it tells the buttons in a list
       apart, while the tooltip stays short.

       The file name is on a hidden element twice over, since browsers read a
       hidden element differently: Chrome and Safari take its `aria-label`,
       for which `role="img"` is there, as a plain span may not be named;
       Firefox leaves the `aria-label` out and takes its text, and read only
       "Last ned filen" without it. The text is inside a shadow root: as plain
       text, the row would contain the name twice for anyone looking it up by
       text, such as a test with `getByText`, which does not look inside shadow
       roots, and Chrome and Safari do not read text there. The element lies
       outside the button: content inside it would make the tooltip a
       description instead. */
    return (
      <>
        <Tooltip content={tooltip ?? ''}>
          <Button
            ref={ref}
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
        <span
          hidden
          id={fileNameId}
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- An `<img>` needs a `src`; this element only carries a name for `aria-labelledby`.
          role="img"
          aria-label={fileName}
          ref={(el) => {
            if (el) {
              (el.shadowRoot ?? el.attachShadow({ mode: 'open' })).textContent =
                fileName;
            }
          }}
        />
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
