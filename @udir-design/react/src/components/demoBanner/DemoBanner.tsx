import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import './demoBanner.css';

export type DemoBannerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Applied after hydration, so server-rendered pages show the default until then. For a fixed
   * text, set `--udsc-demo-banner-text` in your CSS instead.
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
