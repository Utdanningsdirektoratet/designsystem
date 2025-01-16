import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  component: Divider,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Preview: Story = {};
