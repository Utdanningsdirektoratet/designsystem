import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Preview: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
  },
};
