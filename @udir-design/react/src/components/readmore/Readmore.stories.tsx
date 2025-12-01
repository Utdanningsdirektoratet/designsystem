import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from '../fieldset/Fieldset';
import { Radio } from '../radio/Radio';
import { Readmore } from './Readmore';

const meta: Meta<typeof Readmore> = {
  component: Readmore,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Readmore>;

export const Preview: Story = {
  args: {
    summary: 'Dette er en ReadMore',
  },
  render: (args) => (
    <Readmore {...args}>Dette er innhold i en Readmore</Readmore>
  ),
};

export const Example: Story = {
  args: {
    summary: 'Grunnen til at vi spør om dette',
  },
  render: (args) => (
    <Fieldset>
      <Fieldset.Legend>Velg din aldersgruppe.</Fieldset.Legend>
      <Radio
        id="components-radio--group-10-20"
        label="10-20 år"
        name="my-group"
        value="10-20"
      />
      <Radio
        id="components-radio--group-21-45"
        label="21-45 år"
        name="my-group"
        value="21-45"
      />
      <Radio
        id="components-radio--group-46-80"
        label="46-80 år"
        name="my-group"
        value="46-80"
      />
      <Readmore {...args}>
        Informasjonen blir brukt til å tilpasse innholdet på siden.
      </Readmore>
    </Fieldset>
  ),
};
