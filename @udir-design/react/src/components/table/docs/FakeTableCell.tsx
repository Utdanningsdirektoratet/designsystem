import type { FunctionComponent, ReactNode } from 'react';
import type { TableCellProps } from '..';

/**
 * This component only exists to add relevant html props for TableCell
 */
export const TableCell: FunctionComponent<
  TableCellProps & {
    /** The content of the cell */
    children?: ReactNode;
  }
> = () => null;
