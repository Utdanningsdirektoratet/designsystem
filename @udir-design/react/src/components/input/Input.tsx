import {
  Input as DigdirInput,
  type InputProps as DigdirInputProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type InputProps = Omit<DigdirInputProps, 'data-color'>;

const Input = DigdirInput as ForwardRefExoticComponent<
  InputProps & RefAttributes<ComponentRef<typeof DigdirInput>>
>;

export { Input };
export type { InputProps };
