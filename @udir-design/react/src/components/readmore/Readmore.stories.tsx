import type { Meta, StoryObj } from '@storybook/react-vite';
import { Readmore } from './Readmore';

const meta: Meta<typeof Readmore> = {
  component: Readmore,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Readmore>;

export const Preview: Story = {
  render: (args) => <Readmore {...args} />,
};
