import type { StoryContext } from '@storybook/react-vite';
import preview from '.storybook/preview';
import { useCheckboxGroup } from 'src/utilities/hooks/useCheckboxGroup/useCheckboxGroup';
import { Card } from '../card/Card';
import { Checkbox } from '../checkbox/Checkbox';
import { Fieldset } from '../fieldset/Fieldset';
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
      <Textfield id={id(context, 'first')} label="Fornavn" required />
      <Textfield id={id(context, 'middle')} label="Mellomnavn" />
      <Textfield id={id(context, 'last')} label="Etternavn" required />
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
        <Textfield id={id(context, 'first')} label="Fornavn" required />
        <Textfield id={id(context, 'middle')} label="Mellomnavn" />
        <Textfield id={id(context, 'last')} label="Etternavn" required />
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
      <Textfield id={id(context, 'first')} label="Fornavn" required />
      <Textfield id={id(context, 'last')} label="Etternavn" required />
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
        label="Hva synes du om skjemaet?"
      />
      <Textfield
        id={id(context, 'other')}
        multiline
        label="Har du noen andre innspill?"
      />
    </FieldNecessity>
  ),
});

export const SingleOptionalField = meta.story({
  args: { showSummary: false },
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
        id={id(context, 'comments')}
        multiline
        label="Har du noen kommentarer?"
      />
    </FieldNecessity>
  ),
});

export const SingleRequiredField = meta.story({
  args: { showSummary: false },
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
        id={id(context, 'events')}
        multiline
        label="Beskriv hendelsesforløpet"
        required
      />
    </FieldNecessity>
  ),
});

export const FieldsetCheckboxes = meta.story({
  args: { showSummary: false },
  render: (args, context) => {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      required: true,
    });

    return (
      <FieldNecessity
        {...args}
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 'var(--ds-size-4)',
        }}
      >
        <Fieldset>
          <Fieldset.Legend>
            Hvordan vil du helst at vi skal kontakte deg?
          </Fieldset.Legend>
          <Fieldset.Description>
            Velg de alternativene som er relevante for deg.
          </Fieldset.Description>
          <Checkbox
            id={id(context, 'email')}
            label="E-post"
            {...getCheckboxProps('epost')}
          />
          <Checkbox
            id={id(context, 'telefon')}
            label="Telefon"
            {...getCheckboxProps('telefon')}
          />
          <Checkbox
            id={id(context, 'sms')}
            label="SMS"
            {...getCheckboxProps('sms')}
          />
          <ValidationMessage {...validationMessageProps} />
        </Fieldset>
      </FieldNecessity>
    );
  },
});

export const IndividualCheckboxes = meta.story({
  render: (args, context) => {
    return (
      <FieldNecessity
        {...args}
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 'var(--ds-size-4)',
        }}
      >
        <Checkbox
          id={id(context, 'terms-conditions')}
          label="Jeg bekrefter at opplysningene i søknaden er korrekt"
          required
        />
        <Checkbox
          id={id(context, 'contact')}
          label="Jeg er villig til å delta i en spørreundersøkelse i etterkant av søknadsprosessen"
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
      <Textfield id={id(context, 'first')} label="Fornavn" required />
      <Textfield id={id(context, 'middle')} label="Etternavn" required />
      <Textfield id={id(context, 'last')} label="E-postadresse" required />
    </FieldNecessity>
  ),
});
