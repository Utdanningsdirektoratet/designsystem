import { Footer as FooterRoot } from './Footer';
import { FooterItem } from './FooterItem';
import { FooterList } from './FooterList';

type FooterProps = typeof FooterRoot & {
  List: typeof FooterList;
  Item: typeof FooterItem;
};

const Footer: FooterProps = Object.assign(FooterRoot, {
  List: FooterList,
  Item: FooterItem,
});

Footer.List.displayName = 'Footer.List';
Footer.Item.displayName = 'Footer.Item';

export type { FooterProps } from './Footer';
export type { FooterItemProps } from './FooterItem';
export type { FooterListProps } from './FooterList';
export { Footer, FooterList, FooterItem };
