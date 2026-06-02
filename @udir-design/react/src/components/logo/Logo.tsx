import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import mainLogoDark from '../../../assets/img/udir-main-logo-dark-mode.svg';
import mainLogoLight from '../../../assets/img/udir-main-logo.svg';
import './logo.css';

export type LogoProps = HTMLAttributes<HTMLElement> & {
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

export const Logo = forwardRef<HTMLDivElement, LogoProps>(function Header(
  { className, size, padding, style, ...rest },
  ref,
) {
  const logoAlt = 'Utdanningsdirektoratet';

  return (
    <div
      className={cl('uds-logo', className)}
      ref={ref}
      {...rest}
      style={
        {
          '--uds-logo-size': size,
          '--uds-logo-padding': padding,
          ...style,
        } as React.CSSProperties
      }
    >
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
      <img src={mainLogoLight} alt={logoAlt} role="img" />
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
      <img src={mainLogoDark} alt={logoAlt} role="img" />
    </div>
  );
});
