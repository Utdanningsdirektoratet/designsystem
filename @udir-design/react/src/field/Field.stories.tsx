import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';
import { Label } from '../typography/label/Label';
import { Textarea } from '@digdir/designsystemet-react';

const meta: Meta<typeof Field> = {
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Preview: Story = {
  render: (args) => (
    <Field {...args}>
      <Label>Label</Label>
      <Field.Description>Description</Field.Description>
      <Textarea />
    </Field>
  ),
};
