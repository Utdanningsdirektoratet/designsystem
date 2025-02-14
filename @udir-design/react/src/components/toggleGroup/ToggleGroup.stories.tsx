import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Preview: Story = {
  args: {
    defaultValue: 'innboks',
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
};
