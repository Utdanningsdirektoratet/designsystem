import cl from 'clsx/lite';
import type { CSSProperties, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import './demoBanner.css';

export type DemoBannerProps = HTMLAttributes<HTMLDivElement> & {
  /*
   * @default "Dette er en demo"
   */
  text?: string;
};

export const DemoBanner = forwardRef<HTMLDivElement, DemoBannerProps>(
  function DemoBanner(
    { text = 'Dette er en demo', children, className, style, ...rest },
    ref,
  ) {
    return (
      <div
        className={cl(`uds-demo-banner`, className)}
        style={
          { ...style, '--udsc-demo-banner-text': `'${text}'` } as CSSProperties
        }
        ref={ref}
        {...rest}
      >
        {children}
        <div aria-hidden>{text}</div>
      </div>
    );
  },
);
