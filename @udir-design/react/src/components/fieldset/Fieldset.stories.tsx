import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';
import {
  Checkbox,
  Heading,
  Radio,
  Textfield,
} from '@digdir/designsystemet-react';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ['alpha'],
  parameters: {
    layout: 'centered',
  },
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

export const WithTextfield: Story = {
  render: (args, context) => (
    <Fieldset {...args}>
      <Fieldset.Legend>
        <Heading level={2} data-size="sm">
          Adresse
        </Heading>
      </Fieldset.Legend>
      <Fieldset.Description>
        Skriv inn adressen din for å motta post fra oss.
      </Fieldset.Description>
      <Textfield
        id={`${context.id}-textfield`}
        label="Gateadresse"
        name={`${context.id}-textfield`}
      />
      <Textfield
        id={`${context.id}-textfield`}
        label="Postnummer"
        name={`${context.id}-textfield`}
        pattern="[0-9]*"
        inputMode="numeric"
        size={4}
      />
      <Textfield
        id={`${context.id}-textfield2`}
        label="Poststed"
        name={`${context.id}-textfield2`}
        size={25}
      />
    </Fieldset>
  ),
};

export const LegendAsHeading: Story = {
  render: (args, context) => (
    <Fieldset {...args}>
      <Fieldset.Legend>
        <Heading level={2} data-size="sm">
          Hvilke tjenester bruker du?
        </Heading>
      </Fieldset.Legend>
      <Fieldset.Description>Påloggingssystemer hos Udir</Fieldset.Description>
      <Checkbox
        id={`${context.id}-feide`}
        label="Feide"
        name={`${context.id}-feide`}
        value="feide"
      />
      <Checkbox
        id={`${context.id}-UIDP`}
        label="UIDP"
        name={`${context.id}-UIDP`}
        value="UIDP"
      />
      <Checkbox
        id={`${context.id}-UBAS`}
        label="UBAS"
        name={`${context.id}-UBAS`}
        value="UBAS"
      />
    </Fieldset>
  ),
};
