import '../suggestion/translations.css';
import './search.css';
import {
  Search as DigdirSearch,
  SearchButton as DigdirSearchButton,
  type SearchButtonProps,
  SearchClear,
  type SearchClearProps,
  SearchInput,
  type SearchInputProps,
  type SearchProps as DigdirSearchProps,
} from '@digdir/designsystemet-react';
import {
  type ComponentRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useLanguageVariable } from '../../hooks/useLanguageVariable';

type SearchProps = Omit<DigdirSearchProps, 'data-color'>;

// Wrapping the root instead of casting digdir's component keeps the `Object.assign`
// below from mutating the object `@digdir/designsystemet-react` exports, which would
// leak our Button to anyone importing Search from there.
const SearchRoot = forwardRef<ComponentRef<typeof DigdirSearch>, SearchProps>(
  function Search(props, ref) {
    return <DigdirSearch {...props} ref={ref} />;
  },
);

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  function SearchButton({ children, ...rest }, ref) {
    const [buttonRef, defaultLabel] = useLanguageVariable<HTMLButtonElement>(
      '--udsc-search-button-text',
      'Søk',
    );
    useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement, [
      buttonRef,
    ]);

    return (
      <DigdirSearchButton {...rest} ref={buttonRef}>
        {children ?? defaultLabel}
      </DigdirSearchButton>
    );
  },
);

const Search: ForwardRefExoticComponent<
  SearchProps & RefAttributes<ComponentRef<typeof DigdirSearch>>
> & {
  Clear: typeof SearchClear;
  Input: typeof SearchInput;
  Button: typeof SearchButton;
} = Object.assign(SearchRoot, {
  Clear: SearchClear,
  Input: SearchInput,
  Button: SearchButton,
});

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Search.displayName = 'Search';
SearchButton.displayName = 'Search.Button';

export type {
  SearchButtonProps,
  SearchClearProps,
  SearchInputProps,
  SearchProps,
};
export { Search, SearchButton, SearchClear, SearchInput };
