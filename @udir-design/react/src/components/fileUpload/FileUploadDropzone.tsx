import './fileUpload.css';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useId, useRef } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import type { FileUploadProps } from './FileUploadTrigger';

export type FileUploadDropzoneProps = FileUploadProps & {
  /**
   * True if the user holds files
   * over the drop-area
   */
  isDragActive?: boolean;
  /**
   * True if the user holds files
   * anywhere in the document
   */
  isDragGlobal?: boolean;
  /**
   * Props for the card representing the drop zone
   */
  cardProps?: Omit<HTMLAttributes<HTMLDivElement>, 'data-size' | 'data-color'>;
};

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(
  {
    className,
    'data-size': size,
    label,
    error,
    description,
    isDragActive,
    isDragGlobal,
    variant = 'secondary',
    inputProps,
    cardProps,
    ...rest
  },
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cssVar = inputProps?.multiple
    ? '--udsc-fileUpload-chooseFiles-text'
    : '--udsc-fileUpload-chooseFile-text';
  // This is to make sure accessibility tests pass. Not actually necessary to make screenreaders announce the button.
  useEffect(() => {
    if (typeof window === 'undefined' || !buttonRef.current) return;
    const buttonAriaLabel = getComputedStyle(buttonRef.current)
      .getPropertyValue(cssVar)
      .replace(/^["']|["']$/g, '')
      .trim();
    buttonRef.current.setAttribute('aria-label', buttonAriaLabel);
  }, [cssVar]);

  const generatedId = useId();
  const id = rest.id ?? generatedId;
  const buttonId = `${id}-button`;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <div
      className={cl('ds-field', 'uds-file-upload', className)}
      data-size={size}
      data-drag-active={isDragActive || undefined}
      data-drag-global={isDragGlobal || undefined}
      ref={ref}
      {...rest}
    >
      {!!label && (
        <Label id={labelId} htmlFor={buttonId}>
          {label}
        </Label>
      )}
      {!!description && (
        <Field.Description id={descriptionId}>{description}</Field.Description>
      )}
      <Card
        {...cardProps}
        onDrop={(e) => {
          if (inputProps?.readOnly) {
            e.preventDefault();
            return;
          }
          cardProps?.onDrop?.(e);
        }}
        tabIndex={undefined}
      >
        {/* Text in css */}
        <div>{/* Text in css */}</div>
        {!inputProps?.readOnly && (
          <Button
            id={buttonId}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            variant={variant}
            ref={buttonRef}
          >
            <UploadIcon aria-hidden />
            {/* Text in css */}
          </Button>
        )}
      </Card>
      <input
        type="file"
        {...inputProps}
        onClick={(e) => {
          if (inputProps?.readOnly) {
            e.preventDefault();
          }
          inputProps?.onClick?.(e);
        }}
      />
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </div>
  );
});
