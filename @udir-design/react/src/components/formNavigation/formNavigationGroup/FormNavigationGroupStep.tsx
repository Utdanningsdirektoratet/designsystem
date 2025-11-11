import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  CheckmarkCircleIcon,
  CircleFillIcon,
  CircleIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons';
import type { FormNavigationState } from '../FormNavigation';

export type FormNavigationGroupStepProps = HTMLAttributes<HTMLButtonElement> & {
  /**
   * Override state manually (usually not necessary).
   */
  state?: FormNavigationState;
};

export const FormNavigationGroupStep = forwardRef<
  HTMLButtonElement,
  FormNavigationGroupStepProps
>(({ children, state = 'idle', ...rest }, ref) => {
  return (
    <button data-state={state} ref={ref} {...rest}>
      <div>
        <CircleIcon aria-hidden />
        <CircleFillIcon aria-hidden />
        <CheckmarkCircleIcon aria-hidden />
        <XMarkOctagonIcon aria-hidden />
      </div>
      {children}
    </button>
  );
});
