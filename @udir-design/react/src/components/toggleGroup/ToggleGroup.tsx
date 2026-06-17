import {
  ToggleGroup as DigdirToggleGroup,
  type ToggleGroupProps as DigdirToggleGroupProps,
} from '@digdir/designsystemet-react';
import { forwardRef } from 'react';
import './togglegroup.css';

export type ToggleGroupProps = Omit<
  DigdirToggleGroupProps,
  'data-color' | 'data-toggle-group' | 'variant'
> & {
  /**
   * Specify which variant to use
   * @default secondary
   */
  variant?: 'primary' | 'secondary';
  'aria-label'?: string;
};

export const ToggleGroup = forwardRef<HTMLFieldSetElement, ToggleGroupProps>(
  function ToggleGroup(
    { variant = 'secondary', 'aria-label': ariaLabel, ...props },
    ref,
  ) {
    return (
      <DigdirToggleGroup
        {...props}
        variant={variant}
        data-toggle-group={ariaLabel} // temporary until Digdir supports aria-label directly
        ref={ref}
      />
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';
