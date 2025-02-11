import {
  Tabs,
  type TabsProps,
  TabsTab,
  type TabsTabProps,
  TabsPanel,
  type TabsPanelProps,
  TabsList,
  type TabsListProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Tabs.displayName = 'Tabs';

export {
  Tabs,
  TabsProps,
  TabsTab,
  TabsTabProps,
  TabsPanel,
  TabsPanelProps,
  TabsList,
  TabsListProps,
};
