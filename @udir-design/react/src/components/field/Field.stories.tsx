import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Divider,
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
    customStyles: {
      maxWidth: 600,
      width: '90vw',
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Preview: Story = {
  render: () => (
    <Field>
      <Label>Etternavn</Label>
      <Field.Description>
        Etternavn kan ikke inneholde mellomrom
      </Field.Description>
      <Input id="preview" defaultValue="Nordmann Svenske" />
      <ValidationMessage>
        Du kan ikke ha mellomrom i etternavnet ditt
      </ValidationMessage>
    </Field>
  ),
};

export const Affix: Story = {
  render: () => (
    <Field>
      <Label>Hvor mange kroner koster det per måned?</Label>
      <Field.Affixes>
        <Field.Affix>NOK</Field.Affix>
        <Input id="affix" />
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
  <>
    <Field position="end">
      <Label>Flymodus</Label>
      <Input type="checkbox" role="switch" id={'airplane'} />
    </Field>
    <Divider />
    <Field position="end">
      <Label>Lydløs</Label>
      <Input type="checkbox" role="switch" id={'sounds'} />
    </Field>
  </>
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
