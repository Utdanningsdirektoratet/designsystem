import {
  Table as DigdirTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableFoot,
} from '@digdir/designsystemet-react';
import { Table as TableRoot } from './Table';

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
  TableHead,
  TableHeaderCell,
  TableRow,
  TableFoot,
};
export type {
  TableProps,
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableHeaderCellProps,
  TableRowProps,
  TableFootProps,
} from '@digdir/designsystemet-react';
