import clsx from 'clsx/lite';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

import './fieldNecessitySummary.css';

export const FieldNecessitySummary = forwardRef<
  HTMLSpanElement,
  Omit<HTMLProps<HTMLSpanElement>, 'children'>
>(function FieldNecessity({ className, ...props }, ref) {
  return (
    <span
      className={clsx(className, 'ds-field-necessity-summary')}
      ref={ref}
      {...props}
    />
  );
});
