import './progressBar.css';
import '@u-elements/u-progress';
import { type Size } from '@digdir/designsystemet-react';
import type { Color } from '@digdir/designsystemet-types';
import { UHTMLProgressShadowRoot } from '@u-elements/u-progress';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { Label } from '../typography/label/Label';

export type ProgressBarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'role'
> & {
  label?: string;
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
   * Format the progress text with `value`, `max` and `percentage` as arguments: `progressText: ({ value, max, percentage }) => \`Steg ${value} av ${max}\``
   */
  progressText?: (args: {
    value: number;
    max: number;
    percentage: number;
  }) => string;
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    {
      className,
      max,
      value,
      progressText,
      id: explicitId,
      label,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) {
    const fallbackId = useId();
    const id = explicitId ?? fallbackId;
    const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
    const text =
      progressText?.({ value, max, percentage }) ?? `${value} av ${max}`;
    return (
      <div className={cl(`uds-progressBar`, className)} ref={ref} {...rest}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div aria-hidden="true">{text}</div>
        <u-progress
          id={id}
          value={value}
          max={max}
          aria-label={ariaLabel}
          aria-valuetext={text}
          // Ensure shadow dom is server rendered
          // see https://u-elements.github.io/u-elements/elements/u-progress#server-side-rendering
          dangerouslySetInnerHTML={{ __html: UHTMLProgressShadowRoot }}
        />
      </div>
    );
  },
);
