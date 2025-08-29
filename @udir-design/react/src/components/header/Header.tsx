import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import { Heading, Link } from '@udir-design/react/alpha';
import mainLogo from '../../../assets/img/udir-main-logo.png';
import circleLogo from '../../../assets/img/udir-circle-logo.png';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName: 'utdanningsdirektoratet' | (string & {});
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { applicationName, children, className, ...rest },
  ref,
) {
  return (
    <header className={cl('uds-header', className)} ref={ref} {...rest}>
      <Link href="/" className="uds-header__logo">
        <img
          src={
            applicationName === 'Utdanningsdirektoratet' ? mainLogo : circleLogo
          }
          alt={
            applicationName === 'Utdanningsdirektoratet'
              ? 'Utdanningsdirektoratet'
              : ''
          }
        />
        {applicationName !== 'Utdanningsdirektoratet' && (
          <Heading data-size="xs">{applicationName}</Heading>
        )}
      </Link>
      {children && <div className="uds-header__content">{children}</div>}
    </header>
  );
});
