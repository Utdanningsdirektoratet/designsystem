import { Header as HeaderRoot } from './Header';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderNavigation } from './headerNavigation';
import { HeaderSearch } from './HeaderSearch';
import { HeaderThemeMenuButton } from './HeaderThemeMenuButton';
import { HeaderUserButton } from './HeaderUserButton';

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
Header.Menu.displayName = 'Header.Menu';
Header.Navigation.displayName = 'Header.Navigation';

export type { HeaderProps } from './Header';
export type { HeaderUserButtonProps } from './HeaderUserButton';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderThemeMenuButtonProps } from './HeaderThemeMenuButton';
export type { HeaderNavigationProps } from './headerNavigation';
export type { HeaderMenuProps } from './HeaderMenu';
export type { HeaderSearchProps } from './HeaderSearch';
export {
  Header,
  HeaderUserButton,
  HeaderMenuButton,
  HeaderThemeMenuButton,
  HeaderNavigation,
  HeaderMenu,
  HeaderSearch,
};
