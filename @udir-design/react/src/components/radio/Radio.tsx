import {
  Radio as DigdirRadio,
  type RadioProps as DigdirRadioProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type RadioProps = Omit<DigdirRadioProps, 'data-color'>;

const Radio = DigdirRadio as ForwardRefExoticComponent<RadioProps>;

export { Radio, RadioProps };
