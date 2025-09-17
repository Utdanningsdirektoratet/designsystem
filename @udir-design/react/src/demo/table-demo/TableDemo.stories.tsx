import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableDemo } from './TableDemo';
import { demoChromaticModes } from '../demoChromaticModes';

const meta: Meta<typeof TableDemo> = {
  title: 'demo/Table Demo',
  component: TableDemo,
  parameters: {
    chromatic: { modes: demoChromaticModes },
  },
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

export const TableStory: Story = {
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
  },
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  render(args) {
    return <TableDemo {...args} />;
  },
};
