import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import '@u-elements/u-details';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import './readmore.css';

export type ReadmoreProps = HTMLAttributes<HTMLDetailsElement> & {
  /**
   * Text to be displayed in the ReadMore summary
   */
  summary: string;
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  'data-size'?: Size;
  /**
   * Controls open-state.
   *
   * Using this removes automatic control of open-state
   *
   * @default undefined
   */
  open?: boolean;
  /**
   * Content for the collapsible section
   */
  children?: ReactNode;
};

/**
 * Readmore component
 *
 * @example
 * <Readmore summary="summary">
 *  Content
 * </Readmore>
 */
export const Readmore = forwardRef<HTMLDetailsElement, ReadmoreProps>(
  function Readmore({ className, summary, children, ...rest }, ref) {
    return (
      <u-details className={cl('uds-readmore', className)} ref={ref} {...rest}>
        <u-summary>{summary}</u-summary>
        <div>{children}</div>
      </u-details>
    );
  },
);
