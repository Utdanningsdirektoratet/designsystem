import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import mainLogoDark from '../../../assets/img/udir-main-logo-dark-mode.svg';
import mainLogoLight from '../../../assets/img/udir-main-logo.svg';
import mainLogoPrideDark from '../../../assets/img/udir-pride-logo-dark-mode.svg';
import mainLogoPrideLight from '../../../assets/img/udir-pride-logo.svg';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import './logo.css';

export type LogoProps = HTMLAttributes<HTMLElement> & {
  /**
   * Changes height of the logo, the width
   * scales accordingly.
   * Applied after hydration, so server-rendered pages show the default until then. For a fixed
   * size, set `--uds-logo-size` in your CSS instead, on a class on the logo itself.
   * @default 'var(--ds-size-12)'
   */
  size?: string;
  /**
   * Changes padding on all sides
   * of the logo.
   * Applied after hydration, so server-rendered pages show the default until then. For a fixed
   * padding, set `--uds-logo-padding` in your CSS instead, on a class on the logo itself.
   * @default 'var(--ds-size-5)'
   */
  padding?: string;
  /**
   * Changes the logo variant. Options are `default` and `pride`.
   * @default 'default'
   */
  variant?: 'default' | 'pride';
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(function Header(
  { className, size, padding, variant = 'default', ...rest },
  forwardedRef,
) {
  const logoAlt = 'Utdanningsdirektoratet';
  const ref = useStyleProperties(forwardedRef, {
    '--uds-logo-size': size,
    '--uds-logo-padding': padding,
  });

  return (
    <div className={cl('uds-logo', className)} ref={ref} {...rest}>
      {/* oxlint-disable jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
      <img
        src={variant === 'pride' ? mainLogoPrideLight : mainLogoLight}
        alt={logoAlt}
        role="img"
      />
      <img
        src={variant === 'pride' ? mainLogoPrideDark : mainLogoDark}
        alt={logoAlt}
        role="img"
      />
      {/* oxlint-enable jsx-a11y/no-redundant-roles */}
    </div>
  );
});
