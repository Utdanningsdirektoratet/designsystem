import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  Input,
  Textarea,
  ValidationMessage,
} from '@udir-design/react/alpha';
import { Label } from '../typography/label/Label';

const meta: Meta<typeof Field> = {
  component: Field,
  tags: ['alpha'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Preview: Story = {
  render: () => (
    <Field>
      <Label>E-post</Label>
      <Field.Description>
        E-posten din brukes til å logge inn og motta varsler
      </Field.Description>
      <Input id="preview" defaultValue="ola nordmann@udir.no" aria-invalid />
      <ValidationMessage>Du må oppgi en gyldig e-postadresse</ValidationMessage>
    </Field>
  ),
};

export const Affix: Story = {
  render: () => (
    <Field>
      <Label>Hvor mange kroner koster det per måned?</Label>
      <Field.Affixes>
        <Field.Affix>NOK</Field.Affix>
        <Input id="affix" size={12} />
        <Field.Affix>pr. mnd.</Field.Affix>
      </Field.Affixes>
    </Field>
  ),
};

export const Counter: Story = {
  render: () => (
    <Field>
      <Label>Legg til en beskrivelse</Label>
      <Textarea rows={2} id="counter" />
      <Field.Counter limit={10} />
    </Field>
  ),
};

export const Position: Story = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    }}
  >
    <Field position="end">
      <Label>Flymodus</Label>
      <Input type="checkbox" role="switch" id={'airplane'} />
    </Field>
    <Field position="end">
      <Label>Lydløs</Label>
      <Input type="checkbox" role="switch" id={'sounds'} />
    </Field>
  </div>
);

Position.decorators = [
  (Story) => (
    <div
      style={{
        maxWidth: 200,
        margin: 'auto',
      }}
    >
      <Story />
    </div>
  ),
];
