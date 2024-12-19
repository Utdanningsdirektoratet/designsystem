import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Preview: Story = {
  args: {},
};
