import { Dropdown, DropdownProps } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';

import { forwardRef } from 'react';

export type HeaderMenuProps = DropdownProps;

export const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
  function HeaderMenu({ children, className, ...rest }, ref) {
    return (
      <Dropdown
        id="ds-header-menu"
        className={cl('ds-header__menu', className)}
        popover="auto"
        ref={ref}
        {...rest}
      >
        {children}
      </Dropdown>
    );
  },
);
