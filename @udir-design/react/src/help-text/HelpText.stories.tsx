import type { Meta, StoryObj } from '@storybook/react';
import { HelpText } from './HelpText';

const meta: Meta<typeof HelpText> = {
  title: 'HelpText',
  component: HelpText,
};

export default meta;
type Story = StoryObj<typeof HelpText>;

export const Preview: Story = {
  args: {
    'aria-label': 'Help text title',
    children: 'Help text content',
  },
};
