import { Paragraph, Tooltip } from '@digdir/designsystemet-react';
import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef, useEffect, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
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
import { Button } from '../button';
import { Card } from '../card';
import { Link } from '../link';
import { Spinner } from '../spinner';

/**
 * Inspired by Nav's Aksel
 */

export interface FileUploadItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'data-color'
> {
  'data-size'?: Size;
  /**
   * Data shown below the file name. Falls back to the formatted file size if not provided.
   * Set to `null` to hide the description entirely.
   */
  description?: ReactNode;
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
  /**
   * Toggle loading state.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * @default false
   */
  readonly?: boolean;
  /**
   * href to file location
   */
  href?: string;
}

export const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>(
  (
    {
      file,
      error,
      loading,
      href,
      readonly = false,
      className,
      'data-size': size,
      description,
      onRemove,
      ...rest
    }: FileUploadItemProps,
    ref,
  ) => {
    return (
      <Card
        className={cl('uds-file-upload__item', className)}
        aria-invalid={Boolean(error)}
        aria-busy={Boolean(loading) || undefined}
        data-size={size}
        ref={ref}
        {...rest}
      >
        <div>
          <div>
            <Icon file={file} showError={Boolean(error)} loading={loading} />
          </div>
          <div>
            <FileName file={file} href={href} />
            <Paragraph data-size="sm">
              {/* Loading text in css */}
              {!loading &&
                description !== null &&
                (description ?? formatFileSize(file))}
            </Paragraph>
          </div>
          {!loading && !readonly && (
            <Tooltip content="">
              {/* Tooltip content in css */}
              <Button
                icon
                onClick={(e) => onRemove(file, e)}
                variant="tertiary"
              >
                <TrashIcon aria-hidden />
              </Button>
            </Tooltip>
          )}
        </div>
        <div
          aria-relevant="additions removals"
          aria-live="polite"
          className="error"
        >
          {Boolean(error) && (
            <Paragraph>
              <XMarkOctagonFillIcon aria-hidden />
              {error}
            </Paragraph>
          )}
        </div>
      </Card>
    );
  },
);
FileUploadItem.displayName = 'FileUpload.Item';

const KB = 1024;
const MB = 1024 * 1024;

export function formatFileSize(file: File): string | null {
  if (file.size === 0) {
    return null;
  }
  if (file.size < 0.01 * MB) {
    return `${(file.size / KB).toFixed(2)} KB`;
  }
  return `${(file.size / MB).toFixed(2)} MB`;
}

function Icon({
  file,
  showError,
  loading,
}: {
  file: File;
  showError: boolean;
  loading?: boolean;
}) {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

  if (loading) {
    return <Spinner aria-label="spinner" />;
  }

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

/**
 * Prototype (option E): resolve a real URL for the file — either the `href`
 * prop or an object URL created for the native `File` — so the rendered anchor
 * is a genuine link. Ctrl/middle-click and the context menu then behave the way
 * the link styling promises, and `download` works natively without
 * `preventDefault`. When no URL can be resolved, the name is plain text rather
 * than a link that goes nowhere.
 */

/**
 * Creates an object URL for `file`, revoking it when the item unmounts.
 *
 * The URL is created in a lazy initializer rather than an effect, so it exists
 * on first render and the name never flashes as plain text. This means the URL
 * is tied to the component instance: pass a new `key` if the `file` prop is
 * replaced with a different file.
 */
function useObjectUrl(file: File | undefined): string | undefined {
  const [url] = useState(() => (file ? URL.createObjectURL(file) : undefined));

  useEffect(() => {
    if (!url) return;
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return url;
}

interface FileNameProps {
  file: File;
  href?: string;
}

const FileName = ({ file, href }: FileNameProps) => {
  const objectUrl = useObjectUrl(href ? undefined : file);
  const url = href ?? objectUrl;

  if (!url) {
    return <span className="file-name">{file.name}</span>;
  }

  return (
    <Link
      className="file-name"
      href={url}
      /* Only force a download for the generated object URL. When the consumer
         supplies `href`, the server decides via `Content-Disposition`. */
      download={href ? undefined : file.name}
    >
      {file.name}
    </Link>
  );
};
