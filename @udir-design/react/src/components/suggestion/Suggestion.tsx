import {
  EXPERIMENTAL_Suggestion as DigdirSuggestion,
  EXPERIMENTAL_SuggestionClear as SuggestionClear,
  EXPERIMENTAL_SuggestionEmpty as SuggestionEmpty,
  EXPERIMENTAL_SuggestionInput as SuggestionInput,
  EXPERIMENTAL_SuggestionList as SuggestionList,
  EXPERIMENTAL_SuggestionOption as SuggestionOption,
  type SuggestionMultipleProps as DigdirSuggestionMultipleProps,
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

export {
  Suggestion,
  SuggestionClear,
  SuggestionEmpty,
  SuggestionInput,
  SuggestionList,
  SuggestionOption,
};
export type { SuggestionMultipleProps, SuggestionSingleProps };
export type {
  SuggestionClearProps,
  SuggestionEmptyProps,
  SuggestionInputProps,
  SuggestionItem,
  SuggestionListProps,
  SuggestionOptionProps,
  SuggestionProps,
} from '@digdir/designsystemet-react';
