import { type HTMLAttributes, forwardRef } from 'react';
import './formSummary.css';

export type FormSummaryFieldsProps = HTMLAttributes<HTMLDListElement>;

export const FormSummaryFields = forwardRef<
  HTMLDListElement,
  FormSummaryFieldsProps
>(function FormSummaryFields({ ...rest }, ref) {
  return <dl ref={ref} {...rest} />;
});
