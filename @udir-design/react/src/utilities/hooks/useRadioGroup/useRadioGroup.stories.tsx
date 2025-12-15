import type { StoryContext } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import type { DecoratorType } from '.storybook/types';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button/Button';
import { Divider } from 'src/components/divider/Divider';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Radio } from 'src/components/radio/Radio';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { ValidationMessage } from 'src/components/typography/validationMessage/ValidationMessage';
import { type UseRadioGroupProps, useRadioGroup } from './useRadioGroup';

const meta = preview.meta<
  UseRadioGroupProps,
  DecoratorType,
  Partial<UseRadioGroupProps>
>({
  title: 'Utilities/useRadioGroup',
  parameters: {
    componentOrigin: { originator: 'digdir' },
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    name: {
      table: { type: { summary: 'string' } },
      description:
        'Name of all radios. If no name is passed, an auto-generated name will be created.',
    },
    value: {
      description: 'Value of selected radio',
      table: { defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    onChange: {
      description: 'Callback when selected radio changes',
      table: {
        type: {
          summary:
            '(nextValue: string, prevValue: string, event: Event) => void;',
        },
      },
    },
    error: {
      table: { type: { summary: 'string | ReactNode' } },
      description: 'Shared error message for all radios.',
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set disabled state of all radios',
    },
    readOnly: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set read only state of all radios',
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set required state of all radios',
    },
  },
});

const ageGroups = [
  { value: '10-20', label: '10-20 år' },
  { value: '21-45', label: '21-45 år' },
  { value: '46-80', label: '46-80 år' },
];

export const Default = meta.story({
  args: {
    name: 'my-group',
    readOnly: false,
    disabled: false,
    value: '10-20',
  },
  render(args, context) {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Velg din aldersgruppe.</Fieldset.Legend>
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
});

const educationLevels = [
  { value: 'kindergarten', label: 'Barnehage' },
  { value: 'primary', label: 'Grunnskole' },
  { value: 'secondary', label: 'Videregående' },
  { value: 'higher', label: 'Høyere utdanning' },
];

export const Controlled = meta.story({
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-2)',
      flexDirection: 'column',
    },
    docs: { source: { type: 'code', transform: formatReactSource } },
  },
  render: (args, context) => {
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
  },
});

const GroupBase = {
  args: {
    name: 'my-group',
    readOnly: false,
    disabled: false,
    value: 'sjokolade',
  },
  render(args: UseRadioGroupProps, context: StoryContext<UseRadioGroupProps>) {
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
};

export const Group = meta.story({
  ...GroupBase,
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
});

export const WithError = meta.story({
  args: {
    ...GroupBase.args,
    error: 'Du må velge en aldersgruppe',
    name: 'my-error',
  },
  render: GroupBase.render,
});

export const Disabled = meta.story({
  args: { ...GroupBase.args, disabled: true, name: 'my-disabled' },
  render: GroupBase.render,
  parameters: {
    // Disabled inputs don't pass text contrast requirements
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
});

export const ReadOnly = meta.story({
  args: { ...GroupBase.args, readOnly: true, name: 'my-readonly' },
  render: GroupBase.render,
});
