import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Preview: Story = {
  args: {
    'aria-label': 'Laster...',
  },
};
