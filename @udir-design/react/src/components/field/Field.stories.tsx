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
  render: (args, context) => (
    <Field {...args} id={context.id}>
      <Label htmlFor="my-textarea">Label</Label>
      <Field.Description>Description</Field.Description>
      <Textarea id="my-textarea" />
    </Field>
  ),
};
