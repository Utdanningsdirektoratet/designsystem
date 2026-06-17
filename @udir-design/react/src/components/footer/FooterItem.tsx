import { forwardRef } from 'react';
import type { LinkProps } from '../link';
import { Link } from '../link';

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
