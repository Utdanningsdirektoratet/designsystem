import {
  Table as DigdirTable,
  type TableProps as DigdirTableProps,
  TableBody,
  type TableBodyProps,
  TableCell,
  type TableCellProps,
  TableHead,
  type TableHeadProps,
  TableHeaderCell,
  type TableHeaderCellProps,
  TableRow,
  type TableRowProps,
  TableFoot,
  type TableFootProps,
} from '@digdir/designsystemet-react';
import { forwardRef } from 'react';

type TableProps = DigdirTableProps & {
  tintedColumnHeader?: boolean;
  tintedRowHeader?: boolean;
};

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
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

const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
  Foot: TableFoot,
});

Table.displayName = 'Table';
Table.Head.displayName = 'Table.Head';
Table.Body.displayName = 'Table.Body';
Table.Row.displayName = 'Table.Row';
Table.Cell.displayName = 'Table.Cell';
Table.HeaderCell.displayName = 'Table.HeaderCell';
Table.Foot.displayName = 'Table.Foot';

export {
  Table,
  TableProps,
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
  TableHeaderCell,
  TableHeaderCellProps,
  TableRow,
  TableRowProps,
  TableFoot,
  TableFootProps,
};
