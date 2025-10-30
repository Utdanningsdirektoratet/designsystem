import {
  Chip,
  ChipButton,
  ChipCheckbox,
  ChipRadio,
  ChipRemovable,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Chip.Button.displayName = 'Chip.Button';

export { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable };
export type {
  ChipButtonProps,
  ChipCheckboxProps,
  ChipRadioProps,
  ChipRemovableProps,
} from '@digdir/designsystemet-react';
