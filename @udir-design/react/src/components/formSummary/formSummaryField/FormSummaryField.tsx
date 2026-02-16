import cl from 'clsx/lite';
import { type HTMLAttributes, forwardRef } from 'react';

export type FormSummaryFieldProps = HTMLAttributes<HTMLDivElement>;

export const FormSummaryField = forwardRef<
  HTMLDivElement,
  FormSummaryFieldProps
>(function FormSummaryField({ className, ...rest }, ref) {
  return (
    <div
      className={cl('uds-form-summary__field', className)}
      ref={ref}
      {...rest}
    />
  );
});
