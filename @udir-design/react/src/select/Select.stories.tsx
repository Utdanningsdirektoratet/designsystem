import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { Label } from '../typography/label/Label';
import { Field } from '../field/Field';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Preview: Story = {
  render: (args) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args}>
        <Select.Option value="blank">Velg …</Select.Option>
        <Select.Option value="everest">Mount Everest</Select.Option>
        <Select.Option value="aconcagua">Aconcagua</Select.Option>
        <Select.Option value="denali">Denali</Select.Option>
        <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        <Select.Option value="elbrus">Elbrus</Select.Option>
        <Select.Option value="vinson">Mount Vinson</Select.Option>
        <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
        <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
      </Select>
    </Field>
  ),
};
