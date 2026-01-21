import './progressBar.css';
import '@u-elements/u-progress';
import { type Size } from '@digdir/designsystemet-react';
import type { Color } from '@digdir/designsystemet-types';
import { UHTMLProgressShadowRoot } from '@u-elements/u-progress';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ProgressBarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * Changes size for descendant Designsystemet components.
   * Select from predefined sizes.
   */
  'data-size'?: Size;
  /**
   * Changes color of the bar and background
   */
  'data-color'?: Color;
  /**
   * Total number of steps in the process
   */
  max: number;
  /**
   * Current step in the process
   */
  value: number;
  /**
   * Text to display before the current step number
   */
  prefix?: string;
  /**
   * Show the progress as a percentage instead of step numbers
   * @default false
   */
  percentage?: boolean;
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    { className, max, value, prefix = '', percentage = false, ...rest },
    ref,
  ) {
    const progress = ((value / max) * 100).toFixed(0);
    const progressText = percentage ? `${progress}%` : `${value} av ${max}`;
    return (
      <div className={cl(`uds-progressBar`, className)} ref={ref} {...rest}>
        <span>{`${prefix} ${progressText}`}</span>
        <u-progress
          value={value}
          max={max}
          aria-hidden="true"
          // Ensure shadow dom is server rendered
          // see https://u-elements.github.io/u-elements/elements/u-progress#server-side-rendering
          dangerouslySetInnerHTML={{ __html: UHTMLProgressShadowRoot }}
        />
      </div>
    );
  },
);
