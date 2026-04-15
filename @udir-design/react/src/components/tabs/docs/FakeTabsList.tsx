import type { FunctionComponent, ReactNode } from 'react';
import type { TabsListProps } from '../Tabs';

/**
 * This component only exists to add relevant html props for TabsList
 */
export const TabsList: FunctionComponent<
  TabsListProps & {
    /** Should be one or more Tabs.Tab elements */
    children?: ReactNode;
  }
> = () => null;
