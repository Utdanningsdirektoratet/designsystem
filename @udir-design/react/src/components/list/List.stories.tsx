import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta: Meta<typeof List.Unordered> = {
  component: List.Unordered,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof List.Unordered>;

export const Preview: Story = {
  render: (args) => (
    <List.Unordered {...args}>
      <List.Item>List Item 1</List.Item>
      <List.Item>List Item 2</List.Item>
      <List.Item>List Item 3</List.Item>
    </List.Unordered>
  ),
};
