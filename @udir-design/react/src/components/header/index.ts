import { Header as HeaderRoot } from './Header';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderSearch } from './HeaderSearch';
import { HeaderThemeMenuButton } from './HeaderThemeMenuButton';
import { HeaderUserButton } from './HeaderUserButton';
import { HeaderMenu } from './headerMenu';
import { HeaderNavigation } from './headerNavigation';

type Header = typeof HeaderRoot & {
  UserButton: typeof HeaderUserButton;
  MenuButton: typeof HeaderMenuButton;
  ThemeMenuButton: typeof HeaderThemeMenuButton;
  Navigation: typeof HeaderNavigation;
  Menu: typeof HeaderMenu;
  Search: typeof HeaderSearch;
};

const Header: Header = Object.assign(HeaderRoot, {
  UserButton: HeaderUserButton,
  MenuButton: HeaderMenuButton,
  ThemeMenuButton: HeaderThemeMenuButton,
  Navigation: HeaderNavigation,
  Menu: HeaderMenu,
  Search: HeaderSearch,
});

Header.displayName = 'Header';
Header.UserButton.displayName = 'Header.UserButton';
Header.MenuButton.displayName = 'Header.MenuButton';
Header.ThemeMenuButton.displayName = 'Header.ThemeMenuButton';
Header.Navigation.displayName = 'Header.Navigation';
Header.Menu.displayName = 'Header.Menu';
Header.Search.displayName = 'Header.Search';

export type { HeaderProps } from './Header';
export type { HeaderUserButtonProps } from './HeaderUserButton';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderThemeMenuButtonProps } from './HeaderThemeMenuButton';
export type { HeaderNavigationProps } from './headerNavigation';
export type { HeaderMenuProps } from './headerMenu';
export type { HeaderSearchProps } from './HeaderSearch';
export {
  Header,
  HeaderMenu,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderSearch,
  HeaderThemeMenuButton,
  HeaderUserButton,
};
