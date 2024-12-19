import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset } from './Fieldset';
import { Field } from '../field/Field';
import { Input } from '../input/Input';
import { Textarea } from '../textarea/Textarea';
import { Label } from '@digdir/designsystemet-react';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Preview: Story = {
  render: (args) => (
    <form>
      <Fieldset {...args}>
        <Fieldset.Legend>Skriv inn dine svar</Fieldset.Legend>
        <Fieldset.Description>
          Gi en kort beskrivelse i begge feltene
        </Fieldset.Description>
        <Field>
          <Label>Kort beskrivelse</Label>
          <Input />
        </Field>
        <Field>
          <Label>Lang beskrivelse</Label>
          <Textarea />
        </Field>
      </Fieldset>
    </form>
  ),
};
