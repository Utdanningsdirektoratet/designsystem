import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { CardBlockProps } from '../card/Card';
import { Card } from '../card/Card';

export type FormSummarySectionProps = CardBlockProps;

export const FormSummarySection = forwardRef<
  HTMLDivElement,
  FormSummarySectionProps
>(function FormSummarySection({ className, ...rest }, ref) {
  return (
    <Card.Block
      className={cl('uds-form-summary__section', className)}
      ref={ref}
      {...rest}
    />
  );
});
