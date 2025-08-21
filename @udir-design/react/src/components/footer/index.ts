import { Footer as FooterRoot } from './Footer';
import { FooterItem } from './Footer-item';
import { FooterList } from './Footer-list';

type Footer = typeof FooterRoot & {
  /**
   * Footer.List component, used to display a list of links in the Footer.
   *
   * @example
   * <Footer>
   *  <Footer.List>
   *    <Footer.Item>
   *    </Footer.Item>
   *  </Footer.List>
   * </Footer>
   */
  List: typeof FooterList;
  /**
   * Footer.Item component, used to display an item, a link, in the Footer. Used within a Footer.List.
   *
   * @example
   * <Footer>
   *  <Footer.List>
   *    <Footer.Item href="#">
   *      Link
   *    </Footer.Item>
   *  </Footer.List>
   * </Footer>
   */
  Item: typeof FooterItem;
};

const FooterComponent: Footer = Object.assign(FooterRoot, {
  List: FooterList,
  Item: FooterItem,
});

FooterComponent.List.displayName = 'Footer.List';
FooterComponent.Item.displayName = 'Footer.Item';

export type { FooterProps } from './Footer';
export type { FooterItemProps } from './Footer-item';
export type { FooterListProps } from './Footer-list';
export { FooterComponent as Footer, FooterList, FooterItem };
