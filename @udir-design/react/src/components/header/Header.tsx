import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import { Heading, Link } from '@udir-design/react/alpha';

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
    <header
      className={cl('ds-header', className)}
      ref={ref}
      data-color="accent"
      {...rest}
    >
      <Link href="/" className="ds-header__logo">
        <img
          src={
            applicationName === 'Utdanningsdirektoratet'
              ? '/img/udir-main-logo.png'
              : '/img/udir-circle-logo.png'
          }
          alt={applicationName || 'Utdanningsdirektoratet'}
        />
        {applicationName !== 'Utdanningsdirektoratet' && (
          <Heading data-size="xs">{applicationName}</Heading>
        )}
      </Link>
      {children && <div className="ds-header__content">{children}</div>}
    </header>
  );
});
