import './fileUpload.css';
import type { DSFieldElement } from '@digdir/designsystemet-web';
import cl from 'clsx/lite';
import { forwardRef, useEffect, useRef } from 'react';
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
};

export const FileUploadDropzone = forwardRef<
  DSFieldElement,
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

  return (
    <Field
      className={cl(`uds-file-upload`, className)}
      data-size={size}
      onDrop={(e) => {
        if (inputProps?.readOnly) {
          e.preventDefault();
          return;
        }
        rest.onDrop?.(e);
      }}
      data-drag-active={isDragActive || undefined}
      data-drag-global={isDragGlobal || undefined}
      ref={ref}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <Field.Description>{description}</Field.Description>}
      <Card>
        {/* Text in css */}
        <div>{/* Text in css */}</div>
        {!inputProps?.readOnly && (
          <Button variant={variant} ref={buttonRef}>
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
    </Field>
  );
});
