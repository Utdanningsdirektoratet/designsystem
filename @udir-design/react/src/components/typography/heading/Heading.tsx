import {
  Heading as DigdirHeading,
  HeadingProps,
} from '@digdir/designsystemet-react';
import { forwardRef } from 'react';
import './heading.css';

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ children, id, ...rest }, ref) {
    return (
      <DigdirHeading
        {...rest}
        id={id}
        ref={ref}
        {...(id ? { tabIndex: -1 } : {})}
      >
        {children}
      </DigdirHeading>
    );
  },
);

export type { HeadingProps };
