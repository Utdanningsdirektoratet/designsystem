import { forwardRef, type HTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import cl from 'clsx/lite';

export type FooterItemProps = HTMLAttributes<HTMLLIElement> & {
  href: string;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
};

export const FooterItem = forwardRef<HTMLLIElement, FooterItemProps>(
  function FooterItem({ className, asChild, href, children, ...rest }, ref) {
    const Component = asChild ? Slot : 'a';

    return (
      <li className={cl(`uds-footer__item`, className)} ref={ref} {...rest}>
        <Component className="uds-footer__link" href={href}>
          {children}
        </Component>
      </li>
    );
  },
);
