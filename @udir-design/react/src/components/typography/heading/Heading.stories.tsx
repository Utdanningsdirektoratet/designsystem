import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  tags: ['alpha', '!autodocs'],
  title: 'Components/Typography/Heading',
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Preview: Story = {
  args: {
    children: 'Heading',
  },
};
