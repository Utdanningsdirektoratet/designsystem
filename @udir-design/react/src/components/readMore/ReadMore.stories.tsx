import preview from '.storybook/preview';
import { Fieldset } from '../fieldset/Fieldset';
import { Radio } from '../radio/Radio';
import { ReadMore } from './ReadMore';

const meta = preview.meta({
  component: ReadMore,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  args: {
    summary: 'Dette er en ReadMore',
  },
  render: (args) => (
    <ReadMore {...args}>Dette er innhold i en ReadMore</ReadMore>
  ),
});

export const Example = meta.story({
  args: {
    summary: 'Dette er individuelt tilrettelagt opplæring',
  },
  render: (args) => (
    <Fieldset>
      <Fieldset.Legend>
        Trenger eleven individuelt tilrettelagt opplæring?
      </Fieldset.Legend>
      <Radio
        id="components-radio--group-ja"
        label="Ja"
        name="my-group"
        value="ja"
      />
      <Radio
        id="components-radio--group-nei"
        label="Nei"
        name="my-group"
        value="nei"
      />
      <ReadMore {...args}>
        Elever som ikke har eller kan få tilfredsstillende utbytte av det
        ordinære opplæringstilbudet har rett til individuell tilrettelegging.
        Før det fattes vedtak om individuell tilrettelagt opplæring skal det
        foreligge en sakkyndig vurdering utarbeidet av Pedagogisk-psykologisk
        tjeneste.
      </ReadMore>
    </Fieldset>
  ),
});
