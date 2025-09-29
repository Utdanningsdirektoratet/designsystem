import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import cl from 'clsx/lite';
import { Button, ButtonProps } from '../button/Button';
import { forwardRef } from 'react';

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
