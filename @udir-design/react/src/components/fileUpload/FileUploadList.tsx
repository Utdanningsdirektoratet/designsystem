import { Tooltip } from '@digdir/designsystemet-react';
import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, MouseEvent } from 'react';
import { TrashIcon, XMarkOctagonFillIcon } from '@udir-design/icons';
import { Button } from '../button';
import { Card } from '../card';
import { Divider } from '../divider';
import { FileName, Icon, formatFileSize } from './FileUploadItem';

export interface FileUploadListItem {
  /**
   * Either a native File or file metadata.
   */
  file: File;
  /**
   * Error message relating to the item.
   */
  error?: string;
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
   * href to file location.
   */
  href?: string;
}

export interface FileUploadListProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'data-color'
> {
  'data-size'?: Size;
  /**
   * List of file items to display.
   */
  items: FileUploadListItem[];
  /**
   * Callback when the remove button is clicked.
   */
  onRemove: (file: File, event: MouseEvent<HTMLButtonElement>) => void;
}

export const FileUploadList = forwardRef<HTMLDivElement, FileUploadListProps>(
  (
    {
      items,
      onRemove,
      className,
      'data-size': size,
      ...rest
    }: FileUploadListProps,
    ref,
  ) => (
    <Card
      ref={ref}
      className={cl('uds-file-upload__list', className)}
      data-size={size}
      {...rest}
    >
      <ul>
        {items.map((item, index) => (
          <li
            key={item.file.name}
            className="uds-file-upload__list-item"
            aria-busy={item.loading || undefined}
          >
            {index > 0 && <Divider />}
            <div className="uds-file-upload__list-row">
              <div className="uds-file-upload__list-icon">
                <Icon
                  file={item.file}
                  showError={Boolean(item.error)}
                  loading={item.loading}
                />
              </div>
              <div className="uds-file-upload__list-content">
                <FileName file={item.file} href={item.href} />
                {!item.loading && (
                  <span className="uds-file-upload__list-size">
                    {formatFileSize(item.file)}
                  </span>
                )}
                {item.error && (
                  <span className="uds-file-upload__list-error">
                    <XMarkOctagonFillIcon aria-hidden />
                    {item.error}
                  </span>
                )}
              </div>
              {!item.loading && !item.readonly && (
                <Tooltip content="">
                  <Button
                    icon
                    onClick={(e) => onRemove(item.file, e)}
                    variant="tertiary"
                  >
                    <TrashIcon aria-hidden />
                  </Button>
                </Tooltip>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  ),
);
FileUploadList.displayName = 'FileUpload.List';
