import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { ButtonProps } from '../button';
import { Button } from '../button';

export type HeaderThemeMenuButtonProps = ButtonProps;

export const HeaderThemeMenuButton = forwardRef<
  HTMLButtonElement,
  HeaderThemeMenuButtonProps
>(function HeaderMenuButton(
  { className, children, ...props }: HeaderThemeMenuButtonProps,
  ref,
) {
  return (
    <Button
      className={cl('uds-header__theme-menu-button', className)}
      variant="tertiary"
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});
