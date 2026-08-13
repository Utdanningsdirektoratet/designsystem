import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FormNavigationState } from './FormNavigation';

export type FormNavigationStepProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
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
      // TODO: Replace with the CSS-variable i18n pattern used by
      // FileUpload/FieldNecessity/DemoBanner/FormSummary/Suggestion
      // (see Språkstøtte.mdx). aria-invalid on role="button" is unsupported
      // in WAI-ARIA 1.2 but still announced by NVDA/JAWS/VoiceOver, so we keep
      // it until the migration lands. FormNavigationGroup's <summary> has the
      // same issue and should be migrated together.
      // eslint-disable-next-line jsx-a11y/role-supports-aria-props -- see TODO above
      aria-invalid={state === 'invalid' || undefined}
      ref={ref}
      {...rest}
    >
      <div />
      {children}
    </button>
  );
});
