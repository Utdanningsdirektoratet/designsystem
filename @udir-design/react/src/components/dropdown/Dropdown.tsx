import {
  Dropdown,
  type DropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
  type DropdownTriggerContextProps,
  DropdownHeading,
  type DropdownHeadingProps,
  DropdownItem,
  type DropdownItemProps,
  DropdownList,
  type DropdownListProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Dropdown.displayName = 'Dropdown';

export {
  Dropdown,
  DropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
  DropdownTriggerContextProps,
  DropdownHeading,
  DropdownHeadingProps,
  DropdownItem,
  DropdownItemProps,
  DropdownList,
  DropdownListProps,
};
