import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['alpha'],
  parameters: {
    customStyles: { margin: '2rem' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Preview: Story = {
  args: {
    content: 'Tooltip tekst',
    children: <Button>Hold peker over meg</Button>,
  },
};

export const WithString: Story = {
  args: {
    content: 'Tooltip text',
    children: 'Hold peker over meg',
  },
};

export const Placement: Story = {
  args: {
    content: 'Tooltip text',
    placement: 'bottom',
    children: 'Hold peker over meg',
  },
};
