import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  CheckmarkCircleFillIcon,
  CheckmarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TasklistFillIcon,
  TasklistIcon,
  XMarkOctagonFillIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons';
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
        <TasklistIcon data-icon="group-idle" aria-hidden />
        <TasklistFillIcon data-icon="group-active" aria-hidden />
        <CheckmarkCircleIcon data-icon="group-completed" aria-hidden />
        <CheckmarkCircleFillIcon
          data-icon="group-completed-active"
          aria-hidden
        />
        <XMarkOctagonIcon data-icon="group-invalid" aria-hidden />
        <XMarkOctagonFillIcon data-icon="group-invalid-active" aria-hidden />
        <span>{title}</span>
        <ChevronDownIcon data-icon="chevron-down" aria-hidden />
        <ChevronUpIcon data-icon="chevron-up" aria-hidden />
      </u-summary>
      {children}
    </u-details>
  );
});
