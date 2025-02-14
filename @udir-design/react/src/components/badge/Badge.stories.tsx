import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Preview: Story = {
  args: {
    count: 10,
    maxCount: 9,
  },
};
