import cl from 'clsx/lite';
import { forwardRef } from 'react';
import symbolLogoDark from '../../../assets/img/udir-circle-logo-dark-mode.svg';
import symbolLogoLight from '../../../assets/img/udir-circle-logo.svg';
import symbolPrideLogoDark from '../../../assets/img/udir-circle-pride-logo-dark-mode.svg';
import symbolPrideLogoLight from '../../../assets/img/udir-circle-pride-logo.svg';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import type { LogoProps } from './Logo';
import './logo.css';

export type LogoSymbolProps = Omit<LogoProps, 'padding'> & {
  /**
   * Changes padding on all sides
   * of the logo.
   * Applied after hydration, so server-rendered pages show the default until then. For a fixed
   * padding, set `--uds-logo-padding` in your CSS instead, on a class on the logo itself.
   * @default 'var(--ds-size-3)'
   */
  padding?: string;
  /**
   * Changes the logo variant. Options are `default` and `pride`.
   * @default 'default'
   */
  variant?: 'default' | 'pride';
};

export const LogoSymbol = forwardRef<HTMLDivElement, LogoSymbolProps>(
  function Header(
    { className, size, padding, variant = 'default', ...rest },
    forwardedRef,
  ) {
    const logoAlt = 'Utdanningsdirektoratet';
    const ref = useStyleProperties(forwardedRef, {
      '--uds-logo-size': size,
      '--uds-logo-padding': padding,
    });

    return (
      <div
        className={cl('uds-logo', 'uds-logo--symbol', className)}
        ref={ref}
        {...rest}
      >
        {/* oxlint-disable jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
        <img
          src={variant === 'pride' ? symbolPrideLogoLight : symbolLogoLight}
          alt={logoAlt}
          role="img"
        />
        <img
          src={variant === 'pride' ? symbolPrideLogoDark : symbolLogoDark}
          alt={logoAlt}
          role="img"
        />
        {/* oxlint-enable jsx-a11y/no-redundant-roles */}
      </div>
    );
  },
);
