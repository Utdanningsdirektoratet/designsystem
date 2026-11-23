import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import './demoBanner.css';

export type DemoBannerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * @default "Dette er en demo"
   */
  text?: string;
};

export const DemoBanner = forwardRef<HTMLDivElement, DemoBannerProps>(
  function DemoBanner({ text, children, className, ...rest }, forwardedRef) {
    const ref = useStyleProperties(forwardedRef, {
      // A CSS string, for `content`
      '--udsc-demo-banner-text': text ? JSON.stringify(text) : undefined,
    });

    return (
      <div className={cl(`uds-demo-banner`, className)} ref={ref} {...rest}>
        {children}
        <div aria-hidden />
      </div>
    );
  },
);
