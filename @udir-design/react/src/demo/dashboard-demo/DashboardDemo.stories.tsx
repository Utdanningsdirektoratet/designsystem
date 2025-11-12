import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { demoParameters } from '../demoParameters';
import { DashboardDemo } from './DashboardDemo';

const meta: Meta<typeof DashboardDemo> = {
  title: 'demo/Dashboard Demo',
  component: DashboardDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardDemo>;

export const DashboardStory: Story = {
  args: {
    'data-size': 'md',
  },
  render: function Render(args) {
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
    return (
      <DashboardDemo
        {...args}
        data-color-scheme={colorMode}
        setColorMode={setColorMode}
      />
    );
  },
};

export const DashboardPage2: Story = {
  ...DashboardStory,
  args: {
    page: 'tests',
  },
};

export const DashboardPage3: Story = {
  ...DashboardStory,
  args: {
    page: 'test-answers',
  },
};

export const DashboardPage4: Story = {
  ...DashboardStory,
  args: {
    page: 'settings',
  },
};
