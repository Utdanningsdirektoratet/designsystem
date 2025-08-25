import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cl from 'clsx/lite';

export type FooterListProps = {
  variant?: 'simple' | 'social';
} & HTMLAttributes<HTMLUListElement>;

/**
 * FooterList component, used to display a list of items in the Footer.
 *
 * @example
 * <Footer>
 *  <FooterList>
 *    <FooterItem>
 *    </FooterItem>
 *  </FooterList>
 * </Footer>
 */
export const FooterList = forwardRef<HTMLUListElement, FooterListProps>(
  function FooterList({ variant = 'simple', className, ...rest }, ref) {
    return (
      <ul
        className={cl(`uds-footer__list`, className)}
        data-variant={variant}
        ref={ref}
        {...rest}
      />
    );
  },
);
