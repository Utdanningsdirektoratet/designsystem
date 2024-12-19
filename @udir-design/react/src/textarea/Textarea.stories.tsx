import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { Label } from '../typography/label/Label';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Label htmlFor="my-textarea">Label</Label>
      <Textarea id="my-textarea" {...args} />
    </>
  ),
};
