import type { Meta, StoryObj } from '@storybook/react-vite';
import { demoParameters } from '../demoParameters';
import { TableDemo } from './TableDemo';

const meta: Meta<typeof TableDemo> = {
  title: 'demo/Table Demo',
  component: TableDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

export const TableStory: Story = {
  args: {
    'data-color-scheme': 'light',
  },
  render(args) {
    return <TableDemo {...args} />;
  },
};
