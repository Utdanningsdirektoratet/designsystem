import { Header as HeaderRoot } from './Header';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuButton } from './HeaderMenuButton';
import { HeaderSearch } from './HeaderSearch';
import { HeaderUserButton } from './HeaderUserButton';

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
export type { HeaderUserButtonProps } from './HeaderUserButton';
export type { HeaderMenuButtonProps } from './HeaderMenuButton';
export type { HeaderMenuProps } from './HeaderMenu';
export type { HeaderSearchProps } from './HeaderSearch';
export { Header, HeaderUserButton, HeaderMenuButton, HeaderMenu, HeaderSearch };
