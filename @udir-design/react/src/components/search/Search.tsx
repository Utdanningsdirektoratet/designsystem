import {
  Search as DigdirSearch,
  SearchButton,
  SearchClear,
  SearchInput,
  type SearchProps as DigdirSearchProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type SearchProps = Omit<DigdirSearchProps, 'data-color'>;

const Search = DigdirSearch as ForwardRefExoticComponent<
  SearchProps & RefAttributes<ComponentRef<typeof DigdirSearch>>
> &
  Pick<typeof DigdirSearch, 'Clear' | 'Input' | 'Button'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Search.displayName = 'Search';

export { Search, SearchButton, SearchClear, SearchInput };
export type { SearchProps };
export type {
  SearchButtonProps,
  SearchClearProps,
  SearchInputProps,
} from '@digdir/designsystemet-react';
