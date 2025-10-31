import {
  ToggleGroup as DigdirToggleGroup,
  ToggleGroupItem,
  type ToggleGroupItemProps,
  type ToggleGroupProps as DigdirToggleGroupProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import './togglegroup.css';

type ToggleGroupProps = Omit<DigdirToggleGroupProps, 'data-color'>;

const ToggleGroup = DigdirToggleGroup as ForwardRefExoticComponent<
  ToggleGroupProps & RefAttributes<ComponentRef<typeof DigdirToggleGroup>>
> &
  Pick<typeof DigdirToggleGroup, 'Item'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ToggleGroup.displayName = 'ToggleGroup';
export type { ToggleGroupItemProps, ToggleGroupProps };
export { ToggleGroup, ToggleGroupItem };
