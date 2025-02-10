import {
  Table,
  type TableProps,
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
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
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
};
