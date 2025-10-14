import {
  Tabs,
  TabsList,
  type TabsListProps,
  TabsPanel,
  type TabsPanelProps,
  type TabsProps,
  TabsTab,
  type TabsTabProps,
} from '@digdir/designsystemet-react';
import './tabs.css';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Tabs.displayName = 'Tabs';

export {
  Tabs,
  TabsList,
  TabsListProps,
  TabsPanel,
  TabsPanelProps,
  TabsProps,
  TabsTab,
  TabsTabProps,
};
