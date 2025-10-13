import {
  Dropdown as DigdirDropdown,
  type DropdownProps as DigdirDropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
  type DropdownTriggerContextProps,
  DropdownHeading,
  type DropdownHeadingProps,
  DropdownItem,
  type DropdownItemProps,
  DropdownList,
  type DropdownListProps,
  DropdownButton,
  type DropdownButtonProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import './dropdown.css';

type DropdownProps = Omit<DigdirDropdownProps, 'data-color'>;

const Dropdown = DigdirDropdown as ForwardRefExoticComponent<
  DropdownProps & RefAttributes<ComponentRef<typeof DigdirDropdown>>
> &
  Pick<
    typeof DigdirDropdown,
    'TriggerContext' | 'Trigger' | 'List' | 'Item' | 'Heading' | 'Button'
  >;

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
  DropdownButton,
  DropdownButtonProps,
  DropdownList,
  DropdownListProps,
};
