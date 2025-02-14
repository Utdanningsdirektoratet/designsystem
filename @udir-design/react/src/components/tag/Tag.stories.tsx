import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Preview: Story = {
  args: {
    children: 'Ny',
  },
};
