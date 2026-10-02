import { Tooltip } from '@digdir/designsystemet-react';
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
   * Name of the file the button acts on. Read out after the button text, so
   * every button in the list has a name of its own.
   */
  fileName: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * An icon button in a `FileUpload.Item`. The text is set in CSS through
 * `--ds-tooltip` on the class given in `className`.
 */
export const FileUploadItemButton = forwardRef<
  HTMLButtonElement,
  FileUploadItemButtonProps & { icon: ReactNode }
>(function FileUploadItemButton({ fileName, icon, id, ...rest }, ref) {
  const generatedId = useId();
  const buttonId = id ?? generatedId;
  const fileNameId = `${buttonId}-file`;

  /* The tooltip sets its text as `aria-label` on the button, overwriting any
     we set ourselves. Pointing `aria-labelledby` at the button first picks
     that label up, and the file name after it tells the buttons in a list
     apart, while the tooltip stays short.

     The file name is an `aria-label` on a hidden element rather than its
     text, so the row does not contain the name twice for anyone looking it up
     by text, such as a test. `role="img"` is there because a plain span may
     not be named. The element lies outside the button: content inside it
     would make the tooltip a description instead. */
  return (
    <>
      <Tooltip content="">
        <Button
          ref={ref}
          id={buttonId}
          icon
          variant="tertiary"
          aria-labelledby={`${buttonId} ${fileNameId}`}
          {...rest}
        >
          {icon}
        </Button>
      </Tooltip>
      {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- An `<img>` needs a `src`; this element only carries a name for `aria-labelledby`. */}
      <span hidden id={fileNameId} role="img" aria-label={fileName} />
    </>
  );
});
