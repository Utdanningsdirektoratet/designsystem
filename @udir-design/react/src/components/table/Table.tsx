import {
  Table as DigdirTable,
  type TableProps as DigdirTableProps,
} from '@digdir/designsystemet-react';
import { forwardRef, ForwardRefExoticComponent } from 'react';
import './table.css';

export type TableProps = DigdirTableProps & {
  /**
   * Will make the column headers tinted
   * @default false
   */
  tintedColumnHeader?: boolean;
  /**
   * Will make the row headers tinted
   * @default false
   */
  tintedRowHeader?: boolean;
};

export const Table: ForwardRefExoticComponent<TableProps> = forwardRef<
  HTMLTableElement,
  TableProps
>(function Table(
  { children, tintedColumnHeader = false, tintedRowHeader = false, ...rest },
  ref,
) {
  return (
    <DigdirTable
      {...rest}
      ref={ref}
      data-tinted-column-header={tintedColumnHeader || undefined}
      data-tinted-row-header={tintedRowHeader || undefined}
    >
      {children}
    </DigdirTable>
  );
});
