import { forwardRef } from 'react';
import { LinkProps } from '@digdir/designsystemet-react';
import { Link } from '../link/Link';

export type FooterItemProps = LinkProps;

export const FooterItem: React.ForwardRefExoticComponent<FooterItemProps> =
  forwardRef<HTMLAnchorElement, FooterItemProps>(function FooterItem({
    className,
    href,
    asChild,
    children,
    ...rest
  }: FooterItemProps) {
    return (
      <li>
        <Link href={href} {...rest}>
          {children}
        </Link>
      </li>
    );
  });
