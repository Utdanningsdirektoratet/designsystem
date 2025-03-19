import {
  EXPERIMENTAL_Suggestion as DigdirSuggestion,
  type SuggestionProps as DigdirSuggestionProps,
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
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type SuggestionProps = Omit<DigdirSuggestionProps, 'data-color'>;

const Suggestion =
  DigdirSuggestion as ForwardRefExoticComponent<SuggestionProps> &
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
  SuggestionEmpty,
  SuggestionInput,
  SuggestionList,
  SuggestionOption,
  SuggestionProps,
  SuggestionClearProps,
  SuggestionEmptyProps,
  SuggestionInputProps,
  SuggestionListProps,
  SuggestionOptionProps,
};
