import './fileUpload.css';
import type { DSFieldElement } from '@digdir/designsystemet-web';
import cl from 'clsx/lite';
import type { HTMLAttributes, Ref } from 'react';
import { forwardRef } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button';
import { Card } from '../card';
import { Field } from '../field';
import { Label } from '../typography/label';
import { ValidationMessage } from '../typography/validationMessage';
import type { FileUploadProps } from './FileUploadTrigger';
import { useFileInput } from './useFileInput';

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
    cardProps,
    files,
    ...rest
  },
  ref,
) {
  // `getInputProps()` returns a `ref` that `react-dropzone` needs in order to
  // open the file dialog programmatically. It is not part of `InputProps`.
  const inputRef = useFileInput(
    files,
    (inputProps as { ref?: Ref<HTMLInputElement> } | undefined)?.ref,
  );

  return (
    <Field
      className={cl('uds-file-upload', className)}
      data-size={size}
      data-drag-active={isDragActive || undefined}
      data-drag-global={isDragGlobal || undefined}
      ref={ref}
      {...rest}
    >
      {!!label && <Label>{label}</Label>}
      {!!description && <Field.Description>{description}</Field.Description>}
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
          <Button asChild variant={variant}>
            <span>
              <UploadIcon aria-hidden />
              {/* Text in css */}
            </span>
          </Button>
        )}
        {/* The input covers the card and is the only focusable control here, so
            `ds-field` can wire the label, description and error message to it.
            `style` and `tabIndex` are overridden because `react-dropzone`'s
            `getInputProps()` visually hides the input and takes it out of the
            tab order. `aria-label` is dropped when there is a `label`, so a
            default from `getInputProps()` cannot silently replace it. */}
        <input
          type="file"
          className="ds-input"
          {...inputProps}
          ref={inputRef}
          onChange={(e) => {
            inputProps?.onChange?.(e);
            if (files) return;
            // Without `files` the input cannot be kept accurate, so keep it
            // empty rather than letting assistive technology announce a stale
            // selection. Deferred to a microtask so `onChange` handlers
            // further up the tree still see `event.target.files` while this
            // event is being dispatched.
            const input = e.currentTarget;
            queueMicrotask(() => {
              input.value = '';
            });
          }}
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
      </Card>
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </Field>
  );
});
