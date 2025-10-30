import {
  Table as DigdirTable,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
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
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
};
export type {
  TableBodyProps,
  TableCellProps,
  TableFootProps,
  TableHeadProps,
  TableHeaderCellProps,
  TableProps,
  TableRowProps,
} from '@digdir/designsystemet-react';
