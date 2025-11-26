import cl from 'clsx/lite';
import { forwardRef } from 'react';
import symbolLogoDark from '../../../assets/img/udir-circle-logo-dark-mode.svg';
import symbolLogoLight from '../../../assets/img/udir-circle-logo.svg';
import type { LogoProps } from './Logo';
import './logo.css';

export type LogoSymbolProps = LogoProps;

export const LogoSymbol = forwardRef<HTMLElement, LogoSymbolProps>(
  function Header({ className, ...rest }) {
    const logoAlt = 'Utdanningsdirektoratet';

    return (
      <div className={cl('uds-logo', className)} {...rest}>
        <img src={symbolLogoLight} alt={logoAlt} />
        <img src={symbolLogoDark} alt={logoAlt} />
      </div>
    );
  },
);
