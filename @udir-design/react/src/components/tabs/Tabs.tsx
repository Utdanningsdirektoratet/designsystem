import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@digdir/designsystemet-react';
import './tabs.css';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Tabs.displayName = 'Tabs';

export { Tabs, TabsList, TabsPanel, TabsTab };
export type {
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TabsTabProps,
} from '@digdir/designsystemet-react';
