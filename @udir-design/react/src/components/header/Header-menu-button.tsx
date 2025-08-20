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
      className={cl('ds-header__menu-button', className)}
      variant="tertiary"
      popoverTarget="ds-header-menu"
      {...props}
    >
      <>
        <MenuHamburgerIcon />
        <XMarkIcon />
      </>
      {children ? children : 'Meny'}
    </Button>
  );
};
