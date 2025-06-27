import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Textfield } from './Textfield';
import { useState } from 'react';
import { Button, Divider, Paragraph } from '@udir-design/react/alpha';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
  tags: ['beta'],
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
  parameters: {
    layout: 'centered',
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
    const input = await waitFor(() =>
      canvas.getByRole('textbox', {
        name: args.label as string,
      }),
    );

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
    label: 'Beskrivelse',
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
    inputMode: 'numeric',
  },
};

export const Counter: Story = {
  args: {
    counter: 10,
    label: 'Hvor mange kroner koster det per måned?',
    id: 'textfield-counter',
    inputMode: 'numeric',
  },
};

export const Controlled: Story = {
  args: {
    label: 'Fullt navn',
    multiline: false,
    id: 'textfield-controlled',
  },
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: (args) => {
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
          <Textfield
            {...args}
            value={value}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setValue(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          <Button variant="secondary" onClick={() => setValue('')}>
            Tøm feltet
          </Button>
        </div>
        <Divider />
        <Paragraph>
          Ditt brukernavn blir da: {value.replace(/\s/g, '').toLowerCase()}
        </Paragraph>
      </>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: () => {
    return (
      <>
        <Textfield
          id="textfield-disabled"
          label="Disabled Textfield"
          disabled
        />
        <Textfield
          id="textarea-disabled"
          label="Disabled Textarea"
          multiline
          rows={4}
          disabled
        />
      </>
    );
  },
};

export const ReadOnly: Story = {
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: () => {
    return (
      <>
        <Textfield
          id="textfield-readonly"
          label="ReadOnly Textfield"
          readOnly
        />
        <Textfield
          id="textarea-readonly"
          label="ReadOnly Textarea"
          multiline
          rows={4}
          readOnly
        />
      </>
    );
  },
};

export const Focused: Story = {
  args: Preview.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};
