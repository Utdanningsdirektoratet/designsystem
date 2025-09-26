import { Link, LinkProps } from '../../link/Link';
import { normalizePath } from '../../../utilities/helpers/normalizePath';
import { forwardRef } from 'react';

export type HeaderNavigationItemProps = LinkProps & {
  /**
   * Override whether the link is active. If not provided, it will check if the href matches the current window location.
   */
  active?: boolean;
};

export const HeaderNavigationItem = forwardRef<
  HTMLAnchorElement,
  HeaderNavigationItemProps
>(function HeaderNavigationItem(
  { active, href, children, className, ...rest },
  ref,
) {
  let isActive = active;
  if (isActive === undefined && typeof window !== 'undefined') {
    const current = normalizePath(window.location.pathname);
    const target = normalizePath(href);
    if (target) {
      isActive = current === target || current.startsWith(target + '/');
    }
  }
  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        ref={ref}
        {...rest}
      >
        {children}
      </Link>
    </li>
  );
});
