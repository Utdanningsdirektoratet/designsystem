import {
  Input as DigdirInput,
  type InputProps as DigdirInputProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import './input.css';

type InputProps = Omit<DigdirInputProps, 'data-color'>;

const Input = DigdirInput as ForwardRefExoticComponent<
  InputProps & RefAttributes<ComponentRef<typeof DigdirInput>>
>;

export type { InputProps };
export { Input };
