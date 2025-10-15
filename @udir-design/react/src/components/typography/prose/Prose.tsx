import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import './prose.css';

export type ProseProps = HTMLAttributes<HTMLDivElement>;

/**
 * Use `Prose` to render elements
 * with a preset spacing grid .
 *
 * @example
 * <Prose>
 *  <Heading>Title</Heading>
 *  <Paragraph>Ingress</Paragraph>
 * </Prose>
 */
export const Prose = forwardRef<HTMLDivElement, ProseProps>(function Prose(
  { children, className, ...rest },
  ref,
) {
  return (
    <div className={cl(`uds-prose`, className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});
