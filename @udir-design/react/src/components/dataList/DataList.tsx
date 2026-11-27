import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './dataList.css';

export interface DataListProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  'data-color'
> {
  'data-size'?: Size;
  /**
   * One or more `DataList.Item` components.
   */
  children: ReactNode;
}

export const DataList = forwardRef<HTMLUListElement, DataListProps>(
  function DataList({ className, ...rest }, ref) {
    return (
      <ul
        ref={ref}
        /* Required for WebKit to expose the list, since the items are grids and
           render no list markers. See the comment in `FileUploadList.tsx`. */
        // oxlint-disable-next-line jsx-a11y/no-redundant-roles
        role="list"
        className={cl('uds-data-list', className)}
        {...rest}
      />
    );
  },
);
