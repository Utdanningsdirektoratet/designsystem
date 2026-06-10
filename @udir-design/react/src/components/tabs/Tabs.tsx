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
import { type ComponentRef, type Ref, forwardRef } from 'react';

type TabsProps = Omit<DigdirTabsProps, 'data-color'> & {
  /**
   * Change the color scheme of the tabs
   */
  'data-color'?: 'neutral' | 'accent';
  /**
   * Change the visual style of the tabs
   * @default undefined
   */
  variant?: 'default' | 'card' | 'filled' | 'vertical';
};

const Tabs = Object.assign(
  forwardRef<ComponentRef<typeof DigdirTabs>, TabsProps>(function Tabs(
    { variant, ...rest },
    ref,
  ) {
    return (
      <DigdirTabs
        ref={ref as Ref<ComponentRef<typeof DigdirTabs>>}
        data-variant={variant}
        {...rest}
      />
    );
  }),
  {
    displayName: 'Tabs',
    List: DigdirTabs.List,
    Tab: DigdirTabs.Tab,
    Panel: DigdirTabs.Panel,
  },
);

export type { TabsListProps, TabsPanelProps, TabsProps, TabsTabProps };
export { Tabs, TabsList, TabsPanel, TabsTab };
