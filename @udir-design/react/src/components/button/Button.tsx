import {
  Button as DigdirButton,
  type ButtonProps as DigdirButtonProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import './button.css';

type ButtonProps = Omit<DigdirButtonProps, 'data-color'> & {
  onClick?: DigdirButtonProps['onClick'];
  /**
   * The content of the button
   */
  children?: ReactNode;
  /**
   * Disable the button. Usually not recommended.
   */
  disabled?: DigdirButtonProps['disabled'];
  /**
   * Change the color scheme of the button
   */
  'data-color'?: 'neutral' | 'danger';
};

const Button = DigdirButton as ForwardRefExoticComponent<
  ButtonProps & RefAttributes<ComponentRef<typeof DigdirButton>>
>;

export type { ButtonProps };
export { Button };
