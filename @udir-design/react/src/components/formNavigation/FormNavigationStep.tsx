import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FormNavigationState } from './FormNavigation';

export type FormNavigationStepProps = HTMLAttributes<HTMLButtonElement> & {
  /**
   * The current state of the FormNavigationStep component.
   */
  state?: FormNavigationState;
  /**
   * The variant style of the FormNavigationStep component. Only affects visual styling.
   */
  variant?: 'info' | 'summary' | 'submission' | 'confirmation' | 'default';
};

export const STEP_STATE_ATTRIBUTE = 'data-state';

export const FormNavigationStep = forwardRef<
  HTMLButtonElement,
  FormNavigationStepProps
>(function FormNavigationStep(
  { state = 'idle', children, variant = 'default', ...rest },
  ref,
) {
  return (
    <button
      className="uds-form-navigation__step"
      {...{ [STEP_STATE_ATTRIBUTE]: state }}
      data-variant={variant}
      aria-current={state === 'active' ? 'step' : undefined}
      aria-invalid={state === 'invalid' || undefined}
      ref={ref}
      {...rest}
    >
      <div />
      {children}
    </button>
  );
});
