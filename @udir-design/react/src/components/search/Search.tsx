import {
  Search as DigdirSearch,
  type SearchProps as DigdirSearchProps,
  SearchClear,
  type SearchClearProps,
  SearchInput,
  type SearchInputProps,
  SearchButton,
  type SearchButtonProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type SearchProps = Omit<DigdirSearchProps, 'data-color'>;

const Search = DigdirSearch as ForwardRefExoticComponent<SearchProps> &
  Pick<typeof DigdirSearch, 'Clear' | 'Input' | 'Button'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Search.displayName = 'Search';

export {
  Search,
  SearchProps,
  SearchClear,
  SearchClearProps,
  SearchInput,
  SearchInputProps,
  SearchButton,
  SearchButtonProps,
};
