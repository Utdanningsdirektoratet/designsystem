import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Preview: Story = {
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger>Eksempel</Dropdown.Trigger>
      <Dropdown {...args}>
        <Dropdown.Item>Sjokolade</Dropdown.Item>
        <Dropdown.Item>Smågodt</Dropdown.Item>
        <Dropdown.Item>Potetgull</Dropdown.Item>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};

export const MultipleHeadings: Story = {
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger>Eksempel med overskrifter</Dropdown.Trigger>
      <Dropdown {...args}>
        <Dropdown.Heading>Søt snacks</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>Melkesjokolade</Dropdown.Item>
          <Dropdown.Item>Smågodt</Dropdown.Item>
        </Dropdown.List>
        <Dropdown.Heading>Salt snacks</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>Potetgull</Dropdown.Item>
          <Dropdown.Item>Peanøtter</Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};
