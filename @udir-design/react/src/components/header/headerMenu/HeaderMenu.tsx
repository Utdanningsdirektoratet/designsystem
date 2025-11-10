import cl from 'clsx/lite';
import { forwardRef, useState } from 'react';
import type { PopoverProps } from '../../popover/Popover';
import { Popover } from '../../popover/Popover';

export type HeaderMenuProps = Omit<
  PopoverProps,
  'placement' | 'autoPlacement' | 'variant'
>;

export const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
  function HeaderMenu(
    {
      id = 'uds-header-menu',
      open: openProp,
      onOpen,
      onClose,
      onBlurCapture,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = openProp !== undefined;
    const open = isControlled ? !!openProp : internalOpen;

    const toggleInternal = () => {
      if (!isControlled) {
        setInternalOpen((prev) => !prev);
      }
    };
    const closeInternal = () => {
      if (!isControlled) {
        setInternalOpen(false);
      }
    };

    return (
      <Popover
        id={id}
        className={cl('uds-header__menu', className)}
        popover="auto"
        placement="bottom-end"
        ref={ref}
        open={open}
        onOpen={() => {
          toggleInternal();
          onOpen?.();
        }}
        onClose={() => {
          closeInternal();
          onClose?.();
        }}
        onBlurCapture={(e) => {
          onBlurCapture?.(e);
          if (e.defaultPrevented) return;
          const pop = e.currentTarget as HTMLDivElement;
          const next = e.relatedTarget as Element | null;
          // Ignore blur when focus goes to the trigger button
          if (next?.closest(`[popovertarget="${id}"]`)) return;
          if (!next || !pop.contains(next)) {
            closeInternal();
          }
        }}
        {...rest}
      >
        {children}
      </Popover>
    );
  },
);
