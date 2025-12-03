import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import './formNavigation.css';

export type FormNavigationProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  'data-size'?: Size;
};
export type FormNavigationState = 'idle' | 'active' | 'completed' | 'invalid';

export const FormNavigation = forwardRef<HTMLDivElement, FormNavigationProps>(
  function FormNavigation({ className, ...rest }, ref) {
    return (
      <div
        className={cl('uds-form-navigation', className)}
        ref={ref}
        {...rest}
      />
    );
  },
);
