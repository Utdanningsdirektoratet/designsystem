import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
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
  function FileUploadTrigger(
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cssVar = multiple
      ? '--udsc-fileUpload-addFiles-text'
      : '--udsc-fileUpload-addFile-text';
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
        <Button
          variant="secondary"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          ref={buttonRef}
        >
          <UploadIcon aria-hidden />
          {/* Text in css */}
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
