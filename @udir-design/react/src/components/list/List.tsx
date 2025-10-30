import {
  List as DigdirList,
  ListItem,
  type ListItemProps,
  ListOrdered as DigdirListOrdered,
  type ListOrderedProps as DigdirListOrderedProps,
  ListUnordered as DigdirListUnordered,
  type ListUnorderedProps as DigdirListUnorderedProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type ListOrderedProps = Omit<DigdirListOrderedProps, 'data-color'>;
type ListUnorderedProps = Omit<DigdirListUnorderedProps, 'data-color'>;

const ListOrdered = DigdirListOrdered as ForwardRefExoticComponent<
  ListOrderedProps & RefAttributes<ComponentRef<typeof DigdirListOrdered>>
>;
const ListUnordered = DigdirListUnordered as ForwardRefExoticComponent<
  ListUnorderedProps & RefAttributes<ComponentRef<typeof DigdirListUnordered>>
>;

const List = Object.assign(DigdirList, {
  Item: ListItem,
  Ordered: ListOrdered,
  Unordered: ListUnordered,
});

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
List.Item.displayName = 'List.Item';

export { List, ListItem, ListOrdered, ListUnordered };
export type { ListItemProps, ListOrderedProps, ListUnorderedProps };
