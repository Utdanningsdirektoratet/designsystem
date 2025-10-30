import {
  Dropdown as DigdirDropdown,
  DropdownButton,
  DropdownHeading,
  DropdownItem,
  DropdownList,
  type DropdownProps as DigdirDropdownProps,
  DropdownTrigger,
  DropdownTriggerContext,
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
  DropdownHeading,
  DropdownItem,
  DropdownList,
  DropdownTrigger,
  DropdownTriggerContext,
};
export type {
  DropdownButtonProps,
  DropdownHeadingProps,
  DropdownItemProps,
  DropdownListProps,
  DropdownProps,
  DropdownTriggerContextProps,
} from '@digdir/designsystemet-react';
