import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { Label } from '../typography/label/Label';
import { Field } from '../field/Field';
import { ValidationMessage } from '../alpha';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['alpha'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Preview: Story = {
  args: {
    'aria-invalid': false,
    width: 'full',
    disabled: false,
    readOnly: false,
  },
  render: (args, context) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args} defaultValue="" id={context.id}>
        <Select.Option value="">Velg et fjell &hellip;</Select.Option>
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args}>
        <Select.Option value="blank">Velg &hellip;</Select.Option>
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

export const WithError: Story = {
  args: {
    'aria-invalid': true,
  },
  render: (args) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args}>
        <Select.Option value="blank">Velg &hellip;</Select.Option>
        <Select.Option value="everest">Mount Everest</Select.Option>
        <Select.Option value="aconcagua">Aconcagua</Select.Option>
        <Select.Option value="denali">Denali</Select.Option>
        <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        <Select.Option value="elbrus">Elbrus</Select.Option>
        <Select.Option value="vinson">Mount Vinson</Select.Option>
        <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
        <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
      </Select>
      <ValidationMessage>Velg et fjell</ValidationMessage>
    </Field>
  ),
};

export const WithOptgroup: Story = {
  render: (args) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args}>
        <Select.Optgroup label="Gruppe 1">
          <Select.Option value="everest">Mount Everest</Select.Option>
          <Select.Option value="aconcagua">Aconcagua</Select.Option>
          <Select.Option value="denali">Denali</Select.Option>
          <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="Gruppe 2">
          <Select.Option value="elbrus">Elbrus</Select.Option>
          <Select.Option value="vinson">Mount Vinson</Select.Option>
          <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
          <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
        </Select.Optgroup>
      </Select>
    </Field>
  ),
};
