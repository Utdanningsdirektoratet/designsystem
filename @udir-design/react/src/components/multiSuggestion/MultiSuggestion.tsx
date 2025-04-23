import {
  EXPERIMENTAL_MultiSuggestion as DigdirMultiSuggestion,
  type MultiSuggestionProps as DigdirMultiSuggestionProps,
  EXPERIMENTAL_MultiSuggestionChips as MultiSuggestionChips,
  type MultiSuggestionChipsProps,
  EXPERIMENTAL_MultiSuggestionClear as MultiSuggestionClear,
  type MultiSuggestionClearProps,
  EXPERIMENTAL_MultiSuggestionEmpty as MultiSuggestionEmpty,
  type MultiSuggestionEmptyProps,
  EXPERIMENTAL_MultiSuggestionInput as MultiSuggestionInput,
  type MultiSuggestionInputProps,
  EXPERIMENTAL_MultiSuggestionList as MultiSuggestionList,
  type MultiSuggestionListProps,
  EXPERIMENTAL_MultiSuggestionOption as MultiSuggestionOption,
  type MultiSuggestionOptionProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type MultiSuggestionProps = Omit<DigdirMultiSuggestionProps, 'data-color'>;

const MultiSuggestion =
  DigdirMultiSuggestion as ForwardRefExoticComponent<MultiSuggestionProps> &
    Pick<
      typeof DigdirMultiSuggestion,
      'Chips' | 'Clear' | 'Empty' | 'Input' | 'List' | 'Option'
    >;

MultiSuggestion.displayName = 'MultiSuggestion';
MultiSuggestionChips.displayName = 'MultiSuggestion.Chips';
MultiSuggestionClear.displayName = 'MultiSuggestion.Clear';
MultiSuggestionEmpty.displayName = 'MultiSuggestion.Empty';
MultiSuggestionInput.displayName = 'MultiSuggestion.Input';
MultiSuggestionList.displayName = 'MultiSuggestion.List';
MultiSuggestionOption.displayName = 'MultiSuggestion.Option';

export {
  MultiSuggestion,
  MultiSuggestionChips,
  MultiSuggestionClear,
  MultiSuggestionEmpty,
  MultiSuggestionInput,
  MultiSuggestionList,
  MultiSuggestionOption,
  type MultiSuggestionProps,
  type MultiSuggestionChipsProps,
  type MultiSuggestionClearProps,
  type MultiSuggestionEmptyProps,
  type MultiSuggestionInputProps,
  type MultiSuggestionListProps,
  type MultiSuggestionOptionProps,
};
