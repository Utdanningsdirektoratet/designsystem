import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  CheckmarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TasklistIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons';
import type { FormNavigationState } from '../FormNavigation';
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
};

export const FormNavigationGroup = forwardRef<
  HTMLDetailsElement,
  FormNavigationGroupProps
>(function FormNavigationGroup(
  { title, state = 'idle', children, className, open = true, ...rest },
  ref,
) {
  return (
    <u-details
      data-state={state}
      class={cl('uds-form-navigation__group', className)}
      ref={ref}
      open={open}
      {...rest}
    >
      <u-summary>
        <TasklistIcon aria-hidden />
        <CheckmarkCircleIcon aria-hidden />
        <XMarkOctagonIcon aria-hidden />
        {title}
        <ChevronDownIcon aria-hidden />
        <ChevronUpIcon aria-hidden />
      </u-summary>
      {children}
    </u-details>
  );
});
