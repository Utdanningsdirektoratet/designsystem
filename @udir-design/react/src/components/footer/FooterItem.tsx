import { forwardRef } from 'react';
import { Link, LinkProps } from '../link/Link';

export type FooterItemProps = LinkProps;

export const FooterItem = forwardRef<HTMLAnchorElement, FooterItemProps>(
  function FooterItem({ className, href, asChild, children, ...rest }, ref) {
    return (
      <li>
        <Link href={href} ref={ref} {...rest}>
          {children}
        </Link>
      </li>
    );
  },
);
