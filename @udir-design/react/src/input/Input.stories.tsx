import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Field } from '../field/Field';
import { Label } from '@digdir/designsystemet-react';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Preview: Story = {
  render: (args) => (
    <Field>
      <Label>Input 1</Label>
      <Input {...args} />
    </Field>
  ),
};
