import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';
import { Checkbox, Radio } from '@digdir/designsystemet-react';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Preview: Story = {
  render: (args, context) => (
    <Fieldset {...args}>
      <Fieldset.Legend>Hvilken fjordarm bor du ved?</Fieldset.Legend>
      <Fieldset.Description>
        Valget vil hjelpe oss å forbedre innholdet vi viser deg.
      </Fieldset.Description>
      <Radio
        id={`${context.id}-radio-barsnesfjorden`}
        label="Barsnesfjorden"
        name="radio"
        value="barsnesfjorden"
      />
      <Radio
        id={`${context.id}-radio-eidsfjorden`}
        label="Eidsfjorden"
        name="radio"
        value="eidsfjorden"
      />
      <Radio
        id={`${context.id}-radio-ingen-av-de`}
        label="Ingen av de"
        name="radio"
        value="ingen-av-de"
      />
    </Fieldset>
  ),
};

export const WithCheckbox: Story = {
  render: (args, context) => (
    <Fieldset {...args}>
      <Fieldset.Legend>Godtar du vilkårene?</Fieldset.Legend>
      <Checkbox id={`${context.id}-checkbox`} label="Ja, jeg godtar" />
    </Fieldset>
  ),
};

export const LegendAsHeading: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <Fieldset.Legend>
        <h1>Hvor skal du reise?</h1>
      </Fieldset.Legend>
    </Fieldset>
  ),
};
