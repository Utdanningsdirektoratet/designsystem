import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import {
  Button,
  Divider,
  Field,
  Heading,
  Input,
  Label,
  Paragraph,
  ValidationMessage,
} from '../../alpha';
import { Size } from '@digdir/designsystemet-react';

type Story = StoryObj<typeof Input>;

export default {
  component: Input,
  tags: ['alpha'],
  argTypes: {
    role: {
      control: 'radio',
      options: ['checkbox', 'switch'],
      if: { arg: 'type', eq: 'checkbox' },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export const Preview: Story = {
  args: {
    'aria-invalid': false,
    disabled: false,
    readOnly: false,
    type: 'text',
    role: 'checkbox',
    name: 'inputs',
  },
  render: (args, context) => {
    if (args.role !== 'switch') args.role = undefined; // Ensure we only keep switch role in storybook

    return (
      <Field>
        <Label>Input 1</Label>
        <Input {...args} defaultChecked id={context.id} />
        <ValidationMessage hidden={!args['aria-invalid']}>
          Feilmelding
        </ValidationMessage>
      </Field>
    );
  },
};
export const HtmlSize: Story = {
  args: {
    size: 10,
  },
  render: (args, context) => (
    <Field>
      <Label>Input with size</Label>
      <Input {...args} id={context.id} />
    </Field>
  ),
};

export const Controlled: Story = {
  render: function Render(args, context) {
    const [value, setValue] = useState<string>();

    return (
      <>
        <Field>
          <Label>Kontroller meg!</Label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...args}
            id={context.id}
          />
        </Field>
        <div>
          <Divider />

          <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
            Du har skrevet inn: {value}
          </Paragraph>
          <Button onClick={() => setValue('Kake')}>Jeg vil ha Kake</Button>
        </div>
      </>
    );
  },
};

const sizes: Size[] = ['sm', 'md', 'lg'];
const sizenames = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
};

export const Text: Story = {
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
};

export const Radio: Story = {
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
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
  },
  render: function Render(args, context) {
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
};

export const Switch: Story = {
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
};
