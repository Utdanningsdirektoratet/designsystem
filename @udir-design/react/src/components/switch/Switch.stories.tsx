import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Preview: Story = {
  args: {
    label: 'En bryter',
  },
  render: (args, context) => <Switch {...args} id={context.id} />,
};
