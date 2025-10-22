import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { Popover, PopoverProps } from '../../popover/Popover';

export type HeaderMenuProps = Omit<
  PopoverProps,
  'placement' | 'autoPlacement' | 'variant'
>;

export const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
  function HeaderMenu({ children, className, ...rest }, ref) {
    return (
      <Popover
        id="uds-header-menu"
        className={cl('uds-header__menu', className)}
        popover="auto"
        placement="bottom-end"
        ref={ref}
        {...rest}
      >
        {children}
      </Popover>
    );
  },
);
