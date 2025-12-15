import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Card } from '../card/Card';
import { Fieldset } from '../fieldset/Fieldset';
import { Radio } from './Radio';

const meta = preview.meta({
  component: Radio,
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
    label: 'Radio',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    onClick: fn(),
    id: 'radio-preview',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio');

    await step('Radio label and description are rendered', async () => {
      const label = await waitFor(() =>
        canvas.getByLabelText(args.label as string),
      );
      expect(label).toBeInTheDocument();
      const description = canvas.getByText(args.description as string);
      expect(description).toBeInTheDocument();
    });

    await step('Radio is rendered with the correct initial state', async () => {
      expect(radio).toBeInTheDocument();
      expect(radio).not.toBeChecked();
    });

    await step(
      "Radio calls onChange and onClick when it's checked",
      async () => {
        await userEvent.click(radio);
        expect(radio).toBeChecked();
        expect(args.onClick).toHaveBeenCalled();
        expect(args.onChange).toHaveBeenCalled();
      },
    );
  },
});

export const Inline = meta.story({
  render: (context) => (
    <Fieldset>
      <Fieldset.Legend>Kontaktes på e-post?</Fieldset.Legend>
      <Fieldset.Description>
        Bekreft om du ønsker å bli kontaktet per e-post.
      </Fieldset.Description>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-6)' }}
      >
        <Radio
          id={context.id + '-inline-ja'}
          name="my-inline"
          label="Ja"
          value="ja"
        />
        <Radio
          id={context.id + '-inline-nei'}
          name="my-inline"
          label="Nei"
          value="nei"
        />
      </div>
    </Fieldset>
  ),
});

export const RadioInColorContext = meta.story({
  args: {
    label: 'Radio',
    description: 'Description',
    checked: true,
    id: 'radio-in-color-context',
  },
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Radio {...args} />
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const radio = within(canvasElement).getByRole('radio');
        const expectedColor = getComputedStyle(radio).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        expect(radio).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
});

export const Focused = meta.story({
  args: {
    label: 'Radio',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    onClick: fn(),
    id: 'radio-preview',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
});
