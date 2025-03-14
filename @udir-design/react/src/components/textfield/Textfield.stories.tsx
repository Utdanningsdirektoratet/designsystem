import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Textfield } from './Textfield';
import { useState } from 'react';
import { Button, Divider, Paragraph } from '../alpha';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
  tags: ['alpha'],
  argTypes: {
    multiline: {
      type: 'boolean',
    },
    // This needs to be explicitly set, otherwise storybook will show "set object"
    type: {
      control: 'select',
      options: [
        /* | "button" */
        /* 'checkbox', */
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        /* 'image', */
        'month',
        'number',
        'password',
        /* 'radio', */
        /* | "range" */
        /* | "reset" */
        'search',
        /* | "submit" */
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const Preview: Story = {
  args: {
    label: 'Label',
    disabled: false,
    readOnly: false,
    multiline: false,
    description: '',
    error: '',
    counter: 0,
    id: 'textfield-preview',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: args.label as string,
    });

    await step('Label is rendered', async () => {
      const labelElement = canvas.getByText(args.label as string);
      expect(labelElement).toBeInTheDocument();
    });

    await step(
      'Input field is rendered and associated with the label',
      async () => {
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('id', args.id);
      },
    );

    await step('User can focus the text field', async () => {
      await userEvent.click(input);
      expect(input).toHaveFocus();
    });

    await step('User can blur the text field', async () => {
      await userEvent.tab();
      expect(input).not.toHaveFocus();
    });

    if (!args.disabled && !args.readOnly) {
      await step('User can type in the text field', async () => {
        await userEvent.clear(input);
        await userEvent.type(input, 'Hello World');
        expect(input).toHaveValue('Hello World');
      });
    } else {
      await step(
        'Text field is disabled or read-only so it should not be editable',
        async () => {
          expect(input).toBeDisabled();
        },
      );
    }
  },
};

export const Rows: Story = {
  args: {
    label: 'Label',
    multiline: true,
    rows: 4,
    id: 'textfield-rows',
  },
};

export const Affix: Story = {
  args: {
    prefix: 'NOK',
    suffix: 'pr. mnd',
    label: 'Hvor mange kroner koster det per måned?',
    id: 'textfield-affix',
  },
};

export const Counter: Story = {
  args: {
    counter: 10,
    label: 'Hvor mange kroner koster det per måned?',
    id: 'textfield-counter',
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>('');
    return (
      <>
        <Textfield
          label="Kontroller meg!"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="textfield-controlled"
        />

        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
          Du har skrevet inn: {value}
        </Paragraph>
        <Button onClick={() => setValue('Kake')}>Jeg vil ha Kake</Button>
      </>
    );
  },
};
