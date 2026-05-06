import type { FunctionComponent, ReactNode } from 'react';
import type { TableProps } from '..';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Table directly :(
 */
export const Table: FunctionComponent<
  TableProps & {
    /** Should be one or more Table.Head, Table.Body or Table.Foot elements */
    children?: ReactNode;
  }
> = () => null;
