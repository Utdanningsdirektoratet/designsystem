import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import mainLogoDark from '../../../assets/img/udir-main-logo-dark-mode.svg';
import mainLogoLight from '../../../assets/img/udir-main-logo.svg';
import './logo.css';

export type LogoProps = HTMLAttributes<HTMLElement> & {
  /**
   * Changes size for descendant Designsystemet components.
   * Select from predefined sizes.
   */
  'data-size'?: Size;
  /**
   * Changes height of the logo, the width
   * scales accordingly
   * @default 'var(--ds-size-12)'
   */
  size?: string;
  /**
   * Changes padding on all sides
   * of the logo
   * @default 'var(--ds-size-5)'
   */
  padding?: string;
};

export const Logo = forwardRef<HTMLElement, LogoProps>(function Header({
  className,
  size,
  padding,
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
      <img src={mainLogoLight} alt={logoAlt} />
      <img src={mainLogoDark} alt={logoAlt} />
    </div>
  );
});
