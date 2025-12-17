import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FormNavigationState } from './FormNavigation';

export type FormNavigationStepProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  /**
   * The current state of the FormNavigation.Step component.
   */
  state?: FormNavigationState;
  /**
   * The variant style of the FormNavigation.Step component. Only affects visual styling.
   */
  variant?: 'info' | 'summary' | 'submission' | 'confirmation' | 'default';
  /**
   * The label shown for this step
   */
  children: string;
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
