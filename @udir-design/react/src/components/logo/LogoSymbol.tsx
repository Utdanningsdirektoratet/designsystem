import cl from 'clsx/lite';
import { forwardRef } from 'react';
import symbolLogoDark from '../../../assets/img/udir-circle-logo-dark-mode.svg';
import symbolLogoLight from '../../../assets/img/udir-circle-logo.svg';
import type { LogoProps } from './Logo';
import './logo.css';

export type LogoSymbolProps = Omit<LogoProps, 'padding'> & {
  /**
   * Changes padding on all sides
   * of the logo
   * @default 'var(--ds-size-3)'
   */
  padding?: string;
};

export const LogoSymbol = forwardRef<HTMLDivElement, LogoSymbolProps>(
  function Header(
    { className, size, padding = 'var(--ds-size-3)', style, ...rest },
    ref,
  ) {
    const logoAlt = 'Utdanningsdirektoratet';

    return (
      <div
        className={cl('uds-logo', className)}
        ref={ref}
        {...rest}
        style={
          {
            '--uds-logo-size': size,
            '--uds-logo-padding': padding,
            ...style,
          } as React.CSSProperties
        }
      >
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
        <img src={symbolLogoLight} alt={logoAlt} role="img" />
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
        <img src={symbolLogoDark} alt={logoAlt} role="img" />
      </div>
    );
  },
);
