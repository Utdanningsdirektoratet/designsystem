import preview from '.storybook/preview';
import { Checkbox } from '../checkbox/Checkbox';
import { Radio } from '../radio/Radio';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import { Fieldset } from './Fieldset';

const meta = preview.meta({
  component: Fieldset,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
});

export const Preview = meta.story({
  render: (args) => (
    <Fieldset {...args}>
      <Fieldset.Legend>Hvilken fjordarm bor du ved?</Fieldset.Legend>
      <Fieldset.Description>
        Valget vil hjelpe oss å forbedre innholdet vi viser deg.
      </Fieldset.Description>
      <Radio label="Barsnesfjorden" name="radio" value="barsnesfjorden" />
      <Radio label="Eidsfjorden" name="radio" value="eidsfjorden" />
      <Radio label="Ingen av de" name="radio" value="ingen-av-de" />
    </Fieldset>
  ),
});

export const WithCheckbox = meta.story({
  render: (args) => (
    <Fieldset {...args}>
      <Fieldset.Legend>Godtar du vilkårene?</Fieldset.Legend>
      <Checkbox label="Ja, jeg godtar" />
    </Fieldset>
  ),
});

export const WithTextfield = meta.story({
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
      <Textfield label="Gateadresse" name={`${context.id}-textfield`} />
      <Textfield
        label="Postnummer"
        name={`${context.id}-textfield`}
        pattern="[0-9]*"
        inputMode="numeric"
        size={4}
      />
      <Textfield label="Poststed" name={`${context.id}-textfield2`} size={25} />
    </Fieldset>
  ),
});

export const LegendAsHeading = meta.story({
  render: (args, context) => (
    <Fieldset {...args}>
      <Fieldset.Legend>
        <Heading level={2} data-size="sm">
          Hvilke tjenester bruker du?
        </Heading>
      </Fieldset.Legend>
      <Fieldset.Description>Påloggingssystemer hos Udir</Fieldset.Description>
      <Checkbox label="Feide" name={`${context.id}-feide`} value="feide" />
      <Checkbox label="UIDP" name={`${context.id}-UIDP`} value="UIDP" />
      <Checkbox label="UBAS" name={`${context.id}-UBAS`} value="UBAS" />
    </Fieldset>
  ),
});
