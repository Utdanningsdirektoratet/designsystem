import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useRef } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { Field, FieldDescription } from '../field/Field';
import type { InputProps } from '../input/Input';
import { Label } from '../typography/label/Label';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import './fileUpload.css';

type InputProps_ = Omit<
  InputProps,
  'prefix' | 'className' | 'style' | 'data-color' | 'type' | 'data-size'
>;

export type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Changes size for descendant Designsystemet components.
   * Select from predefined sizes.
   */
  'data-size'?: Size;
  /**
   * Label
   */
  label?: ReactNode;
  /**
   * Description
   */
  description?: ReactNode;
  /**
   * Error message for field
   */
  error?: ReactNode;
  /**
   * Props for the input field
   */
  inputProps?: InputProps_;
  /**
   * Id for the input field
   */
  id?: string;
};

export const FileUploadTrigger = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUploadTrigger({
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
      <Field
        className={cl(`uds-file-upload`, className)}
        data-size={size}
        style={style}
        {...rest}
      >
        {!!label && <Label>{label}</Label>}
        {!!description && <FieldDescription>{description}</FieldDescription>}
        <Button
          variant="secondary"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <UploadIcon aria-hidden />
          {multiple ? 'Legg til filer' : 'Legg til fil'}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          multiple={Boolean(multiple) || undefined}
          id={id}
          {...inputProps}
        />
        {!!error && <ValidationMessage>{error}</ValidationMessage>}
      </Field>
    );
  },
);
