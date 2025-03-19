import {
  ToggleGroup as DigdirToggleGroup,
  type ToggleGroupProps as DigdirToggleGroupProps,
  ToggleGroupItem,
  type ToggleGroupItemProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type ToggleGroupProps = Omit<DigdirToggleGroupProps, 'data-color'>;

const ToggleGroup =
  DigdirToggleGroup as ForwardRefExoticComponent<ToggleGroupProps> &
    Pick<typeof DigdirToggleGroup, 'Item'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ToggleGroup.displayName = 'ToggleGroup';
export { ToggleGroup, ToggleGroupProps, ToggleGroupItem, ToggleGroupItemProps };
