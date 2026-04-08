import type { FunctionComponent } from 'react';
import type { ChipRadioProps } from '../Chip';

/**
 * This component only exists to add relevant html props for ChipRadio
 */
export const ChipRadio: FunctionComponent<
  ChipRadioProps & {
    name?: ChipRadioProps['name'];
    checked?: ChipRadioProps['checked'];
    defaultChecked?: ChipRadioProps['defaultChecked'];
    value?: ChipRadioProps['value'];
    onChange?: ChipRadioProps['onChange'];
  }
> = () => null;
