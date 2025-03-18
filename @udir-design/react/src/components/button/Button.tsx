import {
  Button as DigdirButton,
  type ButtonProps as DigdirButtonProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type ButtonProps = Omit<DigdirButtonProps, 'data-color'> & {
  /**
   * Change the color scheme of the button
   */
  'data-color'?: 'neutral' | 'danger';
};

const Button = DigdirButton as ForwardRefExoticComponent<ButtonProps>;

export { Button, ButtonProps };
