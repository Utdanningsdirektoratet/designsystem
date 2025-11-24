import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import type { CSSProperties } from 'react';
import circleLogoDark from '../../../assets/img/udir-circle-logo-dark-mode.svg';
import circleLogoLight from '../../../assets/img/udir-circle-logo.svg';
import mainLogoDark from '../../../assets/img/udir-main-logo-dark-mode.svg';
import mainLogoLight from '../../../assets/img/udir-main-logo.svg';
import { useScrollDirection } from '../../utilities/useScrollDirection';
import { Heading } from '../typography/heading/Heading';
import './header.css';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName: 'Utdanningsdirektoratet' | (string & {});
  /**
   * The URL the header logo links to. Set to `null` to disable the link.
   * @default '/' (root of the site)
   */
  href?: string | null;
  /**
   * The maximum width of the header content.
   * Can be any valid CSS width value, e.g. `1280px`, `100%`, etc.
   * @default '80rem'
   */
  maxWidth?: string;
  /**
   * Whether the header should stick to the top of the screen. It will auto-hide on scroll down, and appear on scroll up.
   * @default true
   */
  sticky?: boolean;
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  'data-size'?: Size;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    applicationName,
    children,
    className,
    href = '/',
    maxWidth = '80rem',
    sticky = true,
    ...rest
  },
  ref,
) {
  const scrollDirection = useScrollDirection();
  const dataScrollDirection = sticky ? scrollDirection : undefined;
  const isMain = applicationName === 'Utdanningsdirektoratet';
  const logo = isMain ? mainLogoLight : circleLogoLight;
  const logoDark = isMain ? mainLogoDark : circleLogoDark;
  const logoAlt = isMain ? 'Utdanningsdirektoratet' : '';
  const LogoContainer = href !== null ? 'a' : 'div';

  return (
    <header
      className={cl('uds-header', className)}
      ref={ref}
      data-scroll-direction={dataScrollDirection}
      style={{ '--udsc-header-max-width': maxWidth } as CSSProperties}
      {...rest}
    >
      <div>
        <LogoContainer href={href as string} className="uds-header__logo">
          <img src={logo} alt={logoAlt} />
          <img src={logoDark} alt={logoAlt} />
          {!isMain && (
            <Heading data-size="xs" asChild>
              <span>{applicationName}</span>
            </Heading>
          )}
        </LogoContainer>
        {children && <div className="uds-header__content">{children}</div>}
      </div>
    </header>
  );
});
