import type { FunctionComponent, ReactNode } from 'react';
import type { TableFootProps } from '..';

/**
 * This component only exists to add relevant html props for TableFoot
 */
export const TableFoot: FunctionComponent<
  TableFootProps & {
    /** Should be one or more Table.Row elements */
    children?: ReactNode;
  }
> = () => null;
