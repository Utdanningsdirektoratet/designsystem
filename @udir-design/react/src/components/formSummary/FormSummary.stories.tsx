import type { Meta, StoryObj } from '@storybook/react-vite';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import { Link } from '../link/Link';
import { FormSummary } from '.';
import './formSummary.stories.modules.css';

const meta: Meta<typeof FormSummary> = {
  component: FormSummary,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'centered',
  },
  decorators: [withResponsiveDataSize],
};

export default meta;
type Story = StoryObj<typeof FormSummary>;

export const Preview: Story = {
  render: (args) => (
    <FormSummary {...args} className="form-summary-size">
      <FormSummary.Section title="Oppsummering" level={1} />
      <FormSummary.Section
        title="Første seksjon (enkeltside)"
        editHref="#"
        level={2}
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
        level={2}
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

      <FormSummary.Section title="Tredje seksjon" level={2}>
        <FormSummary.Section title="Første side" editHref="#" level={3}>
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
};

export const NestedSections: Story = {
  render: (args) => (
    <FormSummary {...args} className="form-summary-size">
      <FormSummary.Section title="Oppsummering" level={1} />
      <FormSummary.Section title="Foresatt" editHref="#" level={2}>
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

      <FormSummary.Section title="Barn" level={2}>
        <FormSummary.Section title="Barn 1" editHref="#" level={3}>
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

        <FormSummary.Section title="Barn 2" editHref="#" level={3}>
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

      <FormSummary.Section title="Adresse" editHref="#" level={2}>
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
};

export const ErrorStates: Story = {
  render: (args) => (
    <FormSummary {...args} className="form-summary-size">
      <FormSummary.Section title="Oppsummering" level={1} />
      <FormSummary.Section title="Foresatt" editHref="#" level={2}>
        <FormSummary.Fields>
          <FormSummary.Field error="Fornavn må fylles ut">
            <FormSummary.Field.Label>Fornavn</FormSummary.Field.Label>
            <FormSummary.Field.Answer>
              <Link href="#">Fyll ut fornavn</Link>
            </FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field error="Etternavn må fylles ut">
            <FormSummary.Field.Label>Etternavn</FormSummary.Field.Label>
            <FormSummary.Field.Answer>
              <Link href="#">Fyll ut etternavn</Link>
            </FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field error="Ugyldig dato">
            <FormSummary.Field.Label>Fødselsdato</FormSummary.Field.Label>
            <FormSummary.Field.Answer>32.01.1990</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section title="Barn" level={2}>
        <FormSummary.Section title="Barn 1" editHref="#" level={3}>
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

        <FormSummary.Section title="Barn 2" editHref="#" level={3}>
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

      <FormSummary.Section title="Adresse" editHref="#" level={2}>
        <FormSummary.Fields>
          <FormSummary.Field error="Gateadresse må fylles ut">
            <FormSummary.Field.Label>Gateadresse</FormSummary.Field.Label>
            <FormSummary.Field.Answer>
              <Link href="#">Fyll ut gateadresse</Link>
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
};
