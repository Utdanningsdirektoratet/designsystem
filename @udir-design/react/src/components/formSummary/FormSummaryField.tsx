import cl from 'clsx/lite';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';

export type FormSummaryFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * Label for the field.
   */
  label: ReactNode;
  /**
   * Value for the field
   */
  value?: ReactNode;
  /**
   * Error message for field
   */
  error?: string;
};

export const FormSummaryField = forwardRef<
  HTMLDivElement,
  FormSummaryFieldProps
>(function FormSummaryField({ className, label, value, error, ...rest }, ref) {
  return (
    <div
      className={cl('uds-form-summary__field', className)}
      ref={ref}
      {...rest}
    >
      <dt>{label}</dt>
      <dd>
        <span>{value}</span>
        {!!error && <ValidationMessage>{error}</ValidationMessage>}
      </dd>
    </div>
  );
});
