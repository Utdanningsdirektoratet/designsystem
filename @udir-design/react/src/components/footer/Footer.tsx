import { forwardRef, HTMLAttributes } from 'react';
import { Link } from '../link/Link';
import logo from '../../../assets/img/logo.svg';
import cl from 'clsx/lite';

export type FooterProps = HTMLAttributes<HTMLDivElement>;

export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { children, className, ...rest },
  ref,
) {
  return (
    <footer className={cl(`uds-footer`, className)} ref={ref} {...rest}>
      <div>
        {children}
        <Link href="https://udir.no" className="logo">
          <img src={logo} alt="Utdanningsdirektoratet" />
        </Link>
      </div>
    </footer>
  );
});
