import { SearchProps } from '@udir-design/react/alpha';
import { Search } from '@udir-design/react/alpha';
import cl from 'clsx/lite';

export type HeaderSearchProps = SearchProps;

export const HeaderSearch = function HeaderSearch({
  className,
  ...props
}: HeaderSearchProps) {
  return <Search className={cl('uds-header__search', className)} {...props} />;
};
