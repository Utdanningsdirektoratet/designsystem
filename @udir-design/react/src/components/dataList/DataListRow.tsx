import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface DataListRowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `DataList.Title` and/or `DataList.Value` components. They are shown on one
   * line, separated by `·`, and wrap when there is not enough room.
   */
  children: ReactNode;
}

export const DataListRow = forwardRef<HTMLDivElement, DataListRowProps>(
  function DataListRow({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cl('uds-data-list__row', className)}
        {...rest}
      />
    );
  },
);
