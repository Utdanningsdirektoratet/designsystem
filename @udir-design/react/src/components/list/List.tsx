import {
  List as DigdirList,
  ListItem,
  type ListItemProps,
  ListOrdered as DigdirListOrdered,
  type ListOrderedProps as DigdirListOrderedProps,
  ListUnordered as DigdirListUnordered,
  type ListUnorderedProps as DigdirListUnorderedProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type ListOrderedProps = Omit<DigdirListOrderedProps, 'data-color'>;
type ListUnorderedProps = Omit<DigdirListUnorderedProps, 'data-color'>;

const ListOrdered =
  DigdirListOrdered as ForwardRefExoticComponent<ListOrderedProps>;
const ListUnordered =
  DigdirListUnordered as ForwardRefExoticComponent<ListUnorderedProps>;

const List = Object.assign(DigdirList, {
  Item: ListItem,
  Ordered: ListOrdered,
  Unordered: ListUnordered,
});

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
