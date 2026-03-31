import type { FunctionComponent } from 'react';
import type { SelectOptionProps } from '../Select';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Select directly :(
 */
export const SelectOption: FunctionComponent<
  SelectOptionProps & {
    /** Text for this option.  If omitted, the text from `children` is used. */
    label?: SelectOptionProps['label'];
    /** The value which this option represents. If omitted, the text from `children` is used. */
    value?: SelectOptionProps['value'];
    /** Text for this option. Can be omitted if both `label` and `value` is set. */
    children?: SelectOptionProps['children'];
  }
> = () => null;
