import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { FormSummary } from '.';
import './formSummary.stories.modules.css';

const meta = preview.meta({
  component: FormSummary,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'centered',
  },
  decorators: [withResponsiveDataSize],
});

export const Preview = meta.story({
  render: () => (
    <FormSummary className="form-summary-size" title="Oppsummering">
      <FormSummary.Section
        title="Første seksjon (enkeltside)"
        editHref="#"
        level={3}
      >
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Første spørsmål</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Første svar</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Andre spørsmål</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Andre svar</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Tredje spørsmål</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Tredje svar</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section
        title="Andre seksjon (enkeltside)"
        editHref="#"
        level={3}
      >
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Første spørsmål</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Første svar</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Andre spørsmål</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Andre svar</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Tredje seksjon" level={3}>
        <FormSummary.Section title="Første side" editHref="#" level={4}>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Første spørsmål</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Første svar</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Andre spørsmål</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Andre svar</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Tredje spørsmål</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Tredje svar</FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>
        <FormSummary.Section title="Andre side" editHref="#" level={3}>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Første spørsmål</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Første svar</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Andre spørsmål</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Andre svar</FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>
    </FormSummary>
  ),
});

export const NestedSections = meta.story({
  render: () => (
    <FormSummary className="form-summary-size" title="Oppsummering">
      <FormSummary.Section title="Foresatt" editHref="#" level={3}>
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Ola</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Olsen</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Fødselsdato</FormSummary.Field.Label>
            <FormSummary.Field.Answer>01.01.1990</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Barn" level={3}>
        <FormSummary.Section title="Barn 1" editHref="#" level={4}>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Karianne</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Hansen</FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>

        <FormSummary.Section title="Barn 2" editHref="#" level={4}>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Stine</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Stiansen</FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>

      <FormSummary.Section title="Adresse" editHref="#" level={3}>
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Gateadresse</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Storgata 1</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Postnummer</FormSummary.Field.Label>
            <FormSummary.Field.Answer>0123</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Poststed</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Oslo</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>
    </FormSummary>
  ),
});

export const ErrorStates = meta.story({
  render: () => (
    <FormSummary className="form-summary-size" title="Oppsummering">
      <FormSummary.Section title="Foresatt" editHref="#" level={3}>
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
            <FormSummary.Field.Answer error="Fornavn må fylles ut">
              Ikke besvart
            </FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
            <FormSummary.Field.Answer error="Etternavn må fylles ut">
              Ikke besvart
            </FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Fødselsdato</FormSummary.Field.Label>
            <FormSummary.Field.Answer error="Ugyldig dato">
              32.01.1990
            </FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Barn" level={3}>
        <FormSummary.Section title="Barn 1" editHref="#" level={4}>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Karianne</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Hansen</FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>

        <FormSummary.Section title="Barn 2" editHref="#" level={4}>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Stine</FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
              <FormSummary.Field.Answer>Stiansen</FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>

      <FormSummary.Section title="Adresse" editHref="#" level={3}>
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Gateadresse</FormSummary.Field.Label>
            <FormSummary.Field.Answer error="Gateadresse må fylles ut">
              Ikke besvart
            </FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Postnummer</FormSummary.Field.Label>
            <FormSummary.Field.Answer>0123</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Poststed</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Oslo</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>
    </FormSummary>
  ),
});
