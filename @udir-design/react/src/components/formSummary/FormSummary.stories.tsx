import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { FormSummary } from '.';
import './formSummary.stories.modules.css';

const meta = preview.meta({
  component: FormSummary,
  subcomponents: {
    'FormSummary.Section': FormSummary.Section,
    'FormSummary.Fields': FormSummary.Fields,
    'FormSummary.Field': FormSummary.Field,
  },
  tags: [],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'centered',
  },
  decorators: [withResponsiveDataSize],
  args: { children: undefined },
});

export const Preview = meta.story({
  args: {
    title: 'Oppsummering',
  },
  render: (args) => (
    <FormSummary {...args} className="form-summary-size">
      <FormSummary.Section
        title="Første seksjon (enkeltside)"
        editHref="#"
        headingLevel={3}
      >
        <FormSummary.Fields>
          <FormSummary.Field label="Første spørsmål" value="Første svar" />
          <FormSummary.Field label="Andre spørsmål" value="Andre svar" />
          <FormSummary.Field label="Tredje spørsmål" value="Tredje svar" />
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section
        title="Andre seksjon (enkeltside)"
        editHref="#"
        headingLevel={3}
      >
        <FormSummary.Fields>
          <FormSummary.Field label="Første spørsmål" value="Første svar" />
          <FormSummary.Field label="Andre spørsmål" value="Andre svar" />
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Tredje seksjon" headingLevel={3}>
        <FormSummary.Section title="Første side" editHref="#" headingLevel={4}>
          <FormSummary.Fields>
            <FormSummary.Field label="Første spørsmål" value="Første svar" />
            <FormSummary.Field label="Andre spørsmål" value="Andre svar" />
            <FormSummary.Field label="Tredje spørsmål" value="Tredje svar" />
          </FormSummary.Fields>
        </FormSummary.Section>
        <FormSummary.Section title="Andre side" editHref="#" headingLevel={3}>
          <FormSummary.Fields>
            <FormSummary.Field label="Første spørsmål" value="Første svar" />
            <FormSummary.Field label="Andre spørsmål" value="Andre svar" />
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>
    </FormSummary>
  ),
});

export const NestedSections = meta.story({
  args: {
    title: 'Oppsummering',
  },
  render: (args) => (
    <FormSummary {...args} className="form-summary-size">
      <FormSummary.Section title="Foresatt" editHref="#" headingLevel={3}>
        <FormSummary.Fields>
          <FormSummary.Field label="Fornavn" value="Ola" />
          <FormSummary.Field label="Etternavn" value="Olsen" />
          <FormSummary.Field label="Fødselsdato" value="01.01.1990" />
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Barn" headingLevel={3}>
        <FormSummary.Section title="Barn 1" editHref="#" headingLevel={4}>
          <FormSummary.Fields>
            <FormSummary.Field label="Fornavn" value="Karianne" />
            <FormSummary.Field label="Etternavn" value="Hansen" />
          </FormSummary.Fields>
        </FormSummary.Section>

        <FormSummary.Section title="Barn 2" editHref="#" headingLevel={4}>
          <FormSummary.Fields>
            <FormSummary.Field label="Fornavn" value="Stine" />
            <FormSummary.Field label="Etternavn" value="Stiansen" />
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>

      <FormSummary.Section title="Adresse" editHref="#" headingLevel={3}>
        <FormSummary.Fields>
          <FormSummary.Field label="Gateadresse" value="Storgata 1" />
          <FormSummary.Field label="Postnummer" value="0123" />
          <FormSummary.Field label="Poststed" value="Oslo" />
        </FormSummary.Fields>
      </FormSummary.Section>
    </FormSummary>
  ),
});

export const ErrorStates = meta.story({
  args: {
    title: 'Oppsummering',
  },
  render: (args) => (
    <FormSummary className="form-summary-size" {...args}>
      <FormSummary.Section title="Foresatt" editHref="#" headingLevel={3}>
        <FormSummary.Fields>
          <FormSummary.Field label="Fornavn" error="Fornavn må fylles ut" />
          <FormSummary.Field label="Etternavn" />
          <FormSummary.Field
            label="Fødselsdato"
            value="32.01.1990"
            error="Ugyldig dato"
          />
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Barn" headingLevel={3}>
        <FormSummary.Section title="Barn 1" editHref="#" headingLevel={4}>
          <FormSummary.Fields>
            <FormSummary.Field label="Fornavn" value="Karianne" />
            <FormSummary.Field label="Etternavn" value="Hansen" />
          </FormSummary.Fields>
        </FormSummary.Section>

        <FormSummary.Section title="Barn 2" editHref="#" headingLevel={4}>
          <FormSummary.Fields>
            <FormSummary.Field label="Fornavn" value="Stine" />
            <FormSummary.Field label="Etternavn" value="Stiansen" />
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>

      <FormSummary.Section title="Adresse" editHref="#" headingLevel={3}>
        <FormSummary.Fields>
          <FormSummary.Field
            label="Gateadresse"
            error="Gateadresse må fylles ut"
          />
          <FormSummary.Field label="Postnummer" value="0123" />
          <FormSummary.Field label="Poststed" value="Oslo" />
        </FormSummary.Fields>
      </FormSummary.Section>
    </FormSummary>
  ),
});
