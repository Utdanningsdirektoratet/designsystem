import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';

const meta: Meta<typeof Search> = {
  component: Search,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Preview: Story = {
  render: (args) => (
    <Search {...args}>
      <Search.Input aria-label="Søk" />
      <Search.Clear />
      <Search.Button />
    </Search>
  ),
};
