import './search.css';
import {
  Search as DigdirSearch,
  SearchButton as DigdirSearchButton,
  type SearchButtonProps,
  SearchClear as DigdirSearchClear,
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
import { useSyncedClearButton } from './useSyncedClearButton';

type SearchProps = Omit<DigdirSearchProps, 'data-color'>;

// Wrapping the root instead of casting digdir's component keeps the `Object.assign`
// below from mutating the object `@digdir/designsystemet-react` exports, which would
// leak our Clear to anyone importing Search from there.
const SearchRoot = forwardRef<ComponentRef<typeof DigdirSearch>, SearchProps>(
  function Search(props, ref) {
    return <DigdirSearch {...props} ref={ref} />;
  },
);

const SearchClear = forwardRef<HTMLButtonElement, SearchClearProps>(
  function SearchClear(props, ref) {
    const clearRef = useSyncedClearButton(ref);
    const [, defaultLabel] = useLanguageVariable(
      '--udsc-search-clear-label',
      'Tøm',
      clearRef,
    );

    return (
      <DigdirSearchClear aria-label={defaultLabel} {...props} ref={clearRef} />
    );
  },
);

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  function SearchButton({ children, ...rest }, ref) {
    const [buttonRef, defaultLabel] = useLanguageVariable<HTMLButtonElement>(
      '--udsc-search-button-text',
      'Søk',
    );
    useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

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
  Button: typeof SearchButton;
  Clear: typeof SearchClear;
  Input: typeof SearchInput;
} = Object.assign(SearchRoot, {
  Button: SearchButton,
  Clear: SearchClear,
  Input: SearchInput,
});

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Search.displayName = 'Search';
SearchButton.displayName = 'Search.Button';
SearchClear.displayName = 'Search.Clear';

export type {
  SearchButtonProps,
  SearchClearProps,
  SearchInputProps,
  SearchProps,
};
export { Search, SearchButton, SearchClear, SearchInput };
