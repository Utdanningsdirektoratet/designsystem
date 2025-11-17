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
};

export const Logo = forwardRef<HTMLElement, LogoProps>(function Header({
  className,
  ...rest
}) {
  const logoAlt = 'Utdanningsdirektoratet';

  return (
    <div className={cl('uds-logo', className)} {...rest}>
      <img src={mainLogoLight} alt={logoAlt} />
      <img src={mainLogoDark} alt={logoAlt} />
    </div>
  );
});
