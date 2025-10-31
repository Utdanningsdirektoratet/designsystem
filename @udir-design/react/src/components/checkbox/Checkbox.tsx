import {
  Checkbox as DigdirCheckbox,
  type CheckboxProps as DigdirCheckboxProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type CheckboxProps = Omit<DigdirCheckboxProps, 'data-color'>;

const Checkbox = DigdirCheckbox as ForwardRefExoticComponent<
  CheckboxProps & RefAttributes<ComponentRef<typeof DigdirCheckbox>>
>;

export type { CheckboxProps };
export { Checkbox };
