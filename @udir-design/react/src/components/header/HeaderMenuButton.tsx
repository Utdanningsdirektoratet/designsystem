import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { MenuHamburgerIcon, XMarkIcon } from '@udir-design/icons';
import { Button, ButtonProps } from '../button/Button';

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
