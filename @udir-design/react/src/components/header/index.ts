import { Header as HeaderRoot } from './Header';
import { HeaderMenu } from './Header-menu';
import { HeaderMenuButton } from './Header-menu-button';
import { HeaderSearch } from './Header-search';
import { HeaderUserButton } from './Header-user-button';

type HeaderProps = typeof HeaderRoot & {
  UserButton: typeof HeaderUserButton;
  MenuButton: typeof HeaderMenuButton;
  Menu: typeof HeaderMenu;
  Search: typeof HeaderSearch;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  UserButton: HeaderUserButton,
  MenuButton: HeaderMenuButton,
  Menu: HeaderMenu,
  Search: HeaderSearch,
});

Header.UserButton.displayName = 'Header.UserButton';
Header.Menu.displayName = 'Header.Menu';

export type { HeaderProps } from './Header';
export type { HeaderUserButtonProps } from './Header-user-button';
export type { HeaderMenuButtonProps } from './Header-menu-button';
export type { HeaderMenuProps } from './Header-menu';
export type { HeaderSearchProps } from './Header-search';
export { Header, HeaderUserButton, HeaderMenuButton, HeaderMenu, HeaderSearch };
