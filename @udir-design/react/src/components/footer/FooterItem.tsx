import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import cl from 'clsx/lite';
import { LinkProps } from '@digdir/designsystemet-react';
import { Link } from '../link/Link';

export type FooterItemProps = LinkProps;

export const FooterItem: ForwardRefExoticComponent<
  FooterItemProps & RefAttributes<HTMLLIElement>
> = forwardRef<HTMLLIElement, FooterItemProps>(function FooterItem({
  className,
  href,
  asChild,
  children,
  ...rest
}: FooterItemProps) {
  return (
    <li>
      <Link className={cl(`uds-footer__link`, `ds-link`)} href={href} {...rest}>
        {children}
      </Link>
    </li>
  );
});
