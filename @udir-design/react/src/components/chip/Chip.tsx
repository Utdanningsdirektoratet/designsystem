import {
  Chip,
  ChipButton,
  type ChipButtonProps,
  ChipCheckbox,
  type ChipCheckboxProps,
  ChipRadio,
  type ChipRadioProps,
  ChipRemovable,
  type ChipRemovableProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Chip.Button.displayName = 'Chip.Button';

export {
  Chip,
  ChipButton,
  ChipButtonProps,
  ChipCheckbox,
  ChipCheckboxProps,
  ChipRadio,
  ChipRadioProps,
  ChipRemovable,
  ChipRemovableProps,
};
