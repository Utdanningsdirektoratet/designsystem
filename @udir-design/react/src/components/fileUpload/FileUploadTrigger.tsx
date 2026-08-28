import type { Size } from '@digdir/designsystemet-types';
import type { DSFieldElement } from '@digdir/designsystemet-web';
import cl from 'clsx/lite';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button';
import { Field } from '../field';
import type { InputProps } from '../input';
import { Label } from '../typography/label';
import { ValidationMessage } from '../typography/validationMessage';
import './fileUpload.css';

type InputProps_ = Omit<
  InputProps,
  | 'prefix'
  | 'className'
  | 'style'
  | 'tabIndex'
  | 'data-color'
  | 'type'
  | 'data-size'
>;

export type FileUploadProps = HTMLAttributes<DSFieldElement> & {
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
   * Props for the input field.
   *
   * Note: `style` and `tabIndex` are always set by the component, and
   * `aria-label` is ignored when there is a `label`.
   */
  inputProps?: InputProps_;
  /**
   *  Specify which variant of
   *  the button to use
   *  @default 'secondary'
   */
  variant?: 'primary' | 'secondary';
};

export const FileUploadTrigger = forwardRef<DSFieldElement, FileUploadProps>(
  function FileUploadTrigger(
    {
      className,
      'data-size': size,
      label,
      error,
      description,
      variant = 'secondary',
      inputProps,
      ...rest
    },
    ref,
  ) {
    return (
      <Field
        className={cl('uds-file-upload', className)}
        data-size={size}
        ref={ref}
        {...rest}
      >
        {!!label && <Label>{label}</Label>}
        {!!description && <Field.Description>{description}</Field.Description>}
        {/* The input covers the button and is the only focusable control here,
            so `ds-field` can wire the label, description and error message to
            it. The button is presentational. `style` and `tabIndex` are
            overridden so the input keeps covering the button and stays in the
            tab order; if it left the tab order there would be no tab stop here
            at all. `aria-label` is dropped when there is a `label`, so it
            cannot silently replace the accessible name. */}
        <span className="uds-file-upload__trigger">
          <Button asChild variant={variant}>
            {/* `aria-disabled` is Designsystemet's styling hook for the disabled
                look, and also suppresses its hover and active styles. It has no
                effect in the accessibility tree on a span without a role. */}
            <span
              aria-disabled={
                (inputProps?.readOnly ?? inputProps?.disabled) || undefined
              }
            >
              <UploadIcon aria-hidden />
              {/* Text in css */}
            </span>
          </Button>
          <input
            type="file"
            className="ds-input"
            {...inputProps}
            onClick={(e) => {
              if (inputProps?.readOnly) {
                e.preventDefault();
              }
              inputProps?.onClick?.(e);
            }}
            aria-label={label ? undefined : inputProps?.['aria-label']}
            style={undefined}
            tabIndex={undefined}
          />
        </span>
        {!!error && <ValidationMessage>{error}</ValidationMessage>}
      </Field>
    );
  },
);
