import {
  Input as DigdirInput,
  type InputProps as DigdirInputProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type InputProps = Omit<DigdirInputProps, 'data-color'>;

const Input = DigdirInput as ForwardRefExoticComponent<InputProps>;

export { Input, InputProps };
