import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import type { DecoratorType } from '.storybook/types';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button/Button';
import { Divider } from 'src/components/divider/Divider';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Radio } from 'src/components/radio/Radio';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { Prose } from 'src/components/typography/prose/Prose';
import { ValidationMessage } from 'src/components/typography/validationMessage/ValidationMessage';
import { useRadioGroup as fakeUseRadioGroup } from './docs/FakeUseRadioGroup';
import { type UseRadioGroupProps, useRadioGroup } from './useRadioGroup';

const meta = preview.meta<
  UseRadioGroupProps,
  DecoratorType,
  Partial<UseRadioGroupProps>
>({
  title: 'Hooks/useRadioGroup',
  component: fakeUseRadioGroup,
  tags: ['digdir'],
  parameters: {
    componentOrigin: { originator: 'digdir' },
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
    value: '10-20',
  },
  render(args) {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Velg din aldersgruppe</Fieldset.Legend>
        {ageGroups.map((group) => (
          <Radio
            key={group.value}
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
    docs: { advancedCodeDocs },
  },
  render: (args) => {
    const { value, setValue, getRadioProps } = useRadioGroup({
      ...args,
    });
    return (
      <>
        <style>
          {`
.example-button-group {
  display: flex;
  gap: var(--ds-size-2);
}`}
        </style>
        <Fieldset>
          <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
          <Fieldset.Description>
            Velg det høyeste utdanningsnivået du har fullført.
          </Fieldset.Description>
          {educationLevels.map((level) => (
            <Radio
              key={level.value}
              label={level.label}
              {...getRadioProps(level.value)}
            />
          ))}
        </Fieldset>
        <Prose>
          <Divider />
          <Paragraph>
            Du har valgt:{' '}
            {educationLevels.find((level) => level.value === value)?.label}
          </Paragraph>
          <div className="example-button-group">
            <Button
              variant="secondary"
              onClick={() => setValue('kindergarten')}
            >
              Velg Barnehage
            </Button>
            <Button variant="secondary" onClick={() => setValue('primary')}>
              Velg Grunnskole
            </Button>
          </div>
        </Prose>
      </>
    );
  },
});

const GroupBase = {
  args: {
    name: 'my-group',
    value: 'sjokolade',
  },
  render(args: UseRadioGroupProps) {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Velg din aldersgruppe</Fieldset.Legend>
        <Fieldset.Description>
          Informasjonen blir brukt til å tilpasse innholdet på siden.
        </Fieldset.Description>
        {ageGroups.map((group) => (
          <Radio
            key={group.value}
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

export const Outline = Group.extend({
  args: {
    variant: 'outline',
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
