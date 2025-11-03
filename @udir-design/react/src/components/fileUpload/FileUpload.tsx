import { Slot } from '@radix-ui/react-slot';
import cl from 'clsx/lite';
import { forwardRef, useRef } from 'react';
import type { CardProps as DigdirCardProps } from '../card/Card';

export type FileUploadProps = Omit<
  DigdirCardProps,
  'data-color' | 'asChild'
> & {
  /**
   * Indicates if it is possible to select multiple files at once.
   * @default true
   */
  multiple?: boolean;
  /**
   * Indicates which file types to accept.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string;
  /**
   * Custom validator that is used to decide if a file is accepted or rejected.
   * @return true if the file is accepted, otherwise a string with the reason for rejection
   */
  validator?: (file: File) => true | string;
};

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    { className, children, multiple, accept, ...props },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <>
        <Slot
          onClick={() => inputRef.current?.click()}
          className={cl('uds-file_upload_simple', className)}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
        <input
          type="file"
          ref={inputRef}
          multiple={multiple}
          accept={accept}
          style={{ display: 'none' }}
        />
      </>
    );
  },
);
