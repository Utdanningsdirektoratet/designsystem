import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Field } from 'src/components/field';
import { Label } from 'src/components/typography/label';
import { Textarea } from './Textarea';
import { Textarea as FakeTextarea } from './docs/FakeTextarea';

const meta = preview.meta({
  component: FakeTextarea,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
      maxWidth: '20rem',
    },
  },
});

export const Preview = meta.story({
  args: {
    rows: 3,
    cols: 20,
    id: 'my-textarea',
  },
  render: (args) => (
    <Field>
      <Label>Label</Label>
      <Textarea {...args} />
    </Field>
  ),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await step('Textarea is rendered', async () => {
      expect(textarea).toBeInTheDocument();
    });

    await step('User can focus the textarea', async () => {
      await userEvent.click(textarea);
      expect(textarea).toHaveFocus();
    });

    await step('User can blur the textarea', async () => {
      await userEvent.tab();
      expect(textarea).not.toHaveFocus();
    });

    if (!args.disabled && !args.readOnly) {
      await step('User can type in the textarea', async () => {
        await userEvent.clear(textarea);
        await userEvent.type(textarea, 'Hello World');
        expect(textarea).toHaveValue('Hello World');
      });
    } else {
      await step(
        'Textarea is disabled or read-only so it should not be editable',
        async () => {
          expect(textarea).toBeDisabled();
        },
      );
    }
  },
});

export const FullWidth = meta.story({
  args: {
    id: 'my-textarea',
  },
  parameters: {
    customStyles: {
      maxWidth: '100%',
    },
  },
  render: (args) => (
    <Field>
      <Label>Beskriv bekymringen din</Label>
      <Textarea {...args} />
    </Field>
  ),
});

export const Controlled = meta.story({
  args: {
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
    const [value, setValue] = useState(`${args.value || ''}`);

    return (
      <>
        <Field>
          <Label>Beskriv bekymringen din</Label>
          <Textarea
            {...args}
            rows={4}
            value={value}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setValue(e.target.value)}
          />
        </Field>
        <Button
          variant="secondary"
          onClick={() => setValue('')}
          style={{ marginTop: 'var(--ds-size-2)' }}
        >
          Tøm feltet
        </Button>
      </>
    );
  },
});

export const Disabled = meta.story({
  args: {
    id: 'textarea-disabled',
    disabled: true,
  },
  render: (args) => (
    <Field>
      <Label>Disabled Textarea</Label>
      <Textarea {...args} />
    </Field>
  ),
});

export const ReadOnly = meta.story({
  args: {
    id: 'textarea-readonly',
    readOnly: true,
  },
  render: (args) => (
    <Field>
      <Label>Read-Only Textarea</Label>
      <Textarea {...args} />
    </Field>
  ),
});

export const Focused = meta.story({
  args: Preview.input.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
  render: Preview.input.render,
});
