import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Preview: Story = {
  render: (args) => (
    <Popover.TriggerContext>
      <Popover.Trigger>My trigger!</Popover.Trigger>
      <Popover {...args}>popover content</Popover>
    </Popover.TriggerContext>
  ),
};
