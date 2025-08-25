import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import logo from '../../../public/logo.svg';
import { Link } from '../beta';

export type FooterProps = HTMLAttributes<HTMLDivElement>;

export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { children, className, ...rest },
  ref,
) {
  return (
    <footer className={cl(`uds-footer`, className)} ref={ref} {...rest}>
      {children}
      <div className="logo-box">
        <Link href="https://udir.no">
          <img
            src={logo}
            className="logo"
            alt="Logo for utdanningsdirektoratet"
          />
        </Link>
      </div>
    </footer>
  );
});
