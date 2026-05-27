import {
  Radio as DigdirRadio,
  type RadioProps as DigdirRadioProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type RadioProps = Omit<
  DigdirRadioProps,
  'data-color' | 'data-indeterminate' | 'value'
> & {
  /**
   * Value of the `input` element
   */
  value?: string | number; // original type is `string | number | readonly string[]`
};

const Radio = DigdirRadio as ForwardRefExoticComponent<
  RadioProps & RefAttributes<ComponentRef<typeof DigdirRadio>>
>;

export type { RadioProps };
export { Radio };
