import {
  EXPERIMENTAL_Suggestion as DigdirSuggestion,
  EXPERIMENTAL_SuggestionClear as SuggestionClear,
  EXPERIMENTAL_SuggestionEmpty as SuggestionEmpty,
  EXPERIMENTAL_SuggestionInput as SuggestionInput,
  EXPERIMENTAL_SuggestionList as SuggestionList,
  EXPERIMENTAL_SuggestionOption as SuggestionOption,
  type SuggestionClearProps,
  type SuggestionEmptyProps,
  type SuggestionInputProps,
  type SuggestionItem,
  type SuggestionListProps,
  type SuggestionMultipleProps as DigdirSuggestionMultipleProps,
  type SuggestionOptionProps,
  type SuggestionSingleProps as DigdirSuggestionSingleProps,
} from '@digdir/designsystemet-react';
import {
  type ComponentRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
} from 'react';
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

const Suggestion: ForwardRefExoticComponent<
  SuggestionProps & RefAttributes<ComponentRef<typeof DigdirSuggestion>>
> & {
  Clear: typeof SuggestionClear;
  Empty: typeof SuggestionEmpty;
  Input: typeof SuggestionInput;
  List: typeof SuggestionList;
  Option: typeof SuggestionOption;
} = Object.assign(SuggestionBase, {
  Clear: SuggestionClear,
  Empty: SuggestionEmpty,
  Input: SuggestionInput,
  List: SuggestionList,
  Option: SuggestionOption,
});

Suggestion.displayName = 'Suggestion';
SuggestionClear.displayName = 'Suggestion.Clear';
SuggestionEmpty.displayName = 'Suggestion.Empty';
SuggestionInput.displayName = 'Suggestion.Input';
SuggestionList.displayName = 'Suggestion.List';
SuggestionOption.displayName = 'Suggestion.Option';

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
};
