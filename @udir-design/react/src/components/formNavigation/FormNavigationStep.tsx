import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FormNavigationState } from './FormNavigation';

export type FormNavigationStepProps = HTMLAttributes<HTMLButtonElement> & {
  /**
   * The current state of the FormNavigationStep component.
   */
  state?: FormNavigationState;
};

export const FormNavigationStep = forwardRef<
  HTMLButtonElement,
  FormNavigationStepProps
>(function FormNavigationStep({ state = 'idle', className, ...rest }, ref) {
  return (
    <button
      data-state={state}
      className={cl('uds-form-navigation__step', className)}
      ref={ref}
      {...rest}
    />
  );
});
