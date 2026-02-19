import './demoSizing.css';
import type { ComponentProps, FunctionComponent } from 'react';
import { useState } from 'react';
import preview from '.storybook/preview';
import { demoParameters } from './demoParameters';
import { DashboardDemo } from './pages/dashboard-demo/DashboardDemo';

const meta = preview.meta({
  title: 'demo/Dashboard Demo',
  component: DashboardDemo as FunctionComponent<
    Omit<ComponentProps<typeof DashboardDemo>, 'setColorMode'>
  >,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const DashboardStory = meta.story({
  render: (args) => {
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
    return (
      <DashboardDemo
        {...args}
        data-color-scheme={colorMode}
        setColorMode={setColorMode}
      />
    );
  },
});

export const DashboardPage2 = DashboardStory.extend({
  args: {
    page: 'tests',
  },
});

export const DashboardPage3 = DashboardStory.extend({
  args: {
    page: 'test-answers',
  },
});

export const DashboardPage4 = DashboardStory.extend({
  args: {
    page: 'settings',
  },
});
