import cl from 'clsx/lite';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import './formSummary.css';
import type { CardProps } from '../card/Card';
import { Card } from '../card/Card';
import { Heading } from '../typography/heading/Heading';

export type FormSummaryProps = Omit<CardProps, 'variant' | 'asChild'> & {
  title: string;
  level?: 2 | 3;
};

export const FormSummary: ForwardRefExoticComponent<
  FormSummaryProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, FormSummaryProps>(function FormSummary(
  { className, children, title, level = 2, ...rest },
  ref,
) {
  return (
    <Card
      className={cl('uds-form-summary', className)}
      ref={ref}
      variant="tinted"
      {...rest}
    >
      {title && (
        <Card.Block>
          <Heading level={level}>{title}</Heading>
        </Card.Block>
      )}
      {children}
    </Card>
  );
});
