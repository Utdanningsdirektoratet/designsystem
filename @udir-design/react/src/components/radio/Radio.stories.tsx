import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import {
  UseRadioGroupProps,
  useRadioGroup,
} from 'src/utilities/hooks/useRadioGroup/useRadioGroup';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Divider } from '../divider/Divider';
import { Fieldset } from '../fieldset/Fieldset';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;
type GroupStory = StoryObj<UseRadioGroupProps>;

export const Preview: Story = {
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
};

const ageGroups = [
  { value: '10-20', label: '10-20 år' },
  { value: '21-45', label: '21-45 år' },
  { value: '46-80', label: '46-80 år' },
];

export const Group: GroupStory = {
  args: {
    name: 'my-group',
    readOnly: false,
    disabled: false,
    value: 'sjokolade',
  },
  render(args, context) {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Velg din aldersgruppe.</Fieldset.Legend>
        <Fieldset.Description>
          Informasjonen blir brukt til å tilpasse innholdet på siden.
        </Fieldset.Description>
        {ageGroups.map((group) => (
          <Radio
            key={group.value}
            id={context.id + '-' + group.value}
            label={group.label}
            {...getRadioProps(group.value)}
          />
        ))}
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');

    await step('Keyboard interaction', async () => {
      radios[0].focus();
      expect(radios[0]).toHaveFocus();
      await userEvent.keyboard(' ');
      expect(radios[0]).toBeChecked();
      await userEvent.keyboard('{ArrowDown}');
      expect(radios[1]).toHaveFocus();
      expect(radios[1]).toBeChecked();
      await userEvent.keyboard('{ArrowUp}');
      expect(radios[0]).toHaveFocus();
      expect(radios[0]).toBeChecked();
      await userEvent.keyboard('{ArrowRight}');
      expect(radios[1]).toHaveFocus();
      expect(radios[1]).toBeChecked();
      await userEvent.keyboard('{ArrowLeft}');
      expect(radios[0]).toHaveFocus();
      expect(radios[0]).toBeChecked();
    });
  },
};

export const WithError = {
  args: {
    ...Group.args,
    error: 'Du må velge en aldersgruppe',
    name: 'my-error',
  },
  render: Group.render,
};

const educationLevels = [
  { value: 'kindergarten', label: 'Barnehage' },
  { value: 'primary', label: 'Grunnskole' },
  { value: 'secondary', label: 'Videregående' },
  { value: 'higher', label: 'Høyere utdanning' },
];

export const Controlled: StoryFn<UseRadioGroupProps> = (args, context) => {
  const { value, setValue, getRadioProps } = useRadioGroup({
    ...args,
  });
  return (
    <>
      <Fieldset>
        <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
        <Fieldset.Description>
          Velg det høyeste utdanningsnivået du har fullført.
        </Fieldset.Description>
        {educationLevels.map((level) => (
          <Radio
            key={level.value}
            id={`${context.id}-${level.value}`}
            label={level.label}
            {...getRadioProps(level.value)}
          />
        ))}
      </Fieldset>
      <Divider style={{ marginTop: 'var(--ds-size-4)' }} />
      <Paragraph style={{ marginBlock: 'var(--ds-size-2)' }}>
        Du har valgt:{' '}
        {educationLevels.find((level) => level.value === value)?.label}
      </Paragraph>
      <div data-size="sm" style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="secondary" onClick={() => setValue('kindergarten')}>
          Velg Barnehage
        </Button>
        <Button variant="secondary" onClick={() => setValue('primary')}>
          Velg Grunnskole
        </Button>
      </div>
    </>
  );
};

Controlled.parameters = {
  customStyles: {
    display: 'flex',
    gap: 'var(--ds-size-2)',
    flexDirection: 'column',
  },
  docs: { source: { type: 'code', transform: formatReactSource } },
};

export const Disabled = {
  args: { ...Group.args, disabled: true, name: 'my-disabled' },
  render: Group.render,
  parameters: {
    // Disabled inputs don't pass text contrast requirements
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export const ReadOnly = {
  args: { ...Group.args, readOnly: true, name: 'my-readonly' },
  render: Group.render,
};

export const Inline: Story = {
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
};

export const RadioInColorContext: Story = {
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
};

export const Focused: Story = {
  args: Preview.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};
