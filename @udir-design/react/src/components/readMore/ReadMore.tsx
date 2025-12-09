import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import '@u-elements/u-details';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import './readMore.css';

export type ReadMoreProps = HTMLAttributes<HTMLDetailsElement> & {
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
   * @default undefined
   */
  open?: boolean;
  /**
   * Content for the collapsible section
   */
  children?: ReactNode;
};

/**
 * ReadMore component
 *
 * @example
 * <ReadMore summary="summary">
 *  Content
 * </ReadMore>
 */
export const ReadMore = forwardRef<HTMLDetailsElement, ReadMoreProps>(
  function ReadMore({ className, summary, children, ...rest }, ref) {
    return (
      <u-details className={cl('uds-readmore', className)} ref={ref} {...rest}>
        <u-summary>{summary}</u-summary>
        <div>{children}</div>
      </u-details>
    );
  },
);
