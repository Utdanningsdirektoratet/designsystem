import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  Input,
  Textarea,
  ValidationMessage,
} from '@udir-design/react/alpha';
import { Label } from '../typography/label/Label';
import { expect, waitFor } from 'storybook/test';

const meta: Meta<typeof Field> = {
  component: Field,
  tags: ['beta'],
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
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const input = canvas.querySelector('input') as HTMLInputElement;
    const label = canvas.querySelector('label') as HTMLLabelElement;
    const validationMessage = canvas.querySelector(
      '[data-field="validation"]',
    ) as HTMLParagraphElement;
    const description = canvas.querySelector(
      '[data-field="description"]',
    ) as HTMLDivElement;

    await step('Input field is rendered and connected with label', async () => {
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', input.id);
      expect(label).toBeInTheDocument();
      await waitFor(() => expect(label).toHaveAttribute('for', input.id));
    });

    await step(
      'Validation message and description is connected with input',
      async () => {
        expect(validationMessage).toBeInTheDocument();
        expect(validationMessage).toHaveAttribute('id', validationMessage.id);
        expect(description).toBeInTheDocument();
        expect(description).toHaveAttribute('id', description.id);
        await waitFor(() =>
          expect(input).toHaveAttribute(
            'aria-describedby',
            validationMessage.id + '  ' + description.id,
          ),
        );
      },
    );
  },
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
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector('textarea') as HTMLTextAreaElement;
    const label = canvas.querySelector('label') as HTMLLabelElement;

    await step('Textarea is rendered and connected with label', async () => {
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('id', textarea.id);
      expect(label).toBeInTheDocument();
      await waitFor(() => expect(label).toHaveAttribute('for', textarea.id));
    });
  },
};

export const Position: Story = {
  render: () => (
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
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const checkbox = canvas.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    const label = canvas.querySelector('label') as HTMLLabelElement;

    await step('Checkbox is rendered and connected with label', async () => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', checkbox.id);
      expect(label).toBeInTheDocument();
      await waitFor(() => expect(label).toHaveAttribute('for', checkbox.id));
    });
  },
};

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
