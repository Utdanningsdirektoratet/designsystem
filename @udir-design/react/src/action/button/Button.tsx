import {
  Button as Digdir,
  type ButtonProps as DigdirProps,
} from '@digdir/designsystemet-react';
import { forwardRef } from 'react';

export type ButtonProps = {
  /**
   * Specify which variant to use
   * @default primary
   */
  variant?: DigdirProps['variant'];
} & Omit<DigdirProps, 'variant'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }: ButtonProps, ref) => (
    <Digdir ref={ref} variant={variant} {...props} />
  )
);

Button.displayName = 'Button';
