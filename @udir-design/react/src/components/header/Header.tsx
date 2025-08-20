import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import mainLogo from '../../../assets/img/udir-main-logo.svg';
import circleLogo from '../../../assets/img/udir-circle-logo.svg';
import { useScrollDirection } from '../../utilities/useScrollDirection';
import { Heading } from '../typography';
import { Link } from '../link/Link';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName: 'utdanningsdirektoratet' | (string & {});
  /**
   * Whether the header should animate on scroll.
   * @default true
   */
  animateHeaderOnScroll?: boolean;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    animateHeaderOnScroll = true,
    applicationName,
    children,
    className,
    ...rest
  },
  ref,
) {
  const scrollDirection = useScrollDirection();
  const dataScrollDirection = animateHeaderOnScroll
    ? scrollDirection
    : undefined;

  const isMain = applicationName === 'Utdanningsdirektoratet';
  const logo = isMain ? mainLogo : circleLogo;
  const logoAlt = isMain ? 'Utdanningsdirektoratet' : '';

  return (
    <header
      className={cl('uds-header', className)}
      ref={ref}
      data-scroll-direction={dataScrollDirection}
      {...rest}
    >
      <Link href="/" className="uds-header__logo">
        <img src={logo} alt={logoAlt} />
        {!isMain && <Heading data-size="xs">{applicationName}</Heading>}
      </Link>
      {children && <div className="uds-header__content">{children}</div>}
    </header>
  );
});
