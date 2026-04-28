import cl from 'clsx/lite';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import './formSummary.css';
import type { CardProps } from '../card/Card';
import { Card } from '../card/Card';

export type FormSummaryProps = Omit<CardProps, 'variant' | 'asChild'>;

export const FormSummary: ForwardRefExoticComponent<
  FormSummaryProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, FormSummaryProps>(function FormSummary(
  { className, ...rest },
  ref,
) {
  return (
    <Card
      className={cl('uds-form-summary', className)}
      ref={ref}
      variant="tinted"
      {...rest}
    />
  );
});
