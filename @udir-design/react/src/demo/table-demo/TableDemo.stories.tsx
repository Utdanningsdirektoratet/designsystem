import type { Meta, StoryObj } from '@storybook/react';
import { TableDemo } from './TableDemo';
import { useState } from 'react';
import { Size } from '@digdir/designsystemet-react';
import { Controls } from '../controls/Controls';

const meta: Meta<typeof TableDemo> = {
  title: 'demo/Table Demo',
  component: TableDemo,
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

export const TableStory: Story = {
  parameters: {
    customStyles: {
      padding: 0,
    },
  },
  render(args) {
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
        <TableDemo {...args} data-size={size} data-color-scheme={colorMode} />
      </div>
    );
  },
};
