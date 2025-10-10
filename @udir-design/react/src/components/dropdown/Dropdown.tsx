import {
  Dropdown as DigdirDropdown,
  type DropdownProps as DigdirDropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
  DropdownHeading,
  DropdownItem,
  DropdownList,
  DropdownButton,
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
  DropdownTrigger,
  DropdownTriggerContext,
  DropdownHeading,
  DropdownItem,
  DropdownButton,
  DropdownList,
};
export type {
  DropdownProps,
  DropdownTriggerContextProps,
  DropdownHeadingProps,
  DropdownItemProps,
  DropdownButtonProps,
  DropdownListProps,
} from '@digdir/designsystemet-react';
