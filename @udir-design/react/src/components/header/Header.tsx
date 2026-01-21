import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import type { CSSProperties } from 'react';
import { useScrollDirection } from '../../utilities/useScrollDirection';
import { Logo } from '../logo/Logo';
import { LogoSymbol } from '../logo/LogoSymbol';
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
  const { dir, isAtTop } = useScrollDirection();
  const dataScrollDirection = sticky ? dir : undefined;
  const dataTop = sticky ? isAtTop : undefined;
  const isMain = applicationName === 'Utdanningsdirektoratet';
  const LogoContainer = href !== null ? 'a' : 'div';

  return (
    <header
      className={cl('uds-header', className)}
      ref={ref}
      data-scroll-direction={dataScrollDirection}
      data-top={dataTop}
      style={{ '--udsc-header-max-width': maxWidth } as CSSProperties}
      {...rest}
    >
      <div>
        <LogoContainer href={href as string} className="uds-header__logo">
          {isMain ? <Logo padding="0" /> : <LogoSymbol padding="0" />}
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
