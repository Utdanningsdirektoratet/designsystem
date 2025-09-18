import { HeaderNavigation as HeaderNavigationRoot } from './HeaderNavigation';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type HeaderNavigationType = typeof HeaderNavigationRoot & {
  Item: typeof HeaderNavigationItem;
};

const HeaderNavigation: HeaderNavigationType = Object.assign(
  HeaderNavigationRoot,
  {
    Item: HeaderNavigationItem,
  },
);

export type { HeaderNavigationProps } from './HeaderNavigation';
export type { HeaderNavigationItemProps } from './HeaderNavigationItem';
export { HeaderNavigation, HeaderNavigationItem };
