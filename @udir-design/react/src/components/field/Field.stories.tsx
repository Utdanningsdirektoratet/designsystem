import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Input } from '../input/Input';
import { Textarea } from '../textarea/Textarea';
import { Label } from '../typography/label/Label';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Field } from './Field';
import { Field as FakeField } from './docs/FakeField';
import { FieldCounter } from './docs/FakeFieldCounter';

const meta = preview.meta({
  component: FakeField,
  subcomponents: {
    'Field.Counter': FieldCounter,
  },
  tags: ['digdir'],
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
    <Field {...args}>
      <Label>E-post</Label>
      <Field.Description>
        E-posten din brukes til å logge inn og motta varsler
      </Field.Description>
      <Input
        id="preview"
        defaultValue="ola nordmann@udir.no"
        autoComplete="email"
        aria-invalid
      />
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
            `${validationMessage.id} ${description.id}`,
          ),
        );
      },
    );
  },
});

export const Affix = meta.story({
  render: (args) => (
    <Field {...args}>
      <Label>Hvor mange kroner koster det per måned?</Label>
      <Field.Affixes>
        <Field.Affix>NOK</Field.Affix>
        <Input id="affix" size={12} autoComplete="off" />
        <Field.Affix>pr. mnd.</Field.Affix>
      </Field.Affixes>
    </Field>
  ),
});

export const Counter = meta.story({
  render: (args) => (
    <Field {...args}>
      <Label>Legg til en beskrivelse</Label>
      <Textarea rows={4} id="counter" autoComplete="off" />
      <Field.Counter limit={75} />
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
});

export const Format = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: (args) => {
    const [nationalIdentityNumber, setNationalIdentityNumber] =
      useState<string>('');
    const tooLong = nationalIdentityNumber.length > 11;
    const hasNonDigits = /\D/.test(nationalIdentityNumber);

    const updateNumber = (e: ChangeEvent<HTMLInputElement>) => {
      // Remove spaces from the stored value so users can format the input without triggering an error message.
      setNationalIdentityNumber(e.target.value.replace(/\s+/g, ''));
    };

    return (
      <Field {...args}>
        <Label>Fødselsnummer</Label>
        <Input
          id="format"
          inputMode="numeric"
          onChange={(e) => updateNumber(e)}
          autoComplete="off"
        />
        {tooLong && (
          <ValidationMessage>
            Fødselsnummer skal kun være 11 tegn.
          </ValidationMessage>
        )}
        {hasNonDigits && (
          <ValidationMessage>
            Fødselsnummer skal kun inneholde sifre.
          </ValidationMessage>
        )}
      </Field>
    );
  },
});

export const Position = meta.story({
  render: (args) => (
    <>
      <style>
        {`
.field-position-main {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-2);
}`}
      </style>
      <div className="field-position-main">
        {/* eslint-disable jsx-a11y/role-has-required-aria-props --
            False positive: <input type="checkbox" role="switch"> is
            spec-compliant. WAI-ARIA §5.2.2 says host-language attributes
            fulfill "required states" requirements, and §8.4 confirms
            native semantics satisfy them — the native `checked` state of
            <input type="checkbox"> provides aria-checked implicitly.
            Tracked in https://github.com/oxc-project/oxc/issues/24838 */}
        <Field {...args} position="end">
          <Label>Flymodus</Label>
          <Input type="checkbox" role="switch" id={'airplane'} />
        </Field>
        <Field {...args} position="end">
          <Label>Lydløs</Label>
          <Input type="checkbox" role="switch" id={'sounds'} />
        </Field>
        {/* eslint-enable jsx-a11y/role-has-required-aria-props */}
      </div>
    </>
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
  decorators: [
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
  ],
});
