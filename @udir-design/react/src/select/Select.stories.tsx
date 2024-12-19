import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Preview: Story = {
  render: (args) => (
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
  ),
};
