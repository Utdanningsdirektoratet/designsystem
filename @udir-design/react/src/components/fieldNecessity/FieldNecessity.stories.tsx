import type { StoryContext } from '@storybook/react-vite';
import preview from '.storybook/preview';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import { useCheckboxGroup } from 'src/utilities/hooks/useCheckboxGroup/useCheckboxGroup';
import { useRadioGroup } from 'src/utilities/hooks/useRadioGroup/useRadioGroup';
import { Card } from '../card/Card';
import { Checkbox } from '../checkbox/Checkbox';
import { Fieldset } from '../fieldset/Fieldset';
import { Radio } from '../radio/Radio';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { FieldNecessity } from '.';

const meta = preview.meta({
  component: FieldNecessity,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'centered',
  },
});

function id(context: StoryContext, id: string) {
  const prefix = context.id.split('--')[1] ?? context.id;
  return `${prefix}-${id}`;
}

export const Preview = meta.story({
  render: (args, context) => (
    <FieldNecessity
      {...args}
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 'var(--ds-size-4)',
      }}
    >
      <Textfield
        id={id(context, 'first')}
        label={<span>Fornavn</span>}
        required
      />
      <Textfield id={id(context, 'middle')} label={<span>Mellomnavn</span>} />
      <Textfield
        id={id(context, 'last')}
        label={<span>Etternavn</span>}
        required
      />
    </FieldNecessity>
  ),
});

export const Outline = meta.story({
  args: { variant: 'outline' },
  render: (args, context) => (
    <Card variant="tinted">
      <FieldNecessity
        {...args}
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 'var(--ds-size-4)',
        }}
      >
        <Textfield
          id={id(context, 'first')}
          label={<span>Fornavn</span>}
          required
        />
        <Textfield id={id(context, 'middle')} label={<span>Mellomnavn</span>} />
        <Textfield
          id={id(context, 'last')}
          label={<span>Etternavn</span>}
          required
        />
      </FieldNecessity>
    </Card>
  ),
});

export const AllRequired = meta.story({
  render: (args, context) => (
    <FieldNecessity
      {...args}
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 'var(--ds-size-4)',
      }}
    >
      <Textfield
        id={id(context, 'first')}
        label={<span>Fornavn</span>}
        required
      />
      <Textfield
        id={id(context, 'last')}
        label={<span>Etternavn</span>}
        required
      />
    </FieldNecessity>
  ),
});

export const AllOptional = meta.story({
  render: (args, context) => (
    <FieldNecessity
      {...args}
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 'var(--ds-size-4)',
      }}
    >
      <Textfield
        id={id(context, 'opinion')}
        multiline
        label={<span>Hva synes du om skjemaet?</span>}
      />
      <Textfield
        id={id(context, 'other')}
        multiline
        label={<span>Har du noen andre innspill?</span>}
      />
    </FieldNecessity>
  ),
});

export const SingleOptionalField = meta.story({
  args: { showSummary: false, showOptional: true },
  render: (args, context) => (
    <FieldNecessity {...args}>
      <Textfield
        id={id(context, 'comments')}
        multiline
        label={<span>Har du noen kommentarer?</span>}
      />
    </FieldNecessity>
  ),
});

export const SingleRequiredField = meta.story({
  args: { showSummary: false },
  render: (args, context) => (
    <FieldNecessity {...args}>
      <Textfield
        id={id(context, 'events')}
        multiline
        label={<span>Beskriv hendelsesforløpet</span>}
        required
      />
    </FieldNecessity>
  ),
});

export const FieldsetCheckboxes = meta.story({
  parameters: {
    docs: { source: { type: 'code', transform: formatReactSource } },
  },
  args: { showSummary: false },
  render: (args, context) => {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      required: true,
      name: 'checkbox-group',
    });

    return (
      <FieldNecessity {...args}>
        <Fieldset>
          <Fieldset.Legend>
            <span>Hvordan vil du helst at vi skal kontakte deg?</span>
          </Fieldset.Legend>
          <Fieldset.Description>
            Velg de alternativene som er relevante for deg.
          </Fieldset.Description>
          <Checkbox
            id={id(context, 'email')}
            label={<span>E-post</span>}
            {...getCheckboxProps('epost')}
          />
          <Checkbox
            id={id(context, 'telefon')}
            label={<span>Telefon</span>}
            {...getCheckboxProps('telefon')}
          />
          <Checkbox
            id={id(context, 'sms')}
            label={<span>SMS</span>}
            {...getCheckboxProps('sms')}
          />
          <ValidationMessage {...validationMessageProps} />
        </Fieldset>
      </FieldNecessity>
    );
  },
});

export const FieldsetRadios = meta.story({
  parameters: {
    docs: { source: { type: 'code', transform: formatReactSource } },
  },
  args: { showSummary: false },
  render: (args, context) => {
    const ageGroups = [
      { value: '10-20', label: '10-20 år' },
      { value: '21-45', label: '21-45 år' },
      { value: '46-80', label: '46-80 år' },
    ];
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      required: true,
      name: 'radio-group',
    });

    return (
      <FieldNecessity {...args}>
        <Fieldset>
          <Fieldset.Legend>
            <span>Velg din aldersgruppe</span>
          </Fieldset.Legend>
          {ageGroups.map((group) => (
            <Radio
              key={group.value}
              id={id(context, group.value)}
              label={group.label}
              {...getRadioProps(group.value)}
            />
          ))}
          <ValidationMessage {...validationMessageProps} />
        </Fieldset>
      </FieldNecessity>
    );
  },
});

export const IndividualCheckboxes = meta.story({
  render: (args, context) => {
    return (
      <FieldNecessity {...args}>
        <Checkbox
          id={id(context, 'terms-conditions')}
          label={
            <span>Jeg bekrefter at opplysningene i søknaden er korrekt</span>
          }
          required
        />
        <Checkbox
          id={id(context, 'contact')}
          label={
            <span>
              Jeg er villig til å delta i en spørreundersøkelse i etterkant av
              søknadsprosessen
            </span>
          }
        />
      </FieldNecessity>
    );
  },
});

export const ManualSummaryPlacement = meta.story({
  render: (args, context) => (
    <FieldNecessity
      {...args}
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 'var(--ds-size-4)',
      }}
    >
      <Heading level={2} data-size="md">
        Kontaktinformasjon
      </Heading>
      <Paragraph>
        Vi trenger å vite hvordan vi kan kontakte deg i etterkant av søknaden.
      </Paragraph>
      <FieldNecessity.Summary />
      <Textfield
        id={id(context, 'first')}
        label={<span>Fornavn</span>}
        required
      />
      <Textfield
        id={id(context, 'middle')}
        label={<span>Etternavn</span>}
        required
      />
      <Textfield
        id={id(context, 'last')}
        label={<span>E-postadresse</span>}
        required
      />
    </FieldNecessity>
  ),
});
