import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Preview: Story = {
  args: {
    label: 'Radioknapp',
  },
};
