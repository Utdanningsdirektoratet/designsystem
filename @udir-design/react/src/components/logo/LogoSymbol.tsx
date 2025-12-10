import cl from 'clsx/lite';
import { forwardRef } from 'react';
import symbolLogoDark from '../../../assets/img/udir-circle-logo-dark-mode.svg';
import symbolLogoLight from '../../../assets/img/udir-circle-logo.svg';
import type { LogoProps } from './Logo';
import './logo.css';

export type LogoSymbolProps = Omit<LogoProps, 'size' | 'padding'> & {
  /**
   * Changes width of the logo, the height
   * scales accordingly
   * @default 'var(--ds-size-12)'
   */
  size?: string;
  /**
   * Changes the padding on all sides
   * for the logo
   * @default 'var(--ds-size-3)'
   */
  padding?: string;
};

export const LogoSymbol = forwardRef<HTMLElement, LogoSymbolProps>(
  function Header({
    className,
    size = 'var(--ds-size-12)',
    padding = 'var(--ds-size-3)',
    style,
    ...rest
  }) {
    const logoAlt = 'Utdanningsdirektoratet';

    return (
      <div
        className={cl('uds-logo', className)}
        {...rest}
        style={
          {
            '--uds-logo-size': size,
            '--uds-logo-padding': padding,
            ...style,
          } as React.CSSProperties
        }
      >
        <img src={symbolLogoLight} alt={logoAlt} />
        <img src={symbolLogoDark} alt={logoAlt} />
      </div>
    );
  },
);
