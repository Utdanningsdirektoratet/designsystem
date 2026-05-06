import type { FunctionComponent, ReactNode } from 'react';
import type { HeaderNavigationItemProps } from '../headerNavigation/index';

/**
 * This component only exists to add relevant html props for HeaderNavigationItem
 */
export const HeaderNavigationItem: FunctionComponent<
  HeaderNavigationItemProps & {
    /** Should be one or more Header.Navigation.Item elements */
    children?: ReactNode;
  }
> = () => null;
