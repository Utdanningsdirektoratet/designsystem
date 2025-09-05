import {
  Table as DigdirTable,
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
import { Table as TableRoot, type TableProps } from './Table';

const Table = Object.assign(TableRoot, {
  Head: DigdirTable.Head,
  Body: DigdirTable.Body,
  Row: DigdirTable.Row,
  Cell: DigdirTable.Cell,
  HeaderCell: DigdirTable.HeaderCell,
  Foot: DigdirTable.Foot,
});

Table.displayName = 'Table';

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
