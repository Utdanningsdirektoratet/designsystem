import {
  Dropdown as DigdirDropdown,
  DropdownButton,
  type DropdownButtonProps,
  DropdownHeading,
  type DropdownHeadingProps,
  DropdownItem,
  type DropdownItemProps,
  DropdownList,
  type DropdownListProps,
  type DropdownProps as DigdirDropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
  type DropdownTriggerContextProps,
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
  DropdownButton,
  DropdownButtonProps,
  DropdownHeading,
  DropdownHeadingProps,
  DropdownItem,
  DropdownItemProps,
  DropdownList,
  DropdownListProps,
  DropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
  DropdownTriggerContextProps,
};
