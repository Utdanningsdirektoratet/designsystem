import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableDemo } from './TableDemo';
import { demoParameters } from '../demoParameters';

const meta: Meta<typeof TableDemo> = {
  title: 'demo/Table Demo',
  component: TableDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
      demo: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

export const TableStory: Story = {
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  render(args) {
    return <TableDemo {...args} />;
  },
};
