import { Footer as FooterRoot } from './Footer';
import { FooterItem } from './FooterItem';
import { FooterList } from './FooterList';

type Footer = typeof FooterRoot & {
  List: typeof FooterList;
  Item: typeof FooterItem;
};

const Footer: Footer = Object.assign(FooterRoot, {
  List: FooterList,
  Item: FooterItem,
});

Footer.displayName = 'Footer';

export type { FooterProps } from './Footer';
export type { FooterItemProps } from './FooterItem';
export type { FooterListProps } from './FooterList';
export { Footer, FooterList, FooterItem };
