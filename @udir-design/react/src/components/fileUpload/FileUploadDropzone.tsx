import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import './fileUpload.css';
import { Field, FieldDescription } from '../field/Field';
import { Spinner } from '../spinner/Spinner';
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
  loading,
  label,
  style,
  error,
  inputProps,
  description,
  ...rest
}) {
  return (
    <Field
      className={cl(`uds-file-upload`, className)}
      aria-busy={Boolean(loading) || undefined}
      aria-disabled={Boolean(loading) || undefined}
      data-size={size}
      style={style}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <FieldDescription>{description}</FieldDescription>}
      <Card>
        {!loading ? (
          <>
            {multiple ? 'Dra og slipp filer her' : 'Dra og slipp filen her'}
            <span style={{ display: 'block' }}>eller</span>
            <Button variant="secondary">
              <UploadIcon aria-hidden />
              {multiple ? 'Velg filer' : 'Velg fil'}
            </Button>
          </>
        ) : (
          <>
            <Spinner aria-hidden="true" />
            Laster opp fil
          </>
        )}
      </Card>
      <input type="file" id="uds-drop-input" {...inputProps} />
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
});
