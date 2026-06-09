import type { Size } from '@digdir/designsystemet-types';
import { useEffect, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from '../button/Button';
import { Field } from '../field/Field';
import { Heading } from '../typography/heading/Heading';
import { Label } from '../typography/label/Label';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Prose } from '../typography/prose/Prose';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Input } from './Input';

const meta = preview.meta({
  component: Input,
  tags: ['digdir'],
  argTypes: {
    role: {
      control: 'radio',
      options: ['checkbox', 'switch'],
      if: { arg: 'type', eq: 'checkbox' },
    },
    'aria-invalid': {
      control: 'boolean',
    },
  },
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
});

export const Preview = meta.story({
  args: {
    type: 'text',
    name: 'inputs',
    'aria-label': 'input',
  },
  render: (args) => {
    const role = args.role === 'switch' ? 'switch' : undefined;

    return <Input {...args} role={role} />;
  },

  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    if (args.disabled) {
      await step('Input is disabled', async () => {
        expect(input).toBeDisabled();
      });
      return;
    }

    if (args.readOnly) {
      await step('Input is read-only', async () => {
        expect(input).toHaveAttribute('readonly');
        expect(input).not.toBeDisabled();
      });
      return;
    }

    await step('User can focus the input', async () => {
      await userEvent.click(input);
      expect(input).toHaveFocus();
    });

    await step('User can blur the input', async () => {
      await userEvent.tab();
      expect(input).not.toHaveFocus();
    });

    await step('User can type in the input', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });
  },
});

export const HtmlSize = meta.story({
  args: {
    size: 10,
  },
  render: (args) => (
    <Field>
      <Label>Input with size</Label>
      <Input {...args} />
    </Field>
  ),
});

export const Controlled = meta.story({
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'number',
        'search',
        'text',
        'tel',
        'url',
        'email',
        'time',
        'date',
        'datetime-local',
      ],
    },
  },
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
    docs: advancedCodeDocs,
  },
  render(args) {
    const [value, setValue] = useState<string>('');
    return (
      <>
        <style>
          {`
        .example-main {
          display: flex;
          gap: var(--ds-size-2);
          align-items: end;
          width: 100%;
         }`}
        </style>
        <Prose>
          <div className="example-main">
            <Field>
              <Label>Skriv inn verdi</Label>
              <Input
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Field>
            <Button variant="secondary" onClick={() => setValue('')}>
              Tøm feltet
            </Button>
          </div>
          {value && <Paragraph>Valgt verdi: {value}</Paragraph>}
        </Prose>
      </>
    );
  },
});

const sizes: Size[] = ['sm', 'md', 'lg'];
const sizenames = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
};

export const Text = meta.story({
  args: {
    value: 'Value',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'date',
        'datetime-local',
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week',
        'month',
      ],
    },
  },
  render: (args) => {
    const states = [
      { label: 'Default', props: {} },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Invalid', props: {} },
      { label: 'Read-only', props: { readOnly: true } },
    ];

    return (
      <>
        <style>
          {`
.example-main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 90vw;
}
.example-heading {
  grid-column: 1 / -1;
}`}
        </style>
        {sizes.map((size) => (
          <div className="example-main" key={size} data-size={size}>
            <Heading data-size="2xs" className="example-heading">
              {sizenames[size]}
            </Heading>
            {states.map((state) => (
              <Field key={state.label}>
                <Label>{state.label}</Label>
                <Input
                  {...args}
                  name={`${size}-${state.label.toLowerCase()}`}
                  {...state.props}
                  data-size={size}
                />
                {state.label === 'Invalid' && (
                  <ValidationMessage>Feilmelding</ValidationMessage>
                )}
              </Field>
            ))}
          </div>
        ))}
      </>
    );
  },
});

export const InputTypes = meta.story({
  argTypes: {
    type: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
  },
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: (args) => {
    return (
      <>
        <Field>
          <Label>Checkbox</Label>
          <Input {...args} type="checkbox" />
        </Field>
        <Field>
          <Label>Radio</Label>
          <Input {...args} type="radio" />
        </Field>
        <Field>
          <Label>Switch</Label>
          <Input {...args} type="checkbox" role="switch" />
        </Field>
      </>
    );
  },
});

