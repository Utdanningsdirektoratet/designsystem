import { MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';
import cl from 'clsx/lite';
import { Button, ButtonProps } from '../button/Button';
import { forwardRef } from 'react';

export type HeaderMenuButtonProps = ButtonProps;

export const HeaderMenuButton = forwardRef<
  HTMLButtonElement,
  HeaderMenuButtonProps
>(function HeaderMenuButton({ className, children, ...props }, ref) {
  return (
    <Button
      className={cl('uds-header__menu-button', className)}
      variant="tertiary"
      popovertarget="uds-header-menu"
      ref={ref}
      {...props}
    >
      <>
        <MenuHamburgerIcon aria-hidden />
        <XMarkIcon aria-hidden />
      </>
      {children ? children : 'Meny'}
    </Button>
  );
});
