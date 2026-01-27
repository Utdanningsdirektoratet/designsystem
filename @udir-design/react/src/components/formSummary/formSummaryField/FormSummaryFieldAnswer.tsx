import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ValidationMessage } from '../../typography/validationMessage/ValidationMessage';

export type FormSummaryFieldAnswerProps = HTMLAttributes<HTMLElement> & {
  /** Error message for field */
  error?: string;
};

export const FormSummaryFieldAnswer = forwardRef<
  HTMLParagraphElement,
  FormSummaryFieldAnswerProps
>(function FormSummaryFieldAnswer({ children, error, ...rest }, ref) {
  return (
    <dd ref={ref} {...rest}>
      {children}
      {!!error && <ValidationMessage>{error}</ValidationMessage>}
    </dd>
  );
});
