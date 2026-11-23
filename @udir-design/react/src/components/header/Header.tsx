import type { Size } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { useScrollDirection } from '../../utilities/useScrollDirection';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import { Logo } from '../logo';
import { LogoSymbol } from '../logo';
import { Heading } from '../typography/heading';
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
  /**
   * Changes the logo variant. Options are `default` and `pride`.
   */
  variant?: 'default' | 'pride';
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    applicationName,
    children,
    className,
    href = '/',
    maxWidth,
    sticky = true,
    variant = 'default',
    ...rest
  },
  forwardedRef,
) {
  const { dir, isAtTop } = useScrollDirection();
  const dataScrollDirection = sticky ? dir : undefined;
  const dataTop = sticky ? isAtTop : undefined;
  const isMain = applicationName === 'Utdanningsdirektoratet';
  const LogoContainer = href !== null ? 'a' : 'div';
  const ref = useStyleProperties(forwardedRef, {
    '--udsc-header-max-width': maxWidth,
  });

  return (
    <header
      className={cl('uds-header', className)}
      ref={ref}
      data-scroll-direction={dataScrollDirection}
      data-top={dataTop}
      {...rest}
    >
      <div>
        <LogoContainer href={href as string} className="uds-header__logo">
          {isMain ? (
            <Logo variant={variant} />
          ) : (
            <LogoSymbol variant={variant} />
          )}
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
