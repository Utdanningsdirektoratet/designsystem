import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationMessage } from './ValidationMessage';

const meta: Meta<typeof ValidationMessage> = {
  component: ValidationMessage,
  tags: ['alpha', '!autodocs'],
  title: 'Components/Typography/ValidationMessage',
};

export default meta;
type Story = StoryObj<typeof ValidationMessage>;

export const Preview: Story = {
  args: {
    children: 'Dette er en valideringsmelding.',
  },
};
