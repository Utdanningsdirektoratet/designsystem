import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip.Button> = {
  component: Chip.Button,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Chip.Button>;

export const Preview: Story = {
  args: {
    children: 'Chip.Button',
  },
};
