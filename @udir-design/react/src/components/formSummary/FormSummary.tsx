import cl from 'clsx/lite';
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import './formSummary.css';
import type { CardProps } from '../card';
import { Card } from '../card';
import { Heading } from '../typography/heading';

export type FormSummaryProps = Omit<
  CardProps,
  'variant' | 'asChild' | 'children'
> & {
  /**
   * Title of the summary.
   */
  title: string;
  /**
   * Heading level for the title.
   * @default 2
   */
  headingLevel?: 2 | 3;
  /**
   * One or more `FormSummary.Section` components
   */
  children: ReactNode;
};

export const FormSummary: ForwardRefExoticComponent<
  FormSummaryProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, FormSummaryProps>(function FormSummary(
  { className, children, title, headingLevel = 2, ...rest },
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
          <Heading level={headingLevel}>{title}</Heading>
        </Card.Block>
      )}
      {children}
    </Card>
  );
});
