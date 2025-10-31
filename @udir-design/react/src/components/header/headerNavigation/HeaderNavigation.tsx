import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type HeaderNavigationProps = HTMLAttributes<HTMLElement>;

export const HeaderNavigation = forwardRef<HTMLElement, HeaderNavigationProps>(
  function HeaderNavigation({ children, className, ...rest }, ref) {
    return (
      <nav
        aria-label="header-navigation"
        className={cl('uds-header__navigation', className)}
        ref={ref}
        {...rest}
      >
        <ul>{children}</ul>
      </nav>
    );
  },
);
