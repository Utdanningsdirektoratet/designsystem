import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface DataListValueProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Label read by screen readers before the value, for example `Status`.
   * Replaces the column header a table would have. Not shown visually.
   *
   * Leave it out when the value explains itself, for example
   * `Innmeldt 13. november`.
   */
  label?: ReactNode;
  children: ReactNode;
}

export const DataListValue = forwardRef<HTMLSpanElement, DataListValueProps>(
  function DataListValue({ className, label, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={cl('uds-data-list__value', className)}
        {...rest}
      >
        {label != null && <span className="ds-sr-only">{label}: </span>}
        {children}
      </span>
    );
  },
);
