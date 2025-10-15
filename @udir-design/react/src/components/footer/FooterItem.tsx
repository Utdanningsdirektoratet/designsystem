import { forwardRef } from 'react';
import { Link, LinkProps } from '../link/Link';

export type FooterItemProps = LinkProps;

export const FooterItem = forwardRef<HTMLAnchorElement, FooterItemProps>(
  function FooterItem(props, ref) {
    return (
      <li>
        <Link ref={ref} {...props} />
      </li>
    );
  },
);
