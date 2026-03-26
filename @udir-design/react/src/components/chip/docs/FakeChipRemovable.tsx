import type { FunctionComponent } from 'react';
import type { ChipRemovableProps } from '../Chip';

/**
 * This component only exists to add relevant html props for ChipRemovable
 */
export const ChipRemovable: FunctionComponent<
  ChipRemovableProps & {
    onClick?: ChipRemovableProps['onClick'];
  }
> = () => null;
