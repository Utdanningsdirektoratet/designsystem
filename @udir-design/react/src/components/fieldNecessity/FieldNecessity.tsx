import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx/lite';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

export type FieldNecessityProps = HTMLProps<HTMLDivElement> & {
  /**
   * The visual variant of the necessity tags
   *
   * @default 'default'
   */
  variant?: 'default' | 'outline';
  /**
   * Show "required" tags on required fields
   * @default true
   */
  showRequired?: boolean;
  /**
   * Show "optional" tags on optional fields
   * @default false
   */
  showOptional?: boolean;
  /**
   * Show summary instead of individual tags if all fields have the same necessity
   * @default true
   */
  showSummary?: boolean;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
};

export const FieldNecessityComponent = forwardRef<
  HTMLDivElement,
  FieldNecessityProps
>(function FieldNecessity(
  {
    className,
    variant,
    showRequired = true,
    showOptional = false,
    showSummary = true,
    asChild,
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : 'div';
  return (
    <Component
      className={clsx(className, 'uds-field-necessity')}
      ref={ref}
      data-variant={variant}
      data-show-required={showRequired}
      data-show-optional={showOptional}
      data-show-summary={showSummary}
      {...props}
    />
  );
});
