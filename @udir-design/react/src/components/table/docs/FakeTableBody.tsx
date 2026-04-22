import type { FunctionComponent, ReactNode } from 'react';
import type { TableBodyProps } from '..';

/**
 * This component only exists to add relevant html props for TableBody
 */
export const TableBody: FunctionComponent<
  TableBodyProps & {
    /** Should be one or more Table.Row elements */
    children?: ReactNode;
  }
> = () => null;
