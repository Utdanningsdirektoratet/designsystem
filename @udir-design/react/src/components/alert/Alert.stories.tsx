import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Preview: Story = {
  args: {
    children: 'En beskjed det er viktig at brukeren ser',
  },
};
