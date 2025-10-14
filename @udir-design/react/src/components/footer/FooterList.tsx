import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type FooterListProps = {
  variant?: 'simple' | 'social';
} & HTMLAttributes<HTMLUListElement>;

export const FooterList = forwardRef<HTMLUListElement, FooterListProps>(
  function FooterList({ variant = 'simple', className, ...rest }, ref) {
    return (
      <ul
        className={cl(`uds-footer__list`, className)}
        data-variant={variant}
        ref={ref}
        {...rest}
      />
    );
  },
);
