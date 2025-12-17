import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FormNavigationState } from './FormNavigation';
import '@u-elements/u-details';

export type FormNavigationGroupProps = HTMLAttributes<HTMLDetailsElement> & {
  /**
   * The title to be displayed in the FormNavigationGroup component.
   */
  title: string;
  /**
   * The current state of the FormNavigationGroup component.
   */
  state?: Exclude<FormNavigationState, 'active'>;
  /**
   * Whether the FormNavigationGroup is open or closed
   */
  open?: boolean;
  /**
   * The label of the active step inside the group. Used for accessibility and display when group is collapsed.
   */
  activeStepLabel?: string;
};

export const FormNavigationGroup = forwardRef<
  HTMLDetailsElement,
  FormNavigationGroupProps
>(function FormNavigationGroup(
  {
    title,
    state = 'idle',
    children,
    className,
    open = true,
    activeStepLabel,
    ...rest
  },
  ref,
) {
  return (
    <u-details
      data-state={state}
      class={cl('uds-form-navigation__group', className)}
      ref={ref}
      open={open}
      data-active-step-label={activeStepLabel}
      {...rest}
    >
      <u-summary aria-invalid={state === 'invalid' || undefined}>
        <span>{title}</span>
      </u-summary>
      {children}
    </u-details>
  );
});
