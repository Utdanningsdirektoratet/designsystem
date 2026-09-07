import './fileUpload.css';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { UploadIcon } from '@udir-design/icons';
import { useLanguageVariable } from '../../hooks/useLanguageVariable';
import { Button } from '../button';
import { Card } from '../card';
import { Field } from '../field';
import { Label } from '../typography/label';
import { ValidationMessage } from '../typography/validationMessage';
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
  /**
   * Props for the card representing the drop zone
   */
  cardProps?: Omit<HTMLAttributes<HTMLDivElement>, 'data-size' | 'data-color'>;
};

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
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
    ...rest
  },
  ref,
) {
  const cssVar = inputProps?.multiple
    ? '--udsc-fileUpload-chooseFiles-text'
    : '--udsc-fileUpload-chooseFile-text';
  const [buttonRef, buttonAriaLabel] = useLanguageVariable<HTMLButtonElement>(
    cssVar,
    inputProps?.multiple ? 'Velg filer' : 'Velg fil',
  );

  const generatedId = useId();
  const id = rest.id ?? generatedId;
  const buttonId = `${id}-button`;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <div
      className={cl('ds-field', 'uds-file-upload', className)}
      data-size={size}
      data-drag-active={isDragActive || undefined}
      data-drag-global={isDragGlobal || undefined}
      ref={ref}
      {...rest}
    >
      {!!label && (
        <Label id={labelId} htmlFor={buttonId}>
          {label}
        </Label>
      )}
      {!!description && (
        <Field.Description id={descriptionId}>{description}</Field.Description>
      )}
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
          <Button
            id={buttonId}
            aria-label={buttonAriaLabel}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            variant={variant}
            ref={buttonRef}
          >
            <UploadIcon aria-hidden />
            {/* Text in css */}
          </Button>
        )}
      </Card>
      <input
        className="ds-input"
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
    </div>
  );
});
