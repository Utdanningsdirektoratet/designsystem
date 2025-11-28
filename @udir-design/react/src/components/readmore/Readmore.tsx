import type { Size } from '@digdir/designsystemet-react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ReadmoreProps = HTMLAttributes<HTMLElement> & {
  'data-size'?: Size;
};

export const Readmore = forwardRef<HTMLDivElement, ReadmoreProps>(
  function TableOfContents({ className, ...rest }, ref) {
    return (
      <div className={className} ref={ref} {...rest}>
        Les mer
      </div>
    );
  },
);
