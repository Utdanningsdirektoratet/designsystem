import cl from 'clsx/lite';
import { forwardRef, useEffect, useRef } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import './fileUpload.css';
import { Field, FieldDescription } from '../field/Field';
import { Label } from '../typography/label/Label';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import type { FileUploadProps } from './FileUploadTrigger';

export type FileUploadDropzoneProps = FileUploadProps;

export const FileUploadDropzone = forwardRef<
  HTMLInputElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(
  {
    className,
    multiple,
    'data-size': size,
    label,
    error,
    description,
    inputProps,
    id,
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
  return (
    <Field
      className={cl(`uds-file-upload`, className)}
      data-size={size}
      ref={ref}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <FieldDescription>{description}</FieldDescription>}
      <Card>
        {/* Text in css */}
        <div>{/* Text in css */}</div>
        <Button variant="secondary" ref={buttonRef}>
          <UploadIcon aria-hidden />
          {/* Text in css */}
        </Button>
      </Card>
      <input type="file" id={id} multiple={mult} {...inputProps} />
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
});
