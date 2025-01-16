import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Preview: Story = {
  args: {
    label: 'Checkbox label',
  },
  render: (args, context) => <Checkbox {...args} id={context.id} />,
};
