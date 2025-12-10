import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type FormSummaryFieldAnswerProps = HTMLAttributes<HTMLElement>;

export const FormSummaryFieldAnswer = forwardRef<
  HTMLParagraphElement,
  FormSummaryFieldAnswerProps
>(function FormSummaryFieldAnswer({ ...rest }, ref) {
  return <dd ref={ref} {...rest} />;
});
