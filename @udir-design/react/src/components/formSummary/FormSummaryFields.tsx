import { type HTMLAttributes, type ReactNode } from 'react';
import { forwardRef } from 'react';
import './formSummary.css';

export type FormSummaryFieldsProps = HTMLAttributes<HTMLDListElement> & {
  /**
   * One or more `FormSummary.Field` components.
   */
  children: ReactNode;
};

export const FormSummaryFields = forwardRef<
  HTMLDListElement,
  FormSummaryFieldsProps
>(function FormSummaryFields({ ...rest }, ref) {
  return <dl ref={ref} {...rest} />;
});
