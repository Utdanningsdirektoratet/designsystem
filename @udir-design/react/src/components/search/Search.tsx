import {
  Search,
  type SearchProps,
  SearchClear,
  type SearchClearProps,
  SearchInput,
  type SearchInputProps,
  SearchButton,
  type SearchButtonProps,
} from '@digdir/designsystemet-react';

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
