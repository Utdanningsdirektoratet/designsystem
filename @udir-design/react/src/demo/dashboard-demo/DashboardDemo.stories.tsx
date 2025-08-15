import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardDemo } from './DashboardDemo';
import { useState } from 'react';
import { Divider, Size } from '@digdir/designsystemet-react';
import { Controls } from '../controls/Controls';

const meta: Meta<typeof DashboardDemo> = {
  title: 'Demo/Dashboard Demo',
  component: DashboardDemo,
};

export default meta;
type Story = StoryObj<typeof DashboardDemo>;

export const DashboardStory: Story = {
  parameters: {
    customStyles: {
      padding: 0,
    },
  },
  render: function Render(args) {
    const [size, setSize] = useState<Size>('sm');
    const [colorMode, setColorMode] = useState('auto');
    return (
      <div>
        <Controls
          size={size}
          colorMode={colorMode}
          setSize={setSize}
          setColorMode={setColorMode}
        />
        <Divider />
        <DashboardDemo
          {...args}
          data-size={size}
          data-color-scheme={colorMode}
          setColorMode={setColorMode}
        />
      </div>
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
