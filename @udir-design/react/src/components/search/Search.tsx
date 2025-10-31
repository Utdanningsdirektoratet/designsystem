import {
  Search as DigdirSearch,
  SearchButton,
  type SearchButtonProps,
  SearchClear,
  type SearchClearProps,
  SearchInput,
  type SearchInputProps,
  type SearchProps as DigdirSearchProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type SearchProps = Omit<DigdirSearchProps, 'data-color'>;

const Search = DigdirSearch as ForwardRefExoticComponent<
  SearchProps & RefAttributes<ComponentRef<typeof DigdirSearch>>
> &
  Pick<typeof DigdirSearch, 'Clear' | 'Input' | 'Button'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Search.displayName = 'Search';

export type {
  SearchButtonProps,
  SearchClearProps,
  SearchInputProps,
  SearchProps,
};
export { Search, SearchButton, SearchClear, SearchInput };
