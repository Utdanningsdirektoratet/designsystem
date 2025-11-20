import clsx from 'clsx/lite';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

import './fieldNecessity.css';

export const FieldNecessity = forwardRef<
  HTMLSpanElement,
  Omit<HTMLProps<HTMLSpanElement>, 'children'>
>(function FieldNecessity({ className, ...props }, ref) {
  return (
    <span
      className={clsx(className, 'ds-field-necessity')}
      ref={ref}
      {...props}
    />
  );
});
