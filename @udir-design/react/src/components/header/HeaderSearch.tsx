import cl from 'clsx/lite';
import { type ComponentRef, forwardRef } from 'react';
import type { SearchProps } from '../search';
import { Search } from '../search';

export type HeaderSearchProps = SearchProps;

export const HeaderSearch = forwardRef<
  ComponentRef<typeof Search>,
  HeaderSearchProps
>(function HeaderSearch({ className, ...props }, ref) {
  return (
    <Search
      className={cl('uds-header__search', className)}
      ref={ref}
      {...props}
    />
  );
});
