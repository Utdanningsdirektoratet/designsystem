import type { FunctionComponent, ReactNode } from 'react';
import type { TableRowProps } from '..';

/**
 * This component only exists to add relevant html props for TableRow
 */
export const TableRow: FunctionComponent<
  TableRowProps & {
    /** Should be one or more Table.Cell or Table.HeaderCell elements */
    children?: ReactNode;
  }
> = () => null;
