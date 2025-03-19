import {
  Checkbox as DigdirCheckbox,
  type CheckboxProps as DigdirCheckboxProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type CheckboxProps = Omit<DigdirCheckboxProps, 'data-color'>;

const Checkbox = DigdirCheckbox as ForwardRefExoticComponent<CheckboxProps>;

export { Checkbox, CheckboxProps };
