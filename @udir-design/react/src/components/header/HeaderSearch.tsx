import cl from 'clsx/lite';
import { Search, SearchProps } from '../search/Search';

export type HeaderSearchProps = SearchProps;

export const HeaderSearch = function HeaderSearch({
  className,
  ...props
}: HeaderSearchProps) {
  return <Search className={cl('uds-header__search', className)} {...props} />;
};
