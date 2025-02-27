import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Preview: Story = {
  args: {
    label: 'Radioknapp',
  },
  render: (args, context) => <Radio {...args} id={context.id} />,
};
