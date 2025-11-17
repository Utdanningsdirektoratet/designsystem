import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { SearchProps } from '../search/Search';
import { Search } from '../search/Search';

export type HeaderSearchProps = SearchProps;

export const HeaderSearch = forwardRef<HTMLDivElement, HeaderSearchProps>(
  function HeaderSearch({ className, ...props }, ref) {
    return (
      <Search
        className={cl('uds-header__search', className)}
        ref={ref}
        {...props}
      />
    );
  },
);