export const Radio = meta.story({
  args: {
    type: 'radio',
  },
  argTypes: {
    type: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
  },
  render: (args) => {
    const states = [
      { label: 'Default', props: {} },
      { label: 'Checked', props: { defaultChecked: true } },
      { label: 'Disabled', props: { disabled: true } },
      {
        label: 'Disabled checked',
        props: { disabled: true, defaultChecked: true },
      },
      { label: 'Invalid', props: { 'aria-invalid': true } },
      {
        label: 'Invalid checked',
        props: { 'aria-invalid': true, defaultChecked: true },
      },
      { label: 'Read-only', props: { readOnly: true } },
      {
        label: 'Read-only checked',
        props: { readOnly: true, defaultChecked: true },
      },
    ];

    return (
      <>
        <style>
          {`
.example-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 90vw;
}
.example-heading {
  grid-column: 1 / -1;
  margin-top: 16px;
}`}
        </style>
        {sizes.map((size) => (
          <div className="example-main" key={size} data-size={size}>
            <Heading className="example-heading" data-size="2xs">
              {sizenames[size]}
            </Heading>
            {states.map((state) => (
              <Field key={state.label}>
                <Input
                  {...args}
                  name={`${size}-${state.label.split(' ')[0]}`} // As states are demonstrated in pairs
                  {...state.props}
                />
                <Label>{state.label}</Label>
              </Field>
            ))}
          </div>
        ))}
      </>
    );
  },
});

export const Checkbox = meta.story({
  args: {
    type: 'checkbox',
  },
  argTypes: {
    type: {
      table: { disable: true },
    },
    role: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
  },
  render(args) {
    useEffect(() => {
      for (const input of Array.from(document.getElementsByTagName('input'))) {
        if (input.hasAttribute('data-indeterminate'))
          input.indeterminate = true;
      }
    }); // Intentionally run on every render

    const states = [
      { label: 'Default', props: {} },
      { label: 'Checked', props: { defaultChecked: true } },
      { label: 'Indeterminate', props: { 'data-indeterminate': true } },
      { label: 'Disabled', props: { disabled: true } },
      {
        label: 'Disabled checked',
        props: { disabled: true, defaultChecked: true },
      },
      {
        label: 'Disabled indeterminate',
        props: { disabled: true, 'data-indeterminate': true },
      },
      { label: 'Invalid', props: { 'aria-invalid': true } },
      {
        label: 'Invalid checked',
        props: { 'aria-invalid': true, defaultChecked: true },
      },
      {
        label: 'Invalid indeterminate',
        props: { 'aria-invalid': true, 'data-indeterminate': true },
      },
      { label: 'Read-only', props: { readOnly: true } },
      {
        label: 'Read-only checked',
        props: { readOnly: true, defaultChecked: true },
      },
      {
        label: 'Read-only indeterminate',
        props: { readOnly: true, 'data-indeterminate': true },
      },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gap: '2rem',
        }}
      >
        {sizes.map((size) => (
          <div
            key={size}
            data-size={size}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            <Heading data-size="2xs" style={{ gridColumn: '1 / -1' }}>
              {sizenames[size]}
            </Heading>
            {states.map((state) => (
              <Field key={state.label}>
                <Input
                  {...args}
                  name={`${size}-${state.label
                    .toLowerCase()
                    .replace(' ', '-')}`}
                  {...state.props}
                />
                <Label>{state.label}</Label>
              </Field>
            ))}
          </div>
        ))}
      </div>
    );
  },
});

export const Switch = meta.story({
  args: {
    type: 'checkbox',
    role: 'switch',
  },
  argTypes: {
    type: {
      table: { disable: true },
    },
    role: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
  },
  render: (args) => {
    const states = [
      { label: 'Default', props: {} },
      { label: 'Checked', props: { defaultChecked: true } },
      { label: 'Disabled', props: { disabled: true } },
      {
        label: 'Disabled checked',
        props: { disabled: true, defaultChecked: true },
      },
      { label: 'Read-only', props: { readOnly: true } },
      {
        label: 'Read-only checked',
        props: { readOnly: true, defaultChecked: true },
      },
    ];

    return (
      <>
        <style>
          {`
.example-main {
  display: grid;
  gap: 2rem;
}
.example-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 90vw;
}
.example-heading {
  grid-column: 1 / -1;
}`}
        </style>
        <div className="example-main">
          {sizes.map((size) => (
            <div className="example-section" key={size} data-size={size}>
              <Heading className="example-heading" data-size="2xs">
                {sizenames[size]}
              </Heading>
              {states.map((state) => (
                <Field key={state.label}>
                  <Input
                    {...args}
                    name={`${size}-${state.label
                      .toLowerCase()
                      .replace(' ', '-')}`}
                    {...state.props}
                  />
                  <Label>{state.label}</Label>
                </Field>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  },
});
