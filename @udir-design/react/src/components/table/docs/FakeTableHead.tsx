import type { FunctionComponent, ReactNode } from 'react';
import type { TableHeadProps } from '..';

/**
 * This component only exists to add relevant html props for TableHead
 */
export const TableHead: FunctionComponent<
  TableHeadProps & {
    /** Should be one or more Table.Row elements */
    children?: ReactNode;
  }
> = () => null;
