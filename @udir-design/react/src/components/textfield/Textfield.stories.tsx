import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button';
import { Divider } from 'src/components/divider';
import { Paragraph } from 'src/components/typography/paragraph';
import { Textfield } from './Textfield';

const meta = preview.meta({
  component: Textfield,
  tags: ['digdir'],
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
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
  },
});

export const Preview = meta.story({
  args: {
    label: 'Label',
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

    await step('User can type in the text field', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });
  },
});

export const Rows = meta.story({
  args: {
    label: 'Beskrivelse',
    multiline: true,
    rows: 4,
    id: 'textfield-rows',
  },
});

export const Affix = meta.story({
  args: {
    prefix: 'NOK',
    suffix: 'pr. mnd',
    label: 'Hvor mange kroner koster det per måned?',
    id: 'textfield-affix',
    inputMode: 'numeric',
  },
});

export const Counter = meta.story({
  args: {
    id: 'textfield-counter',
    label: 'Legg til en beskrivelse',
    multiline: true,
    rows: 4,
    counter: 75,
  },
  render: (args) => <Textfield {...args} />,
});

export const Format = meta.story({
  parameters: {
    docs: advancedCodeDocs,
  },
  render: () => {
    const [nationalIdentityNumber, setNationalIdentityNumber] =
      useState<string>('');
    const tooLong = nationalIdentityNumber.length > 11;
    const hasNonDigits = /\D/.test(nationalIdentityNumber);

    const updateNumber = (e: ChangeEvent<HTMLInputElement>) => {
      // removing spaces from stored value so users can space how they like without error message
      setNationalIdentityNumber(e.target.value.replace(/\s+/g, ''));
    };

    return (
      <Textfield
        autoComplete="off"
        label="Fødselsnummer"
        id="format"
        inputMode="numeric"
        onChange={(e) => updateNumber(e)}
        error={
          tooLong
            ? 'Fødselsnummer skal kun være 11 tegn'
            : hasNonDigits
              ? 'Fødselsnummer skal kun inneholde siffere'
              : undefined
        }
      />
    );
  },
});

export const Controlled = meta.story({
  args: {
    label: 'Fullt navn',
    id: 'textfield-controlled',
    autoComplete: 'name',
  },
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
    docs: advancedCodeDocs,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    return (
      <>
        <style>
          {`
        .textfield-controlled-main {
          display: flex;
          gap: var(--ds-size-2);
          align-items: end;
          width: 100%;
        }
        .textfield-controlled-textfield {
          flex-grow: 1;
        }`}
        </style>
        <div className="textfield-controlled-main">
          <Textfield
            className="textfield-controlled-textfield"
            {...args}
            value={value}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setValue(e.target.value)}
          />
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

export const Disabled = meta.story({
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
          id="multiline-textfield-disabled"
          label="Disabled multiline Textfield"
          multiline
          rows={4}
          disabled
        />
      </>
    );
  },
});

export const ReadOnly = meta.story({
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
          id="multiline-textfield-readonly"
          label="ReadOnly multiline Textfield"
          multiline
          rows={4}
          readOnly
        />
      </>
    );
  },
});

export const Focused = meta.story({
  args: Preview.input.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
});
