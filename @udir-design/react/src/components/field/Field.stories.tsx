import type { Meta, StoryObj } from '@storybook/react';
import {
  Field,
  Fieldset,
  Input,
  Select,
  Textarea,
  ValidationMessage,
} from '@udir-design/react/alpha';
import { Label } from '../typography/label/Label';

const meta: Meta<typeof Field> = {
  component: Field,
  tags: ['alpha'],
  parameters: {
    customStyles: {
      maxWidth: 600,
      width: '90vw',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Preview: Story = {
  render: (args, context) => (
    <Field {...args}>
      <Label>Kort beskrivelse</Label>
      <Field.Description>Beskrivelse</Field.Description>
      <Input id={context.id} />
      <ValidationMessage>Feilmelding</ValidationMessage>
    </Field>
  ),
};

export const Affix: Story = {
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-4)',
    },
  },
  render: (args, context) => (
    <>
      <Field>
        <Label>Hvor mange kroner koster det per måned?</Label>
        <Field.Affixes>
          <Field.Affix>NOK</Field.Affix>
          <Input id={`${context.id}-input`} />
          <Field.Affix>pr. mnd.</Field.Affix>
        </Field.Affixes>
      </Field>

      <Field>
        <Label>Hvor mange kilo veier eplene du har valgt?</Label>
        <Field.Affixes>
          <Textarea rows={2} cols={4} id={`${context.id}-textarea`} />
          <Field.Affix>KG</Field.Affix>
        </Field.Affixes>
      </Field>

      <Field>
        <Label>Hvor mange kroner koster det?</Label>
        <Field.Affixes>
          <Field.Affix>NOK</Field.Affix>
          <Select id={`${context.id}-select`}>
            <Select.Option value="-1">Velg &hellip;</Select.Option>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="20">20</Select.Option>
            <Select.Option value="30">30</Select.Option>
          </Select>
        </Field.Affixes>
      </Field>

      <Field>
        <Label>No affix</Label>
        <Field.Affixes>
          <Input id={`${context.id}-input-noaffix`} />
        </Field.Affixes>
      </Field>

      <Field>
        <Label>No affix and small size</Label>
        <Field.Affixes>
          <Input size={10} id={`${context.id}-input-noaffix-small`} />
        </Field.Affixes>
      </Field>

      <Field>
        <Label>No affix and huge size</Label>
        <Field.Affixes>
          <Input size={9999} id={`${context.id}-input-noaffix-huge`} />
        </Field.Affixes>
      </Field>

      <Field>
        <Label>Affix and small size</Label>
        <Field.Affixes>
          <Field.Affix>NOK</Field.Affix>
          <Input size={10} id={`${context.id}-input-affix-small`} />
          <Field.Affix>pr. mnd.</Field.Affix>
        </Field.Affixes>
      </Field>

      <Field>
        <Label>Affix and huge size</Label>
        <Field.Affixes>
          <Field.Affix>NOK</Field.Affix>
          <Input size={50} id={`${context.id}-input-affix-huge`} />
          <Field.Affix>pr. mnd.</Field.Affix>
        </Field.Affixes>
      </Field>
    </>
  ),
};

export const Counter: Story = {
  render: (args, context) => (
    <Field {...args}>
      <Label>Legg til en beskrivelse</Label>
      <Textarea rows={2} id={context.id} />
      <Field.Counter limit={10} />
    </Field>
  ),
};

export const Position: Story = {
  render: (args, context) => (
    <>
      <Fieldset>
        <Fieldset.Legend>Fields with position="start"</Fieldset.Legend>
        <Field position="start">
          <Label>Radio</Label>
          <Input type="radio" id={`${context.id}-radio-start`} />
        </Field>
        <Field position="start">
          <Label>Checkbox</Label>
          <Input type="checkbox" id={`${context.id}-checkbox-start`} />
        </Field>
        <Field position="start">
          <Label>Switch</Label>
          <Input
            type="checkbox"
            role="switch"
            id={`${context.id}-switch-start`}
          />
        </Field>
      </Fieldset>
      <br />
      <Fieldset>
        <Fieldset.Legend>Fields with position="end"</Fieldset.Legend>
        <Field position="end">
          <Label>Radio</Label>
          <Input type="radio" id={`${context.id}-radio-end`} />
        </Field>
        <Field position="end">
          <Label>Checkbox</Label>
          <Input type="checkbox" id={`${context.id}-checkbox-end`} />
        </Field>
        <Field position="end">
          <Label>Switch</Label>
          <Input
            type="checkbox"
            role="switch"
            id={`${context.id}-switch-end`}
          />
        </Field>
      </Fieldset>
    </>
  ),
};
