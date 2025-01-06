import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Preview: Story = {
  args: {},
};
