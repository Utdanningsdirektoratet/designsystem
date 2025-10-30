import { forwardRef } from 'react';
import type { LinkProps } from '../link/Link';
import { Link } from '../link/Link';

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
