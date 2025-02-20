import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset } from './Fieldset';
import { Field } from '../field/Field';
import { Input } from '../input/Input';
import { Textarea } from '../textarea/Textarea';
import { Label } from '@digdir/designsystemet-react';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Preview: Story = {
  render: (args, context) => (
    <form>
      <Fieldset {...args}>
        <Fieldset.Legend>Skriv inn dine svar</Fieldset.Legend>
        <Fieldset.Description>
          Gi en kort beskrivelse i begge feltene
        </Fieldset.Description>
        <Field>
          <Label>Kort beskrivelse</Label>
          <Input id={`${context.id}-input`} />
        </Field>
        <Field>
          <Label>Lang beskrivelse</Label>
          <Textarea id={`${context.id}-textarea`} />
        </Field>
      </Fieldset>
    </form>
  ),
};
