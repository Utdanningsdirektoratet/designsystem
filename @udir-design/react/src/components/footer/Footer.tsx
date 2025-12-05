import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import type { CSSProperties, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import logoDark from '../../../assets/img/udir-main-logo-dark-mode.svg';
import logo from '../../../assets/img/udir-main-logo.svg';
import './footer.css';

export type FooterProps = HTMLAttributes<HTMLElement> & {
  /**
   * The maximum width of the footer content.
   * Can be any valid CSS width value, e.g. `1280px`, `100%`, etc.
   * Should be the same as for header content.
   * @default '80rem'
   */
  maxWidth?: string;
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  'data-size'?: Size;
};

export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { children, className, maxWidth = '80rem', ...rest },
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
          <img src={logoDark} alt="Utdanningsdirektoratet" />
        </a>
      </div>
    </footer>
  );
});
