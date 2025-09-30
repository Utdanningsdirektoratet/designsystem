import { forwardRef } from 'react';
import { Search, SearchProps } from '../search/Search';
import cl from 'clsx/lite';

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
