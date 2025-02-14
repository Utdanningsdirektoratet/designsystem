import {
  ToggleGroup,
  type ToggleGroupProps,
  ToggleGroupItem,
  type ToggleGroupItemProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ToggleGroup.displayName = 'ToggleGroup';

export { ToggleGroup, ToggleGroupProps, ToggleGroupItem, ToggleGroupItemProps };
