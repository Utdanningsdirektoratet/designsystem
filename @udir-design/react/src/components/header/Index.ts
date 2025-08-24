import { Header as HeaderRoot } from './Header';
import { HeaderItem } from './Header-item';
import { HeaderMenu } from './Header-menu';
import { HeaderMenuButton } from './Header-menu-button';
import { HeaderSearch } from './Header-search';
import { HeaderUserButton } from './Header-user-button';

type HeaderProps = typeof HeaderRoot & {
  UserButton: typeof HeaderUserButton;
  MenuButton: typeof HeaderMenuButton;
  Menu: typeof HeaderMenu;
  Search: typeof HeaderSearch;
  Item: typeof HeaderItem;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  UserButton: HeaderUserButton,
  MenuButton: HeaderMenuButton,
  Menu: HeaderMenu,
  Search: HeaderSearch,
  Item: HeaderItem,
});

Header.UserButton.displayName = 'Header.UserButton';
Header.Menu.displayName = 'Header.Menu';

export type { HeaderProps } from './Header';
export {
  Header,
  HeaderUserButton,
  HeaderMenuButton,
  HeaderMenu,
  HeaderSearch,
  HeaderItem,
};
