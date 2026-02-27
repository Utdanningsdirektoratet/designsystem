import cl from 'clsx/lite';
import { forwardRef, useEffect, useRef } from 'react';
import { CircleSlashIcon, UploadIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import './fileUpload.css';
import { Field } from '../field/Field';
import { Label } from '../typography/label/Label';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import type { FileUploadProps } from './FileUploadTrigger';

export type FileUploadDropzoneProps = FileUploadProps;

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(
  {
    className,
    'data-size': size,
    label,
    error,
    multiple,
    description,
    readonly = false,
    inputProps,
    ...rest
  },
  ref,
) {
  const mult = multiple === true || inputProps?.multiple === true;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cssVar = mult
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

  const disabled = inputProps?.readOnly ?? readonly;

  return (
    <Field
      className={cl(`uds-file-upload`, className)}
      data-size={size}
      ref={ref}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <Field.Description>{description}</Field.Description>}
      <Card>
        {/* Text in css */}
        <div>{/* Text in css */}</div>
        <Button variant="secondary" ref={buttonRef}>
          {disabled ? <CircleSlashIcon /> : <UploadIcon aria-hidden />}
          {/* Text in css */}
        </Button>
      </Card>
      <input
        type="file"
        {...inputProps}
        readOnly={disabled}
        disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
          inputProps?.onClick?.(e);
        }}
      />
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
});
