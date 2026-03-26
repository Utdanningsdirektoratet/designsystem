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

// This doesn't help with Storybook's code preview for some reason, it's still displayed as ChipButton etc :(
Chip.Button.displayName = 'Chip.Button';
Chip.Checkbox.displayName = 'Chip.Checkbox';
Chip.Radio.displayName = 'Chip.Radio';
Chip.Removable.displayName = 'Chip.Removable';

export type {
  ChipButtonProps,
  ChipCheckboxProps,
  ChipRadioProps,
  ChipRemovableProps,
};
export { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable };
