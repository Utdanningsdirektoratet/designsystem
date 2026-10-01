import {
  EXPERIMENTAL_Suggestion as DigdirSuggestion,
  EXPERIMENTAL_SuggestionClear as SuggestionClear,
  EXPERIMENTAL_SuggestionEmpty as SuggestionEmpty,
  EXPERIMENTAL_SuggestionInput as SuggestionInput,
  EXPERIMENTAL_SuggestionList as SuggestionList,
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
  type SuggestionToggleProps as DigdirSuggestionToggleProps,
} from '@digdir/designsystemet-react';
import {
  type ComponentRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
  useEffect,
} from 'react';
import { patchSuggestionSelection } from './patchSuggestionSelection';
import './suggestion.css';
import './translations.css';

type SuggestionToggleProps = Omit<DigdirSuggestionToggleProps, 'aria-label'> & {
  /**
   * Aria label for the toggle button
   * @default `--dsc-suggestion-sr-toggle` ("Valg" in bokmål)
   */
  'aria-label'?: string;
};

/* Digdir's toggle defaults `aria-label` to "Valg" regardless of language. u-combobox fills
   in an empty `aria-label` from `--dsc-suggestion-sr-toggle` / `data-sr-toggle`, so pass ""
   instead to let the label follow `lang` like the other screen reader texts. */
const SuggestionToggle = forwardRef<
  ComponentRef<typeof DigdirSuggestionToggle>,
  SuggestionToggleProps
>(function SuggestionToggle({ 'aria-label': ariaLabel = '', ...rest }, ref) {
  return <DigdirSuggestionToggle {...rest} aria-label={ariaLabel} ref={ref} />;
});

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

  useEffect(patchSuggestionSelection, []);

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
