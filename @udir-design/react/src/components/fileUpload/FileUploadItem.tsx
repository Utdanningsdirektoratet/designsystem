import { Paragraph, Tooltip } from '@digdir/designsystemet-react';
import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { MouseEvent } from 'react';
import type { HTMLAttributes } from 'react';
import {
  FileCsvIcon,
  FileExcelIcon,
  FileIcon,
  FileImageIcon,
  FilePdfIcon,
  FileTextIcon,
  FileWordIcon,
  FileXMarkIcon,
  TrashIcon,
  XMarkOctagonFillIcon,
} from '@udir-design/icons';
import { Button } from '../button/Button';
import { Card } from '../card/Card';

/**
 * Inspired by Nav's Aksel
 */

export interface FileUploadItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'data-color'
> {
  'data-size'?: Size;
  /**
   * Either a native File or file metadata.
   */
  file: File;
  /**
   * Error message relating to the item.
   */
  error?: string;
  /**
   * Props for the delete button.
   */
  onRemove: (file: File, event: MouseEvent<HTMLButtonElement>) => void;
}

export const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>(
  (
    {
      file,
      error,
      className,
      'data-size': size,
      onRemove,
      ...rest
    }: FileUploadItemProps,
    ref,
  ) => {
    return (
      <Card
        className={cl('uds-file-upload__item', className)}
        aria-invalid={Boolean(error)}
        data-size={size}
        ref={ref}
        {...rest}
      >
        <Icon file={file} showError={Boolean(error)} />
        <div>
          <Paragraph>{file.name}</Paragraph>
          <Paragraph data-size="sm">{formatFileSize(file)}</Paragraph>
          <div aria-relevant="additions removals" aria-live="polite">
            {Boolean(error) && (
              <Paragraph>
                <XMarkOctagonFillIcon aria-hidden />
                {error}
              </Paragraph>
            )}
          </div>
        </div>
        <Tooltip content="Fjern filen">
          <Button icon onClick={(e) => onRemove(file, e)} variant="tertiary">
            <TrashIcon aria-hidden />
          </Button>
        </Tooltip>
      </Card>
    );
  },
);

export function formatFileSize(file: File): string | null {
  if (!file.size) {
    return null;
  }
  const megaBytes = file.size / (1024 * 1024);

  return `${megaBytes.toFixed(2)} MB`;
}

function Icon({ file, showError }: { file: File; showError: boolean }) {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

  if (showError) {
    return <FileXMarkIcon aria-hidden />;
  }

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return <FileImageIcon aria-hidden />;
    case 'pdf':
      return <FilePdfIcon aria-hidden />;
    case 'txt':
      return <FileTextIcon aria-hidden />;
    case 'csv':
      return <FileCsvIcon aria-hidden />;
    case 'xls':
    case 'xlsx':
      return <FileExcelIcon aria-hidden />;
    case 'doc':
    case 'docx':
      return <FileWordIcon aria-hidden />;
    default:
      return <FileIcon aria-hidden />;
  }
}
