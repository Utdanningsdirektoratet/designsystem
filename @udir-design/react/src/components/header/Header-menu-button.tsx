import { MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, ButtonProps } from '@udir-design/react/alpha';
import cl from 'clsx/lite';

export type HeaderMenuButtonProps = ButtonProps;

export const HeaderMenuButton = function HeaderMenuButton({
  className,
  children,
  ...props
}: HeaderMenuButtonProps) {
  return (
    <Button
      className={cl('uds-header__menu-button', className)}
      variant="tertiary"
      popovertarget="uds-header-menu"
      {...props}
    >
      <>
        <MenuHamburgerIcon aria-hidden />
        <XMarkIcon aria-hidden />
      </>
      {children ? children : 'Meny'}
    </Button>
  );
};
