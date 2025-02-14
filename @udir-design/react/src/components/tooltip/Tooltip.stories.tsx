import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Preview: Story = {
  args: {
    content: 'Tooltip tekst',
    children: <Button>Hold peker over meg</Button>,
  },
};
