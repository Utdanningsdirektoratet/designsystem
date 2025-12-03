import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Card } from '../card/Card';
import { Fieldset } from '../fieldset/Fieldset';
import { Checkbox } from './Checkbox';

const meta = preview.meta({
  component: Checkbox,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
  },
});

export const Preview = meta.story({
  args: {
    label: 'Checkbox label',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    id: 'checkbox-preview',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await step('Label and description are rendered', async () => {
      const label = await waitFor(() => canvas.getByText(args.label as string));
      expect(label).toBeInTheDocument();

      const description = canvas.getByText(args.description as string);
      expect(description).toBeInTheDocument();
    });

    await step('Checkbox is rendered with the correct role', async () => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    await step('User can toggle the checkbox', async () => {
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    await step('Check keyboard toggle', async () => {
      checkbox.focus();
      await userEvent.keyboard(' ');
      expect(checkbox).toBeChecked();
      await userEvent.keyboard(' ');
      expect(checkbox).not.toBeChecked();
    });

    await step(
      'onChange callback is called when checkbox is toggled',
      async () => {
        await userEvent.click(checkbox);
        expect(args.onChange).toHaveBeenCalled();
      },
    );

    userEvent.tab();
  },
});

export const OneOption = meta.story({
  args: {
    label: 'Jeg bekrefter at jeg er over 18 år',
    value: 'samtykke',
  },
  render: (args, context) => (
    <Fieldset>
      <Fieldset.Legend>Bekreft at du er over 18 år</Fieldset.Legend>
      <Fieldset.Description>
        For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at
        du er myndig.
      </Fieldset.Description>
      <Checkbox id={context.id} {...args} />
    </Fieldset>
  ),
});

export const CheckboxInColorContext = meta.story({
  args: {
    label: 'Checkbox label',
    description: 'Description',
    checked: true,
    id: 'checkbox-in-color-context',
  },
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Checkbox {...args} />
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const checkbox = within(canvasElement).getByRole('checkbox');
        const expectedColor = getComputedStyle(checkbox).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        expect(checkbox).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
});

export const Focused = meta.story({
  args: {
    label: 'Checkbox label',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    id: 'checkbox-preview',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
});
