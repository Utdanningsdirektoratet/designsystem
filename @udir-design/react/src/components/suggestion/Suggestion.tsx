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
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type SuggestionSingleProps = Omit<DigdirSuggestionSingleProps, 'data-color'>;
type SuggestionMultipleProps = Omit<
  DigdirSuggestionMultipleProps,
  'data-color'
>;
type SuggestionProps = SuggestionSingleProps | SuggestionMultipleProps;

const Suggestion = DigdirSuggestion as ForwardRefExoticComponent<
  SuggestionProps & RefAttributes<ComponentRef<typeof DigdirSuggestion>>
> &
  Pick<
    typeof DigdirSuggestion,
    'Clear' | 'Empty' | 'Input' | 'List' | 'Option'
  >;

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
