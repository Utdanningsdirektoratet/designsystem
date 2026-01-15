import {
  Tabs as DigdirTabs,
  TabsList,
  type TabsListProps,
  TabsPanel,
  type TabsPanelProps,
  type TabsProps as DigdirTabsProps,
  TabsTab,
  type TabsTabProps,
} from '@digdir/designsystemet-react';
import './tabs.css';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type TabsProps = Omit<DigdirTabsProps, 'data-color'> & {
  /**
   * Change the color scheme of the button
   */
  'data-color'?: 'neutral' | 'accent';
};

const Tabs = DigdirTabs as ForwardRefExoticComponent<
  TabsProps & RefAttributes<ComponentRef<typeof DigdirTabs>>
> &
  Pick<typeof DigdirTabs, 'List' | 'Tab' | 'Panel'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Tabs.displayName = 'Tabs';

export type { TabsListProps, TabsPanelProps, TabsProps, TabsTabProps };
export { Tabs, TabsList, TabsPanel, TabsTab };
