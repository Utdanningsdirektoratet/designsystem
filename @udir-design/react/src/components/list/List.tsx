import {
  List,
  ListItem,
  type ListItemProps,
  ListOrdered,
  type ListOrderedProps,
  ListUnordered,
  type ListUnorderedProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
List.Item.displayName = 'List.Item';

export {
  List,
  ListItem,
  ListItemProps,
  ListOrdered,
  ListOrderedProps,
  ListUnordered,
  ListUnorderedProps,
};
