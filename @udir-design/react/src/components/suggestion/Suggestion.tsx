import {
  EXPERIMENTAL_Suggestion as DigdirSuggestion,
  EXPERIMENTAL_SuggestionChips as SuggestionChips,
  type SuggestionChipsProps,
  EXPERIMENTAL_SuggestionClear as SuggestionClear,
  type SuggestionClearProps,
  EXPERIMENTAL_SuggestionEmpty as SuggestionEmpty,
  type SuggestionEmptyProps,
  EXPERIMENTAL_SuggestionInput as SuggestionInput,
  type SuggestionInputProps,
  EXPERIMENTAL_SuggestionList as SuggestionList,
  type SuggestionListProps,
  EXPERIMENTAL_SuggestionOption as SuggestionOption,
  type SuggestionOptionProps,
  type SuggestionItem,
  type SuggestionSingleProps as DigdirSuggestionSingleProps,
  type SuggestionMultipleProps as DigdirSuggestionMultipleProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type SuggestionSingleProps = Omit<DigdirSuggestionSingleProps, 'data-color'>;
type SuggestionMultipleProps = Omit<
  DigdirSuggestionMultipleProps,
  'data-color'
>;
type SuggestionProps = SuggestionSingleProps | SuggestionMultipleProps;

const Suggestion =
  DigdirSuggestion as ForwardRefExoticComponent<SuggestionProps> &
    Pick<
      typeof DigdirSuggestion,
      'Chips' | 'Clear' | 'Empty' | 'Input' | 'List' | 'Option'
    >;

Suggestion.displayName = 'Suggestion';
SuggestionChips.displayName = 'Suggestion.Chips';
SuggestionClear.displayName = 'Suggestion.Clear';
SuggestionEmpty.displayName = 'Suggestion.Empty';
SuggestionInput.displayName = 'Suggestion.Input';
SuggestionList.displayName = 'Suggestion.List';
SuggestionOption.displayName = 'Suggestion.Option';

export {
  Suggestion,
  SuggestionChips,
  SuggestionClear,
  SuggestionEmpty,
  SuggestionInput,
  SuggestionList,
  SuggestionOption,
  type SuggestionProps,
  type SuggestionChipsProps,
  type SuggestionClearProps,
  type SuggestionEmptyProps,
  type SuggestionInputProps,
  type SuggestionListProps,
  type SuggestionItem,
  type SuggestionOptionProps,
  type SuggestionSingleProps,
  type SuggestionMultipleProps,
};
