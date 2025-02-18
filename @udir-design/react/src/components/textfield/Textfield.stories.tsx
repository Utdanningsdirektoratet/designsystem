import type { Meta, StoryObj } from '@storybook/react';
import { Textfield } from './Textfield';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
  tags: ['alpha'],
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
      }
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
        }
      );
    }
  },
};
