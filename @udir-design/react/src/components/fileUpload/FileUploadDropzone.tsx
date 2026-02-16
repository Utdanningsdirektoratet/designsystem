import cl from 'clsx/lite';
import { forwardRef } from 'react';
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
    style,
    error,
    description,
    inputProps,
    id,
    ...rest
  },
  ref,
) {
  const mult = multiple === true || inputProps?.multiple === true;

  return (
    <Field
      className={cl(`uds-file-upload`, className)}
      data-size={size}
      style={style}
      ref={ref}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <FieldDescription>{description}</FieldDescription>}
      <Card>
        <>
          {/* Text in css */}
          <span style={{ display: 'block' }}></span>
          <Button variant="secondary">
            <UploadIcon aria-hidden />
            {/* Text in css */}
          </Button>
        </>
      </Card>
      <input type="file" id={id} multiple={mult} {...inputProps} />
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
});
