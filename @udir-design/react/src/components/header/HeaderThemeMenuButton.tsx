import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@udir-design/icons';
import { Button, ButtonProps } from '../button/Button';

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
      className={cl('uds-header__menu-button', className)}
      variant="tertiary"
      ref={ref}
      {...props}
    >
      <>
        <ChevronDownIcon aria-hidden />
        <ChevronUpIcon aria-hidden />
      </>
      {children}
    </Button>
  );
});
