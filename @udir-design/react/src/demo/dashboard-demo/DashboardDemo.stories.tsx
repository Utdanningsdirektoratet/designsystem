import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardDemo } from './DashboardDemo';
import { useState } from 'react';
import { Size } from '@digdir/designsystemet-react';
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
