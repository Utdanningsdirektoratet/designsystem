import type { FunctionComponent } from 'react';
import type { ChipCheckboxProps } from '../Chip';

/**
 * This component only exists to add relevant html props for ChipCheckbox
 */
export const ChipCheckbox: FunctionComponent<
  ChipCheckboxProps & {
    name?: ChipCheckboxProps['name'];
    checked?: ChipCheckboxProps['checked'];
    defaultChecked?: ChipCheckboxProps['defaultChecked'];
    value?: ChipCheckboxProps['value'];
    onChange?: ChipCheckboxProps['onChange'];
  }
> = () => null;
