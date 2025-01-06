import type { Meta, StoryObj } from '@storybook/react';
import { Details } from './Details';

const meta: Meta<typeof Details> = {
  component: Details,
};

export default meta;
type Story = StoryObj<typeof Details>;

export const Preview: Story = {
  render: (args) => (
    <Details {...args}>
      <Details.Summary>Fagskole</Details.Summary>
      <Details.Content>
        Fagskoler kan tilby både etter- og videreutdanning. Fagskoler er
        praksisrettede og har tette bånd til arbeidslivet, og kan tilby
        utdanninger på særlig fagspesifikke tema.
      </Details.Content>
    </Details>
  ),
};
