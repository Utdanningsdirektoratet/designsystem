import {
  Heading as DigdirHeading,
  type HeadingProps as DigdirHeadingProps,
} from '@digdir/designsystemet-react';
import { forwardRef } from 'react';

export type HeadingProps = DigdirHeadingProps & {
  /**
   * Add to a header if you want
   * usePopulateToc() to ignore it
   */
  'data-toc-ignore'?: boolean;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ children, ...rest }, ref) {
    return (
      <DigdirHeading {...rest} ref={ref}>
        {children}
      </DigdirHeading>
    );
  },
);

Heading.displayName = 'Heading';
