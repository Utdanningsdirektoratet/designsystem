import {
  ToggleGroup as DigdirToggleGroup,
  type ToggleGroupProps as DigdirToggleGroupProps,
} from '@digdir/designsystemet-react';
import { forwardRef } from 'react';
import './togglegroup.css';

// Digdir's deprecated optional data-toggle-group branch permits unnamed groups.
// Require exactly one supported accessible name instead.
type ToggleGroupAccessibleName =
  | {
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;
      'aria-labelledby': string;
    };

export type ToggleGroupProps = Omit<
  DigdirToggleGroupProps,
  | 'aria-label'
  | 'aria-labelledby'
  | 'data-color'
  | 'data-toggle-group'
  | 'variant'
> &
  ToggleGroupAccessibleName & {
    /**
     * Specify which variant to use.
     * @default secondary
     */
    variant?: 'primary' | 'secondary';
  };

export const ToggleGroup = forwardRef<HTMLFieldSetElement, ToggleGroupProps>(
  function ToggleGroup({ variant = 'secondary', ...props }, ref) {
    return <DigdirToggleGroup {...props} variant={variant} ref={ref} />;
  },
);

ToggleGroup.displayName = 'ToggleGroup';
