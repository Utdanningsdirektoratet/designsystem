import {
  ToggleGroup as DigdirToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps as DigdirToggleGroupProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import './togglegroup.css';

type ToggleGroupProps = Omit<DigdirToggleGroupProps, 'data-color'>;

const ToggleGroup = DigdirToggleGroup as ForwardRefExoticComponent<
  ToggleGroupProps & RefAttributes<ComponentRef<typeof DigdirToggleGroup>>
> &
  Pick<typeof DigdirToggleGroup, 'Item'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ToggleGroup.displayName = 'ToggleGroup';

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps };
export type { ToggleGroupItemProps } from '@digdir/designsystemet-react';
