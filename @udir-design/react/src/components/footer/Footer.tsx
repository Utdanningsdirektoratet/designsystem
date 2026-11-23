import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import './footer.css';
import { Logo } from '../logo';

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
  /**
   * Changes the logo variant. Options are `default` and `pride`.
   * @default 'default'
   */
  variant?: 'default' | 'pride';
};

export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { children, className, maxWidth, variant = 'default', ...rest },
  forwardedRef,
) {
  const ref = useStyleProperties(forwardedRef, {
    '--udsc-footer-max-width': maxWidth,
  });

  return (
    <footer className={cl(`uds-footer`, className)} ref={ref} {...rest}>
      <div>
        {children}
        <a href="https://udir.no" className="uds-footer__logo">
          <Logo variant={variant} />
        </a>
      </div>
    </footer>
  );
});
