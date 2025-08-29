import { Footer as FooterRoot } from './Footer';
import { FooterItem } from './Footer-item';
import { FooterList } from './Footer-list';

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
export type { FooterItemProps } from './Footer-item';
export type { FooterListProps } from './Footer-list';
export { Footer, FooterList, FooterItem };
