import type { FunctionComponent } from 'react';
import type { SelectProps } from '../Select';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Select directly :(
 */
export const Select: FunctionComponent<
  SelectProps & {
    'aria-invalid'?: SelectProps['aria-invalid'];
    'aria-readonly'?: SelectProps['aria-readonly'];
  }
> = () => null;
