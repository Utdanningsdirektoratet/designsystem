import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  component: Paragraph,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Preview: Story = {
  args: {
    children: 'Paragraph',
  },
};
