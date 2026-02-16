import { type HTMLAttributes, forwardRef } from 'react';

export type FormSummaryFieldLabelProps = HTMLAttributes<HTMLElement>;

export const FormSummaryFieldLabel = forwardRef<
  HTMLElement,
  FormSummaryFieldLabelProps
>(function FormSummaryFieldLabel({ ...rest }, ref) {
  return <dt ref={ref} {...rest} />;
});
