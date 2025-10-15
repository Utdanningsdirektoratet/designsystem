import { Header as HeaderRoot } from './Header';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderSearch } from './HeaderSearch';
import { HeaderThemeMenuButton } from './HeaderThemeMenuButton';
import { HeaderUserButton } from './HeaderUserButton';
import { HeaderNavigation } from './headerNavigation';

type HeaderProps = typeof HeaderRoot & {
  UserButton: typeof HeaderUserButton;
  MenuButton: typeof HeaderMenuButton;
  ThemeMenuButton: typeof HeaderThemeMenuButton;
  Navigation: typeof HeaderNavigation;
  Menu: typeof HeaderMenu;
  Search: typeof HeaderSearch;
};

const Header: HeaderProps = Object.assign(HeaderRoot, {
  UserButton: HeaderUserButton,
  MenuButton: HeaderMenuButton,
  ThemeMenuButton: HeaderThemeMenuButton,
  Navigation: HeaderNavigation,
  Menu: HeaderMenu,
  Search: HeaderSearch,
});

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
export type { HeaderMenuProps } from './HeaderMenu';
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
