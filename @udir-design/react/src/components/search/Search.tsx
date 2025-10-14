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
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type SearchProps = Omit<DigdirSearchProps, 'data-color'>;

const Search = DigdirSearch as ForwardRefExoticComponent<
  SearchProps & RefAttributes<ComponentRef<typeof DigdirSearch>>
> &
  Pick<typeof DigdirSearch, 'Clear' | 'Input' | 'Button'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Search.displayName = 'Search';

export {
  Search,
  SearchButton,
  SearchButtonProps,
  SearchClear,
  SearchClearProps,
  SearchInput,
  SearchInputProps,
  SearchProps,
};
