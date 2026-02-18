import clsx from 'clsx/lite';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

export const FieldNecessitySummary = forwardRef<
  HTMLDivElement,
  Omit<HTMLProps<HTMLDivElement>, 'children'>
>(function FieldNecessity({ className, ...props }, ref) {
  return (
    <div
      className={clsx(className, 'uds-field-necessity-summary')}
      ref={ref}
      {...props}
    />
  );
});
