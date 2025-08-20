import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

import cl from 'clsx/lite';
import { Button, ButtonProps } from '../button/Button';

export type HeaderThemeMenuButtonProps = ButtonProps;

export const HeaderThemeMenuButton = function HeaderMenuButton({
  className,
  children,
  ...props
}: HeaderThemeMenuButtonProps) {
  return (
    <Button
      className={cl('uds-header__menu-button', className)}
      variant="tertiary"
      {...props}
    >
      <>
        <ChevronDownIcon aria-hidden />
        <ChevronUpIcon aria-hidden />
      </>
      {children}
    </Button>
  );
};
