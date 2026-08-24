import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export type FileUploadListVariant = 'default' | 'compact';

export interface FileUploadListProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  'data-color'
> {
  'data-size'?: Size;
  /**
   * Visual style of the list.
   *
   * - `default` shows every file as its own card.
   * - `compact` collapses the files into a single card, divided by lines.
   *   Useful when many files are uploaded.
   *
   * @default 'default'
   */
  variant?: FileUploadListVariant;
  /**
   * One or more `FileUpload.Item` components.
   */
  children: ReactNode;
}

export const FileUploadList = forwardRef<HTMLUListElement, FileUploadListProps>(
  function FileUploadList(
    {
      variant = 'default',
      className,
      'data-size': size,
      ...rest
    }: FileUploadListProps,
    ref,
  ) {
    return (
      <ul
        ref={ref}
        /* WebKit only exposes a list if it renders visible markers, has an
           explicit role, or sits inside <nav>. None apply here: `list-style:
           none` removes the markers, and the items are `display: block` (via
           `.ds-card`), which stops WebKit from creating list item markers at
           all. So this role is not redundant, but required, and removing
           `list-style: none` would not be an alternative fix.
           Confirmed with VoiceOver in Safari. See `determineListRoleWithCleanChildren`:
           https://github.com/WebKit/WebKit/blob/32b2458357b3abec6f510df7d367e7d288dd2f99/Source/WebCore/accessibility/AccessibilityNodeObject.cpp#L432-L489 */
        // oxlint-disable-next-line jsx-a11y/no-redundant-roles
        role="list"
        className={cl('uds-file-upload__list', className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      />
    );
  },
);
FileUploadList.displayName = 'FileUpload.List';
