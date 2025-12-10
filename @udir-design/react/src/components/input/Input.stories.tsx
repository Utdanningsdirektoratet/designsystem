import type { Size } from '@digdir/designsystemet-react';
import { useEffect, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Divider } from '../divider/Divider';
import { Field } from '../field/Field';
import { Heading } from '../typography/heading/Heading';
import { Label } from '../typography/label/Label';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Input } from './Input';

const meta = preview.meta({
  component: Input,
  tags: ['beta', 'digdir'],
  argTypes: {
    role: {
      control: 'radio',
      options: ['checkbox', 'switch'],
      if: { arg: 'type', eq: 'checkbox' },
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
    'aria-invalid': false,
    disabled: false,
    readOnly: false,
    type: 'text',
    name: 'inputs',
    'aria-label': 'input',
  },
  render: (args, context) => {
    if (args.role !== 'switch') args.role = undefined; // Ensure we only keep switch role in storybook

    return <Input {...args} defaultChecked id={context.id} />;
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('User can focus the input', async () => {
      await userEvent.click(input);
      expect(input).toHaveFocus();
    });

    await step('User can blur the input', async () => {
      await userEvent.tab();
      expect(input).not.toHaveFocus();
    });

    if (!args.disabled && !args.readOnly) {
      await step('User can type in the input', async () => {
        await userEvent.clear(input);
        await userEvent.type(input, 'Hello World');
        expect(input).toHaveValue('Hello World');
      });
    } else {
      await step(
        'Input is disabled or read-only so it should not be editable',
        async () => {
          expect(input).toBeDisabled();
        },
      );
    }
  },
});

export const HtmlSize = meta.story({
  args: {
    size: 10,
  },
  render: (args, context) => (
    <Field>
      <Label>Input with size</Label>
      <Input {...args} id={context.id} />
    </Field>
  ),
});

export const Controlled = meta.story({
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render(args, context) {
    const [value, setValue] = useState<string>('');
    return (
      <>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-size-2)',
            alignItems: 'end',
            width: '100%',
          }}
        >
          <Field>
            <Label>Fullt navn</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              {...args}
              id={context.id}
            />
          </Field>
          <Button variant="secondary" onClick={() => setValue('')}>
            Tøm feltet
          </Button>
        </div>
        {value && (
          <>
            <Divider />
            <Paragraph>
              Ditt brukernavn blir da: {value.replace(/\s/g, '').toLowerCase()}
            </Paragraph>
          </>
        )}
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
  render: (args, context) => {
    const states = [
      { label: 'Default', props: {} },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Invalid', props: { 'aria-invalid': true } },
      { label: 'Read-only', props: { readOnly: true } },
    ];

    return (
      <div>
        {sizes.map((size) => (
          <div
            key={size}
            data-size={size}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              maxWidth: '90vw',
            }}
          >
            <Heading data-size="2xs" style={{ gridColumn: '1 / -1' }}>
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
                  id={`${context.id}-${size}-${state.label.toLowerCase()}`}
                />
                {state.label === 'Invalid' && (
                  <ValidationMessage>Feilmelding</ValidationMessage>
                )}
              </Field>
            ))}
          </div>
        ))}
      </div>
    );
  },
});

export const InputTypes = meta.story({
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: (args, context) => {
    return (
      <>
        <Field>
          <Label>Checkbox</Label>
          <Input
            {...args}
            type="checkbox"
            id={`${context.id}-checkbox`}
            checked
          />
        </Field>
        <Field>
          <Label>Radio</Label>
          <Input {...args} type="radio" id={`${context.id}-radio`} checked />
        </Field>
        <Field>
          <Label>Switch</Label>
          <Input
            {...args}
            type="checkbox"
            role="switch"
            id={`${context.id}-switch`}
            checked
          />
        </Field>
      </>
    );
  },
});

export const Radio = meta.story({
  args: {
    type: 'radio',
  },
  render: (args, context) => {
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
      <div>
        {sizes.map((size) => (
          <div
            key={size}
            data-size={size}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              maxWidth: '90vw',
            }}
          >
            <Heading
              data-size="2xs"
              style={{ gridColumn: '1 / -1', marginTop: 16 }}
            >
              {sizenames[size]}
            </Heading>
            {states.map((state) => (
              <Field key={state.label}>
                <Input
                  {...args}
                  name={`${size}-${state.label.split(' ')[0]}`} // As states are demonstrated in pairs
                  {...state.props}
                  id={`${context.id}-${size}-${state.label.split(' ')[0]}`}
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

export const Checkbox = meta.story({
  args: {
    type: 'checkbox',
  },
  render(args, context) {
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
                  id={`${context.id}-${size}-${state.label
                    .toLowerCase()
                    .replace(' ', '-')}`}
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
  render: (args, context) => {
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
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              maxWidth: '90vw',
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
                  id={`${context.id}-${size}-${state.label
                    .toLowerCase()
                    .replace(' ', '-')}`}
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
