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
      <div>
        {children}
        <Link href="https://udir.no" className="logo">
          <img src={logo} alt="Utdanningsdirektoratet" />
        </Link>
      </div>
    </footer>
  );
});
