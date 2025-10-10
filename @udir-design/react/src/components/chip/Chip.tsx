import {
  Chip as ChipRoot,
  ChipButton,
  ChipCheckbox,
  ChipRadio,
  ChipRemovable,
} from '@digdir/designsystemet-react';

type Chip = typeof ChipRoot;

const Chip: Chip = Object.assign(ChipRoot, {
  Button: ChipButton,
  Checkbox: ChipCheckbox,
  Radio: ChipRadio,
  Removable: ChipRemovable,
});

Chip.Button.displayName = 'Chip.Button';

export { Chip, ChipButton, ChipCheckbox, ChipRadio, ChipRemovable };
export type {
  ChipButtonProps,
  ChipCheckboxProps,
  ChipRadioProps,
  ChipRemovableProps,
} from '@digdir/designsystemet-react';
