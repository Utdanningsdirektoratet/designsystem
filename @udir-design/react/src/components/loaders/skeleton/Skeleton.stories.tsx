import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Preview: Story = {
  args: {},
};
