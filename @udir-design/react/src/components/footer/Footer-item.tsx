import { forwardRef, type HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import { Link } from '../beta';

export type FooterItemProps = HTMLAttributes<HTMLLIElement> & { href: string };

/**
 * FooterItem component, used to display an item in the Footer. Used within a FooterList.
 *
 * @example
 * <Footer>
 *  <FooterList>
 *    <FooterItem>
 *    </FooterItem>
 *  </FooterList>
 * </Footer>
 */
export const FooterItem = forwardRef<HTMLLIElement, FooterItemProps>(
  function FooterItem({ className, href, children, ...rest }, ref) {
    return (
      <li className={cl(`ds-footer-item`, className)} ref={ref} {...rest}>
        <Link href={href}>{children}</Link>
      </li>
    );
  },
);
