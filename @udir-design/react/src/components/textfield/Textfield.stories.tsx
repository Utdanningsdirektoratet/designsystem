import type { Meta, StoryObj } from '@storybook/react';
import { Textfield } from './Textfield';
import { Label } from '../typography/label/Label';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Label htmlFor="my-textfield">Label</Label>
      <Textfield id="my-textfield" {...args} />
    </>
  ),
};
