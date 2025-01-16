import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Preview: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="value1">content 1</Tabs.Panel>
      <Tabs.Panel value="value2">content 2</Tabs.Panel>
      <Tabs.Panel value="value3">content 3</Tabs.Panel>
    </Tabs>
  ),
};
