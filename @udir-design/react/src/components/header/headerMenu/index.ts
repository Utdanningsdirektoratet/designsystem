import { HeaderMenu as HeaderMenuRoot } from './HeaderMenu';
import { HeaderMenuLink } from './HeaderMenuLink';

type HeaderMenuType = typeof HeaderMenuRoot & {
  Link: typeof HeaderMenuLink;
};

const HeaderMenu: HeaderMenuType = Object.assign(HeaderMenuRoot, {
  Link: HeaderMenuLink,
});

HeaderMenu.Link.displayName = 'Header.Menu.Link';

export type { HeaderMenuProps } from './HeaderMenu';
export type { HeaderMenuLinkProps } from './HeaderMenuLink';
export { HeaderMenu, HeaderMenuLink };
