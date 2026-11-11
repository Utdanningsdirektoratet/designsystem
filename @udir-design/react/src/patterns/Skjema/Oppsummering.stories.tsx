import { PencilIcon, PlusIcon, TrashIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { FormSummary } from 'src/components/formSummary';
import { Table } from 'src/components/table';
import { Tooltip } from 'src/components/tooltip';
import { Heading } from 'src/components/typography/heading';

const meta = preview.meta({
  title: 'patterns/Skjema/Oppsummering',
  tags: ['alpha', 'udir'],
  parameters: {
    layout: 'centered',
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [withResponsiveDataSize],
});

export const EnkeltSkjema = meta.story({
  name: 'Oppsummering med FormSummary',
  parameters: {
    customStyles: {
      width: 'min(40rem, calc(100vw - var(--ds-size-8)))',
      maxWidth: '100%',
    },
  },
  render: () => (
    <FormSummary title="Oppsummering">
      <FormSummary.Section title="Om skoleeier" editHref="#" headingLevel={3}>
        <FormSummary.Fields>
          <FormSummary.Field label="Organisasjonsnummer" value="987 654 321" />
          <FormSummary.Field label="Skoleeier" value="Eksempel kommune" />
          <FormSummary.Field label="Kontaktperson" value="Kari Nordmann" />
        </FormSummary.Fields>
      </FormSummary.Section>
      <FormSummary.Section
        title="Kontaktinformasjon"
        editHref="#"
        headingLevel={3}
      >
        <FormSummary.Fields>
          <FormSummary.Field label="E-postadresse" value="kari@eksempel.no" />
          <FormSummary.Field label="Telefonnummer" />
        </FormSummary.Fields>
      </FormSummary.Section>
      <FormSummary.Section title="Om tilskuddet" editHref="#" headingLevel={3}>
        <FormSummary.Fields>
          <FormSummary.Field
            label="Tilskuddsordning"
            value="Videreutdanning for lærere"
          />
          <FormSummary.Field label="Skoleår" value="2026–2027" />
          <FormSummary.Field label="Antall lærere" value="12" />
        </FormSummary.Fields>
      </FormSummary.Section>
    </FormSummary>
  ),
});

const teachers = [
  {
    id: 1,
    name: 'Kari Hansen',
    school: 'Solbakken skole',
    subject: 'Norsk',
    credits: 30,
  },
  {
    id: 2,
    name: 'Ola Berg',
    school: 'Solbakken skole',
    subject: 'Matematikk',
    credits: 30,
  },
  {
    id: 3,
    name: 'Ingrid Moen',
    school: 'Nordre Åsen ungdomsskole',
    subject: 'Engelsk',
    credits: 15,
  },
  {
    id: 4,
    name: 'Per Solberg',
    school: 'Nordre Åsen ungdomsskole',
    subject: 'Naturfag',
    credits: 30,
  },
  {
    id: 5,
    name: 'Nina Lund',
    school: 'Fjellvang videregående skole',
    subject: 'Matematikk',
    credits: 60,
  },
  {
    id: 6,
    name: 'Henrik Aas',
    school: 'Fjellvang videregående skole',
    subject: 'Samfunnsfag',
    credits: 15,
  },
];

export const Tabell = meta.story({
  name: 'Oppsummering med tabell og handlinger',
  parameters: {
    customStyles: {
      width: 'min(50rem, calc(100vw - var(--ds-size-8)))',
      maxWidth: '100%',
    },
  },
  render: () => (
    <section>
      <style>
        {`
.oppsummering-tabell-heading {
  margin-bottom: var(--ds-size-3);
}

.oppsummering-tabell-numeric {
  text-align: right;
}

.oppsummering-tabell-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--ds-size-2);
}

.oppsummering-tabell-add {
  margin-top: var(--ds-size-4);
}`}
      </style>
      <Heading level={2} data-size="xs" className="oppsummering-tabell-heading">
        Lærere som skal få videreutdanning
      </Heading>
      <Table zebra>
        <caption className="ds-sr-only">
          Lærere som er lagt til i søknaden
        </caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Lærer</Table.HeaderCell>
            <Table.HeaderCell>Skole</Table.HeaderCell>
            <Table.HeaderCell>Fag</Table.HeaderCell>
            <Table.HeaderCell className="oppsummering-tabell-numeric">
              Studiepoeng
            </Table.HeaderCell>
            <Table.HeaderCell>
              <span className="ds-sr-only">Handlinger</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {teachers.map((teacher) => (
            <Table.Row key={teacher.id}>
              <Table.Cell>{teacher.name}</Table.Cell>
              <Table.Cell>{teacher.school}</Table.Cell>
              <Table.Cell>{teacher.subject}</Table.Cell>
              <Table.Cell className="oppsummering-tabell-numeric">
                {teacher.credits}
              </Table.Cell>
              <Table.Cell>
                <div className="oppsummering-tabell-actions">
                  <Tooltip content="Rediger">
                    <Button variant="tertiary" data-size="sm">
                      <PencilIcon aria-hidden />
                      <span className="ds-sr-only">Rediger {teacher.name}</span>
                    </Button>
                  </Tooltip>
                  <Tooltip content="Slett">
                    <Button
                      variant="tertiary"
                      data-size="sm"
                      data-color="danger"
                    >
                      <TrashIcon aria-hidden />
                      <span className="ds-sr-only">Slett {teacher.name}</span>
                    </Button>
                  </Tooltip>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button
        variant="secondary"
        data-size="sm"
        className="oppsummering-tabell-add"
      >
        <PlusIcon aria-hidden />
        Legg til lærer
      </Button>
    </section>
  ),
});
