import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface DataListAsideProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content placed at the end of the item, for example an id or action
   * buttons. Wrap values in `DataList.Value` with a `label`, so screen readers
   * know what they are.
   */
  children: ReactNode;
}

export const DataListAside = forwardRef<HTMLDivElement, DataListAsideProps>(
  function DataListAside({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cl('uds-data-list__aside', className)}
        {...rest}
      />
    );
  },
);
