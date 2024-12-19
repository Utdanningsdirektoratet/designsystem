import type { Meta, StoryObj } from '@storybook/react';
import { Textfield } from './Textfield';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const Preview: Story = {
  args: {},
};
