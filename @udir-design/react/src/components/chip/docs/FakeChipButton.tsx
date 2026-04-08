import type { FunctionComponent } from 'react';
import type { ChipButtonProps } from '../Chip';

/**
 * This component only exists to add relevant html props for ChipButton
 */
export const ChipButton: FunctionComponent<
  ChipButtonProps & {
    onClick?: ChipButtonProps['onClick'];
  }
> = () => null;
