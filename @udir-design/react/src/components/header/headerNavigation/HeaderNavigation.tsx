import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';

export type HeaderNavigationProps = HTMLAttributes<HTMLDivElement>;

export const HeaderNavigation = forwardRef<
  HTMLDivElement,
  HeaderNavigationProps
>(function HeaderNavigation({ children, className, ...rest }, ref) {
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
});
