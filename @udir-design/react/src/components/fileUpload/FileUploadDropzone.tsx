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
>(function FileUploadDropzone({
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
}) {
  return (
    <Field
      className={cl(`uds-file-upload`, className)}
      data-size={size}
      style={style}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <FieldDescription>{description}</FieldDescription>}
      <Card>
        <>
          {multiple ? 'Dra og slipp filer her' : 'Dra og slipp filen her'}
          <span style={{ display: 'block' }}>eller</span>
          <Button variant="secondary">
            <UploadIcon aria-hidden />
            {multiple ? 'Velg filer' : 'Velg fil'}
          </Button>
        </>
      </Card>
      <input type="file" id={id} {...inputProps} />
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
});
