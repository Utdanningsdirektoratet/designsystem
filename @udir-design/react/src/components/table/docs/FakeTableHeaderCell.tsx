import type { FunctionComponent, ReactNode } from 'react';
import type { TableHeaderCellProps } from '..';

/**
 * This component only exists to add relevant html props for TableHeaderCell
 */
export const TableHeaderCell: FunctionComponent<
  TableHeaderCellProps & {
    /** The content of the header cell */
    children?: ReactNode;
  }
> = () => null;
