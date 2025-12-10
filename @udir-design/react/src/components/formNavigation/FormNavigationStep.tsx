import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  CheckmarkCircleIcon,
  CircleFillIcon,
  CircleIcon,
  ClipboardCheckmarkFillIcon,
  ClipboardIcon,
  InformationSquareFillIcon,
  InformationSquareIcon,
  PaperplaneFillIcon,
  PaperplaneIcon,
  SealCheckmarkFillIcon,
  SealCheckmarkIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons';
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
      data-state={state}
      data-variant={variant}
      aria-current={state === 'active' ? 'step' : undefined}
      aria-invalid={state === 'invalid' || undefined}
      ref={ref}
      {...rest}
    >
      <div>
        <CircleIcon data-icon="idle" aria-hidden />
        <CircleFillIcon data-icon="active" aria-hidden />
        <CheckmarkCircleIcon data-icon="completed" aria-hidden />
        <XMarkOctagonIcon data-icon="invalid" aria-hidden />
        <InformationSquareIcon data-icon="info" aria-hidden />
        <InformationSquareFillIcon data-icon="info-active" aria-hidden />
        <ClipboardIcon data-icon="summary" aria-hidden />
        <ClipboardCheckmarkFillIcon data-icon="summary-active" aria-hidden />
        <PaperplaneIcon data-icon="submission" aria-hidden />
        <PaperplaneFillIcon data-icon="submission-active" aria-hidden />
        <SealCheckmarkIcon data-icon="confirmation" aria-hidden />
        <SealCheckmarkFillIcon data-icon="confirmation-active" aria-hidden />
      </div>
      {children}
    </button>
  );
});
