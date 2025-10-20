import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { ArrowRightIcon } from '@udir-design/icons';
import { Link, LinkProps } from '../../link/Link';

export type HeaderMenuLinkProps = LinkProps;

export const HeaderMenuLink = forwardRef<
  HTMLAnchorElement,
  HeaderMenuLinkProps
>(function HeaderMenuLink({ className, children, ...props }, ref) {
  return (
    <li>
      <Link
        className={cl('uds-header__menu-link', className)}
        ref={ref}
        {...props}
      >
        <ArrowRightIcon aria-hidden />
        {children}
      </Link>
    </li>
  );
});
