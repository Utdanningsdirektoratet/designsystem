import {
  Table as DigdirTable,
  TableBody,
  type TableBodyProps,
  TableCell,
  type TableCellProps,
  TableFoot,
  type TableFootProps,
  TableHead,
  type TableHeadProps,
  TableHeaderCell,
  type TableHeaderCellProps,
  TableRow,
  type TableRowProps,
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
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableFoot,
  TableFootProps,
  TableHead,
  TableHeadProps,
  TableHeaderCell,
  TableHeaderCellProps,
  TableProps,
  TableRow,
  TableRowProps,
};
