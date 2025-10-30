import {
  Button as DigdirButton,
  type ButtonProps as DigdirButtonProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import './button.css';

type ButtonProps = Omit<DigdirButtonProps, 'data-color'> & {
  /**
   * Change the color scheme of the button
   */
  'data-color'?: 'neutral' | 'danger';
};

const Button = DigdirButton as ForwardRefExoticComponent<
  ButtonProps & RefAttributes<ComponentRef<typeof DigdirButton>>
>;

export { Button };
export type { ButtonProps };
