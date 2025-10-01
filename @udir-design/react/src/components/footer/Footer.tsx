import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import logo from '../../../assets/img/udir-main-logo.svg';
import cl from 'clsx/lite';
import './footer.css';

export type FooterProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The maximum width of the footer content.
   * Can be any valid CSS width value, e.g. `1280px`, `100%`, etc.
   * Should be the same as for header content.
   * @default '1280px'
   */
  maxWidth?: string;
};

export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { children, className, maxWidth = '1280px', ...rest },
  ref,
) {
  return (
    <footer
      className={cl(`uds-footer`, className)}
      ref={ref}
      style={{ '--udsc-footer-max-width': maxWidth } as CSSProperties}
      {...rest}
    >
      <div>
        {children}
        <a href="https://udir.no" className="uds-footer__logo">
          <img src={logo} alt="Utdanningsdirektoratet" />
        </a>
      </div>
    </footer>
  );
});
