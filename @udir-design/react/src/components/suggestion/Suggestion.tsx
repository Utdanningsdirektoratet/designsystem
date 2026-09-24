import {
  EXPERIMENTAL_Suggestion as DigdirSuggestion,
  EXPERIMENTAL_SuggestionClear as DigdirSuggestionClear,
  EXPERIMENTAL_SuggestionEmpty as SuggestionEmpty,
  EXPERIMENTAL_SuggestionInput as SuggestionInput,
  EXPERIMENTAL_SuggestionList as DigdirSuggestionList,
  EXPERIMENTAL_SuggestionOption as SuggestionOption,
  EXPERIMENTAL_SuggestionToggle as DigdirSuggestionToggle,
  type SuggestionClearProps,
  type SuggestionEmptyProps,
  type SuggestionInputProps,
  type SuggestionItem,
  type SuggestionListProps,
  type SuggestionMultipleProps as DigdirSuggestionMultipleProps,
  type SuggestionOptionProps,
  type SuggestionSingleProps as DigdirSuggestionSingleProps,
  type SuggestionToggleProps,
} from '@digdir/designsystemet-react';
import {
  type ComponentRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useLanguageVariable } from '../../hooks/useLanguageVariable';
import './suggestion.css';

type SuggestionDisplayProps = {
  /**
   * How selected items are displayed when `multiple` is true.
   *
   * - `chips` renders removable chips for each selected item (default)
   * - `count` hides chips and shows a count label (e.g. "2 valgt")
   *
   * Customize the label text with the `--dsc-suggestion-count-label` CSS variable.
   *
   * @default 'chips'
   */
  display?: 'chips' | 'count';
};

type SuggestionSingleProps = Omit<DigdirSuggestionSingleProps, 'data-color'> &
  SuggestionDisplayProps;
type SuggestionMultipleProps = Omit<
  DigdirSuggestionMultipleProps,
  'data-color'
> &
  SuggestionDisplayProps;
type SuggestionProps = SuggestionSingleProps | SuggestionMultipleProps;

const SuggestionBase = forwardRef<
  ComponentRef<typeof DigdirSuggestion>,
  SuggestionProps
>(function Suggestion({ display = 'chips', ...rest }, ref) {
  const multiple = 'multiple' in rest && rest.multiple === true;

  return (
    <DigdirSuggestion
      {...(rest as DigdirSuggestionSingleProps)}
      data-display={multiple && display === 'count' ? 'count' : undefined}
      ref={ref}
    />
  );
});

const SuggestionClear = forwardRef<HTMLButtonElement, SuggestionClearProps>(
  function SuggestionClear(props, ref) {
    const [clearRef, defaultLabel] = useLanguageVariable<HTMLButtonElement>(
      '--udsc-suggestion-clear-label',
      'Tøm',
    );
    useImperativeHandle(ref, () => clearRef.current as HTMLButtonElement);

    return (
      <DigdirSuggestionClear
        aria-label={defaultLabel}
        {...props}
        ref={clearRef}
      />
    );
  },
);

const SuggestionToggle = forwardRef<HTMLButtonElement, SuggestionToggleProps>(
  function SuggestionToggle(props, ref) {
    const [toggleRef, defaultLabel] = useLanguageVariable<HTMLButtonElement>(
      '--udsc-suggestion-toggle-label',
      'Valg',
    );
    useImperativeHandle(ref, () => toggleRef.current as HTMLButtonElement);

    return (
      <DigdirSuggestionToggle
        aria-label={defaultLabel}
        {...props}
        ref={toggleRef}
      />
    );
  },
);

const SuggestionList = forwardRef<HTMLDataListElement, SuggestionListProps>(
  function SuggestionList({ singular, plural, ...rest }, ref) {
    const [listRef, defaultSingular] = useLanguageVariable<HTMLDataListElement>(
      '--udsc-suggestion-list-singular',
      '%d forslag',
    );
    const [, defaultPlural] = useLanguageVariable(
      '--udsc-suggestion-list-plural',
      '%d forslag',
      listRef,
    );
    useImperativeHandle(ref, () => listRef.current as HTMLDataListElement);

    return (
      <DigdirSuggestionList
        singular={singular ?? defaultSingular}
        plural={plural ?? defaultPlural}
        {...rest}
        ref={listRef}
      />
    );
  },
);

const Suggestion: ForwardRefExoticComponent<
  SuggestionProps & RefAttributes<ComponentRef<typeof DigdirSuggestion>>
> & {
  Clear: typeof SuggestionClear;
  Empty: typeof SuggestionEmpty;
  Input: typeof SuggestionInput;
  List: typeof SuggestionList;
  Option: typeof SuggestionOption;
  Toggle: typeof SuggestionToggle;
} = Object.assign(SuggestionBase, {
  Clear: SuggestionClear,
  Empty: SuggestionEmpty,
  Input: SuggestionInput,
  List: SuggestionList,
  Option: SuggestionOption,
  Toggle: SuggestionToggle,
});

Suggestion.displayName = 'Suggestion';
SuggestionClear.displayName = 'Suggestion.Clear';
SuggestionEmpty.displayName = 'Suggestion.Empty';
SuggestionInput.displayName = 'Suggestion.Input';
SuggestionList.displayName = 'Suggestion.List';
SuggestionOption.displayName = 'Suggestion.Option';
SuggestionToggle.displayName = 'Suggestion.Toggle';

export {
  Suggestion,
  SuggestionClear,
  type SuggestionClearProps,
  SuggestionEmpty,
  type SuggestionEmptyProps,
  SuggestionInput,
  type SuggestionInputProps,
  type SuggestionItem,
  SuggestionList,
  type SuggestionListProps,
  type SuggestionMultipleProps,
  SuggestionOption,
  type SuggestionOptionProps,
  type SuggestionProps,
  type SuggestionSingleProps,
  SuggestionToggle,
  type SuggestionToggleProps,
};
