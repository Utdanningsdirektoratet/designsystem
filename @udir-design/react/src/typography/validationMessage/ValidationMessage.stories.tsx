import type { Meta, StoryObj } from '@storybook/react';
import { ValidationMessage } from './ValidationMessage';

const meta: Meta<typeof ValidationMessage> = {
  component: ValidationMessage,
};

export default meta;
type Story = StoryObj<typeof ValidationMessage>;

export const Preview: Story = {
  args: {
    children: 'ValidationMessage',
  },
};
