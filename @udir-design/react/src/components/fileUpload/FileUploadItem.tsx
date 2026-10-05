import { ValidationMessage } from '@digdir/designsystemet-react';
import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { flushSync } from 'react-dom';
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
   * has checked it after the upload. Ignored when there is an `error`.
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
    const rowRef = useRef<HTMLLIElement>(null);
    useImperativeHandle(ref, () => rowRef.current as HTMLLIElement);

    /* A file that is there when the page loads has its loading text read
       along with the rest of the page, so it is not announced until it
       changes or loading ends. A file the user just added is announced. */
    const [justAdded] = useState(justAttached);
    const quietLoading = useRef(
      loading && !justAdded ? { text: loadingText } : undefined,
    );

    /* The loading text says what is happening to the file, and WCAG counts
       such progress as a status message (4.1.3), which has to be announced
       without the file having focus. Set a moment after loading starts, by
       which time a row whose focused button was hidden has given focus to
       its file name and loading text, see below: they are read then, and
       announcing them as well would say them twice. Read from css when it is
       the default, so it follows the `lang` the row is in. Emptied again
       after a while, since NVDA otherwise read the loading text twice when
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
        setLoadingStatus(loadingText || defaultLoadingText(region));
        timer = window.setTimeout(() => setLoadingStatus(undefined), 5000);
      });
      return () => {
        clearTimeout(timer);
        setLoadingStatus(undefined);
      };
    }, [loading, loadingText]);

    /* Takes focus while loading hides the button that had it, see
       `waitInRow`: the file name and loading text in one element, visually
       hidden. Not the row itself, named by them: VoiceOver on iOS did not
       read the name of a list item, only the file name inside it, and the
       loading text was never heard. Hidden until it takes focus, and again
       when focus leaves, so browsing the row does not find the file name and
       loading text twice. Read from css when it is the default, so it follows
       the `lang` the row is in.

       When loading ends while it has focus, it keeps its text until focus
       moves on, which it does 200 ms later, to the button that comes back.
       NVDA in Firefox read the row by its new content, buttons and all, when
       the element with focus changed its name, and also when focus waited
       long enough. Let go after a moment as well, in case no button comes
       back to take focus; the row takes focus then, rather than the page as
       the element goes. */
    const focusRef = useRef<HTMLSpanElement>(null);
    const [focusText, setFocusText] = useState<string>();
    useLayoutEffect(() => {
      const row = rowRef.current;
      const target = focusRef.current;
      if (loading) {
        if (row) setFocusText(loadingText || defaultLoadingText(row));
        return;
      }
      if (!target || document.activeElement !== target) {
        setFocusText(undefined);
        return;
      }
      /* Let go as focus leaves, rather than in a render React schedules for
         later, so it is gone by the time focus lands on the button. */
      const onFocusOut = () => flushSync(() => setFocusText(undefined));
      target.addEventListener('focusout', onFocusOut, { once: true });
      const timer = setTimeout(() => {
        if (row && document.activeElement === target) {
          /* Only a tabindex we added is ours to take away again. */
          if (!row.hasAttribute('tabindex')) {
            row.tabIndex = -1;
            row.addEventListener(
              'blur',
              () => row.removeAttribute('tabindex'),
              {
                once: true,
              },
            );
          }
          row.focus();
        }
        setFocusText(undefined);
      }, 1000);
      return () => {
        target.removeEventListener('focusout', onFocusOut);
        clearTimeout(timer);
      };
    }, [loading, loadingText]);

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
        ref={rowRef}
        {...rest}
      >
        {focusText && (
          <span
            ref={focusRef}
            className="uds-file-upload__item-focus"
            tabIndex={-1}
            hidden
            onBlur={(event) => {
              event.currentTarget.hidden = true;
            }}
          >
            {`${file.name} ${focusText}`}
          </span>
        )}
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
        {/* Announces what happens to a file that is already listed: the
            loading text, see above, and a verdict such as the one a server
            reports once the upload finishes. An item that is added with a
            message cannot announce it: the region and the message arrive
            together, and a region only announces what reaches it after it is
            in the dom. `aria-atomic` keeps the file name in the announcement
            when one text replaces another, where only the text itself would
            otherwise be new. */}
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
              {/* oxlint-disable-next-line jsx-a11y/aria-role -- `text` is WebKit's own role, not ARIA's: without it, VoiceOver on iOS read the hidden name and the message as two stops. */}
              <span role="text">
                <span className="uds-file-upload__hidden-text">{`${file.name}: `}</span>
                {message}
              </span>
            </ValidationMessage>
          )}
        </div>
      </li>
    );
  },
);
FileUploadItem.displayName = 'FileUpload.Item';

/** The default loading text, from css so it follows the `lang` of `element`. */
function defaultLoadingText(element: Element) {
  return getComputedStyle(element)
    .getPropertyValue('--udsc-fileUpload-loading-text')
    .trim()
    .replace(/^["']|["']$/g, '');
}

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
  file: FileMeta;
  href?: string;
  invalid?: boolean;
}

export const FileName = ({ file, href, invalid }: FileNameProps) => {
  /* Announce that the file is invalid as part of file name, so a row with
     an error can be told apart while browsing the list without stepping
     through the rest of the row to reach the message. Text in css */
  const marker = invalid ? (
    <span className="uds-file-upload__hidden-text uds-file-upload__item-invalid" />
  ) : null;

  if (href) {
    return (
      <Link className="uds-file-upload__item-name" href={href}>
        {file.name}
        {marker}
      </Link>
    );
  }

  if (!marker) {
    return <span className="uds-file-upload__item-name">{file.name}</span>;
  }

  /* A `div`: in a `span`, which Chrome leaves out of its tree, Chrome on
     Android gave the name and the marker a node each, and TalkBack read
     "ugyldig" as a stop of its own. */
  return (
    // oxlint-disable-next-line jsx-a11y/aria-role -- `text` is WebKit's own role, not ARIA's: without it, VoiceOver on iOS read the name, the comma and "ugyldig" as three stops. A link is read as one stop already.
    <div className="uds-file-upload__item-name" role="text">
      {file.name}
      {marker}
    </div>
  );
};
