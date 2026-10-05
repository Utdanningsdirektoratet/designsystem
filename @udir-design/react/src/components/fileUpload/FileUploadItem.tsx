import { ValidationMessage } from '@digdir/designsystemet-react';
import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
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
} from '@udir-design/icons';
import { Link } from '../link';
import { Spinner } from '../spinner';
import { FileUploadFileSize } from './FileUploadFileSize';
import { ItemButton } from './FileUploadItemButton';
import type { FileMeta } from './types';

export interface FileUploadItemProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  'data-color'
> {
  'data-size'?: Size;
  /**
   * Data shown with the file name: below it in the `default` list variant, inline in `compact`.
   * Falls back to showing the formatted file size using `FileUpload.FileSize` if not provided.
   * Set to `null` to hide it entirely.
   */
  description?: ReactNode;
  /**
   * Either a native File or file metadata.
   */
  file: FileMeta;
  /**
   * Error message relating to the item.
   */
  error?: string;
  /**
   * Message shown when the file has been accepted, for example once the server
   * has read it. Ignored when there is an `error`.
   */
  success?: string;
  /**
   * Callback for the delete button, which is shown when this is set.
   */
  onRemove?: (file: FileMeta, event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Buttons at the end of the row, such as `FileUpload.DownloadButton`. The
   * delete button comes after them, so it stays at the end of every row.
   *
   * Hidden while `loading`.
   */
  actions?: ReactNode;
  /**
   * Toggle loading state.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Text shown while `loading`, for when the file is being handled in some
   * other way than uploaded. Defaults to the text in
   * `--udsc-fileUpload-loading-text`.
   */
  loadingText?: string;
  /**
   * Hides the delete button. Has no effect on `actions`, so leave out what the
   * user should not do with the file.
   *
   * @default false
   */
  readonly?: boolean;
  /**
   * Address the user can open the file at, which makes the file name a link.
   * For a file without such an address, use `FileUpload.DownloadButton` in
   * `actions` instead.
   */
  href?: string;
}

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>(
  function FileUploadItem(
    {
      file,
      error,
      success,
      loading,
      loadingText,
      href,
      readonly = false,
      className,
      'data-size': size,
      description,
      onRemove,
      actions,
      ...rest
    }: FileUploadItemProps,
    ref,
  ) {
    // One slot, so a file that has been turned away says so rather than
    // claiming to be fine.
    const message = error ?? success;

    const deleteButton = onRemove && !readonly && (
      <ItemButton
        kind="delete"
        icon={<TrashIcon aria-hidden />}
        fileName={file.name}
        onClick={(e) => onRemove(file, e)}
      />
    );

    /* Composes Digdir's card class rather than the `Card` component, so the
       item stays a plain element without React-only behaviour. `FileUpload.List`
       restyles these cards in CSS to build the `compact` variant. */
    return (
      <li
        className={cl('ds-card', 'uds-file-upload__item', className)}
        data-invalid={Boolean(error) || undefined}
        data-valid={(!error && Boolean(success)) || undefined}
        aria-busy={Boolean(loading) || undefined}
        data-size={size}
        ref={ref}
        {...rest}
      >
        <div className="uds-file-upload__item-row">
          <div className="uds-file-upload__item-icon">
            <Icon file={file} showError={Boolean(error)} loading={loading} />
          </div>
          <div className="uds-file-upload__item-content">
            <FileName file={file} href={href} invalid={Boolean(error)} />
            <div className="uds-file-upload__item-description">
              {/* Default loading text in css, hooked onto the empty element. */}
              {loading
                ? loadingText
                : description !== null &&
                  (description ?? <FileUploadFileSize size={file.size} />)}
            </div>
          </div>
          {!loading && (Boolean(actions) || deleteButton) && (
            <div className="uds-file-upload__item-actions">
              {actions}
              {deleteButton}
            </div>
          )}
        </div>
        {/* Announces a verdict that arrives after the file is already listed,
            such as one the server reports once the upload finishes. An item
            that is added with a message cannot announce: the region and the
            message arrive together, and a region only announces what reaches
            it after it is in the dom. `aria-atomic` keeps the file name in the
            announcement when one message replaces another, where only the
            message itself would otherwise be new. */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="uds-file-upload__item-message"
        >
          {Boolean(message) && (
            /* `ValidationMessage` brings its own icon and colour per
               `data-color`, and places the icon on the first line. */
            <ValidationMessage data-color={error ? undefined : 'success'}>
              {/* The announcement is heard on its own, away from the file name
                  above it, so it has to carry the name itself. */}
              <span className="ds-sr-only">{`${file.name}: `}</span>
              {message}
            </ValidationMessage>
          )}
        </div>
      </li>
    );
  },
);
FileUploadItem.displayName = 'FileUpload.Item';

export function Icon({
  file,
  showError,
  loading,
}: {
  file: FileMeta;
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

interface FileNameProps {
  file: FileMeta;
  href?: string;
  invalid?: boolean;
}

export const FileName = ({ file, href, invalid }: FileNameProps) => {
  /* Announce that the file is invalid as part of file name, so a row with
     an error can be told apart while browsing the list without stepping
     through the rest of the row to reach the message. Text in css */
  const marker = invalid ? (
    <span className="ds-sr-only uds-file-upload__item-invalid" />
  ) : null;

  if (href) {
    return (
      <Link className="uds-file-upload__item-name" href={href}>
        {file.name}
        {marker}
      </Link>
    );
  }

  return (
    <span className="uds-file-upload__item-name">
      {file.name}
      {marker}
    </span>
  );
};
