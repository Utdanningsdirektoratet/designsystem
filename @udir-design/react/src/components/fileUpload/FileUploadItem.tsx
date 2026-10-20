import { ValidationMessage } from '@digdir/designsystemet-react';
import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
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
import { announceMessage } from './announce';
import { justAttached } from './attached';
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
    const id = useId();
    const nameId = `${id}-name`;
    const descriptionId = `${id}-description`;

    /* A file that is there when the page loads has its message and loading
       text read along with the rest of the page, so neither is announced: the
       message is in the region from the start, and the loading text stays
       quiet until it changes or loading ends. A file the user just added is
       announced, see below. */
    const [justAdded] = useState(justAttached);
    const quietLoading = useRef(
      loading && !justAdded ? { text: loadingText } : undefined,
    );

    /* The loading text says what is happening to the file, and WCAG counts
       such progress as a status message (4.1.3), which has to be announced
       without the file having focus. Set a moment after loading starts, by
       which time a row whose focused button was hidden has taken focus
       itself: it is read then, and announcing it as well would say it
       twice. Read from css when it is the default, so it follows the `lang`
       the row is in. Emptied again after a while, as the announcement of a
       removal is, since NVDA otherwise read the loading text twice when
       reading the page, first the visible one and then this one. */
    const regionRef = useRef<HTMLDivElement>(null);
    const [loadingStatus, setLoadingStatus] = useState<string>();
    useEffect(() => {
      const region = regionRef.current;
      if (!loading) quietLoading.current = undefined;
      if (!loading || !region) return;
      if (quietLoading.current) {
        if (quietLoading.current.text === loadingText) return;
        quietLoading.current = undefined;
      }
      let timer = window.setTimeout(() => {
        if (region.parentElement?.contains(document.activeElement)) return;
        setLoadingStatus(
          loadingText ||
            getComputedStyle(region)
              .getPropertyValue('--udsc-fileUpload-loading-text')
              .trim()
              .replace(/^["']|["']$/g, ''),
        );
        timer = window.setTimeout(() => setLoadingStatus(undefined), 5000);
      });
      return () => {
        clearTimeout(timer);
        setLoadingStatus(undefined);
      };
    }, [loading, loadingText]);

    /* The row's own region cannot announce a message that arrives with the
       row. It goes to the region for the whole page instead, which also
       waits long enough for VoiceOver in Safari, and puts files with the same
       message in one sentence. The message is read off the row's region,
       after the file name it starts with there, so one given as an element
       works too. */
    const [newFileName] = useState(() =>
      justAdded && Boolean(message) ? file.name : undefined,
    );
    useEffect(() => {
      const region = regionRef.current;
      const prefix = `${newFileName}: `;
      const text = region?.textContent;
      if (newFileName && region && text?.startsWith(prefix)) {
        announceMessage(newFileName, text.slice(prefix.length), region);
      }
    }, [newFileName]);

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
        /* While loading, the row is just its name and loading text, and takes
           focus when the button that had it is hidden. Named, it is read as
           that; unnamed, VoiceOver in Safari read only its first item. */
        aria-labelledby={loading ? `${nameId} ${descriptionId}` : undefined}
        data-size={size}
        ref={ref}
        {...rest}
      >
        <div className="uds-file-upload__item-row">
          <div className="uds-file-upload__item-icon">
            <Icon file={file} showError={Boolean(error)} loading={loading} />
          </div>
          <div className="uds-file-upload__item-content">
            <FileName
              id={nameId}
              file={file}
              href={href}
              invalid={Boolean(error)}
            />
            <div
              id={descriptionId}
              className="uds-file-upload__item-description"
            >
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
        {/* Announces what happens to a file that is already listed: its
            loading text, see above, and a verdict such as the one a server
            reports once the upload finishes. `aria-atomic` keeps the file name
            in the announcement when one text replaces another, where only the
            text itself would otherwise be new. */}
        <div
          ref={regionRef}
          aria-live="polite"
          aria-atomic="true"
          className="uds-file-upload__item-message"
        >
          {/* Checked against `loading` as well, so a verdict that arrives as
              loading ends replaces the text in the same render, rather than
              being announced together with it until the effect has run. */}
          {loading && loadingStatus && (
            <span className="ds-sr-only">{`${file.name}: ${loadingStatus}`}</span>
          )}
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

  /* Hidden, since the loading text says the same. */
  if (loading) {
    return <Spinner aria-hidden />;
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
  id: string;
  file: FileMeta;
  href?: string;
  invalid?: boolean;
}

export const FileName = ({ id, file, href, invalid }: FileNameProps) => {
  /* Announce that the file is invalid as part of file name, so a row with
     an error can be told apart while browsing the list without stepping
     through the rest of the row to reach the message. Text in css */
  const marker = invalid ? (
    <span className="ds-sr-only uds-file-upload__item-invalid" />
  ) : null;

  if (href) {
    return (
      <Link id={id} className="uds-file-upload__item-name" href={href}>
        {file.name}
        {marker}
      </Link>
    );
  }

  return (
    <span id={id} className="uds-file-upload__item-name">
      {file.name}
      {marker}
    </span>
  );
};
