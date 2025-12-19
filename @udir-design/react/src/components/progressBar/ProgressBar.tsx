import { type Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import './progressBar.css';
import '@u-elements/u-progress';
import { Label } from '../typography/label/Label';

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Changes size for descendant Designsystemet components.
   * Select from predefined sizes.
   */
  'data-size'?: Size;
  /**
   * Changes color of the bar and background
   */
  'data-color'?: 'neutral' | 'support1' | 'accent';
  /**
   * Total number of steps in
   * the process
   */
  max: number;
  /**
   * Current step in the
   * process
   */
  value: number;
  /**
   *
   */
  label?: string;
  /**
   * If the progress should be displayed
   * as steps or percentage
   * @default false
   */
  percentage?: boolean;
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    { className, max, value, label, style, percentage = false, ...rest },
    ref,
  ) {
    const progress = ((value / max) * 100).toFixed(0);
    const progressText = percentage ? `${progress}%` : `${value} av ${max}`;
    return (
      <div
        className={cl(`uds-progressBar`, className)}
        ref={ref}
        {...rest}
        style={
          {
            '--uds-progressBar-progress': progress + '%',
            ...style,
          } as React.CSSProperties
        }
      >
        <Label htmlFor="progressBar">
          {label} {progressText}
        </Label>
        <u-progress value={value} max={max} id="progressBar" />
      </div>
    );
  },
);
