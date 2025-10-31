import {
  Radio as DigdirRadio,
  type RadioProps as DigdirRadioProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type RadioProps = Omit<DigdirRadioProps, 'data-color'>;

const Radio = DigdirRadio as ForwardRefExoticComponent<
  RadioProps & RefAttributes<ComponentRef<typeof DigdirRadio>>
>;

export type { RadioProps };
export { Radio };
