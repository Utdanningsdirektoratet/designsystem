import { usePagination } from '@digdir/designsystemet-react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BellIcon, DownloadIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button';
import { Checkbox } from 'src/components/checkbox';
import { Link } from 'src/components/link';
import { Pagination } from 'src/components/pagination';
import { Table } from 'src/components/table';
import { Tag, type TagProps } from 'src/components/tag';
import { ToggleGroup } from 'src/components/toggleGroup';
import { Tooltip } from 'src/components/tooltip';
import { Paragraph } from 'src/components/typography/paragraph';
import { useCheckboxGroup } from 'src/hooks/useCheckboxGroup';
import {
  type School,
  type SchoolStatus,
  schools as allSchools,
} from 'src/patterns/Tabeller/Filtrering/schools';
import { DataList } from '.';

const meta = preview.meta({
  component: DataList,
  subcomponents: {
    'DataList.Item': DataList.Item,
    'DataList.Row': DataList.Row,
    'DataList.Title': DataList.Title,
    'DataList.Value': DataList.Value,
    'DataList.Aside': DataList.Aside,
  },
  tags: [],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [withResponsiveDataSize],
  args: { children: undefined },
});

/* Oppgaver */

type TaskStatus = 'Ny' | 'Pågår' | 'Ferdig';
type Priority = 'Lav' | 'Middels' | 'Høy';

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: Priority;
  type: string;
  created: string;
  changed: string;
  changedBy: string;
};

const taskStatusColor: Record<TaskStatus, TagProps['data-color']> = {
  Ny: 'neutral',
  Pågår: 'info',
  Ferdig: 'success',
};

const priorityColor: Record<Priority, TagProps['data-color']> = {
  Lav: 'neutral',
  Middels: 'warning',
  Høy: 'danger',
};

const tasks: Task[] = [
  {
    id: 1,
    title: 'Oppdater personvernerklæringen',
    status: 'Pågår',
    priority: 'Lav',
    type: 'Innhold',
    created: '13. november',
    changed: '27. november',
    changedBy: 'Markus',
  },
  {
    id: 2,
    title: 'Feil i utregning av karaktersnitt',
    status: 'Ny',
    priority: 'Høy',
    type: 'Feil',
    created: '14. november',
    changed: '14. november',
    changedBy: 'Ingrid',
  },
  {
    id: 3,
    title: 'Legg til eksport til Excel',
    status: 'Pågår',
    priority: 'Middels',
    type: 'Forbedring',
    created: '15. november',
    changed: '26. november',
    changedBy: 'Markus',
  },
  {
    id: 4,
    title: 'Tekstene på forsiden er utdaterte',
    status: 'Ferdig',
    priority: 'Lav',
    type: 'Innhold',
    created: '18. november',
    changed: '22. november',
    changedBy: 'Sara',
  },
];

export const Preview = meta.story({
  args: { 'aria-label': 'Oppgaver' },
  render: (args) => (
    <DataList {...args}>
      {tasks.map((task) => (
        <DataList.Item key={task.id}>
          <DataList.Row>
            <DataList.Title>{task.title}</DataList.Title>
            <DataList.Value label="Status">
              <Tag data-color={taskStatusColor[task.status]}>{task.status}</Tag>
            </DataList.Value>
            <DataList.Value>Innmeldt {task.created}</DataList.Value>
          </DataList.Row>
          <DataList.Row>
            <DataList.Value label="Prioritet">
              <Tag data-color={priorityColor[task.priority]}>
                {task.priority}
              </Tag>
            </DataList.Value>
            <DataList.Value label="Type">{task.type}</DataList.Value>
            <DataList.Value>Endret {task.changed}</DataList.Value>
            <DataList.Value>Endret av {task.changedBy}</DataList.Value>
          </DataList.Row>
          <DataList.Aside>
            <DataList.Value label="Id">#{task.id}</DataList.Value>
          </DataList.Aside>
        </DataList.Item>
      ))}
    </DataList>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders a list with one item per task', async () => {
      const list = canvas.getByRole('list', { name: 'Oppgaver' });
      await expect(within(list).getAllByRole('listitem')).toHaveLength(4);
    });

    await step('Titles are headings', async () => {
      await expect(
        canvas.getByRole('heading', {
          level: 3,
          name: 'Oppdater personvernerklæringen',
        }),
      ).toBeInTheDocument();
    });

    await step('Values have labels for screen readers', async () => {
      const [firstItem] = canvas.getAllByRole('listitem');
      await expect(firstItem).toHaveTextContent('Status: Pågår');
      await expect(firstItem).toHaveTextContent('Prioritet: Lav');
      await expect(firstItem).toHaveTextContent('Id: #1');
    });
  },
});

/* Læreplaner */

type CurriculumStatus = 'Gjeldende' | 'Utgått';

type Curriculum = {
  code: string;
  title: string;
  status: CurriculumStatus;
  subjectType: string;
  level: string;
  replacedBy?: string;
};

const curricula: Curriculum[] = [
  {
    code: 'MAT01-05',
    title: 'Læreplan i matematikk 1.–10. trinn',
    status: 'Gjeldende',
    subjectType: 'Fellesfag',
    level: 'Grunnskolen',
  },
  {
    code: 'ENG01-04',
    title: 'Læreplan i engelsk',
    status: 'Gjeldende',
    subjectType: 'Fellesfag',
    level: 'Grunnskolen og videregående',
  },
  {
    code: 'NAT01-04',
    title: 'Læreplan i naturfag',
    status: 'Gjeldende',
    subjectType: 'Fellesfag',
    level: 'Grunnskolen og videregående',
  },
  {
    code: 'NOR01-06',
    title: 'Læreplan i norsk',
    status: 'Utgått',
    subjectType: 'Fellesfag',
    level: 'Grunnskolen og videregående',
    replacedBy: 'NOR01-07',
  },
];

const curriculumStatusColor: Record<CurriculumStatus, TagProps['data-color']> =
  {
    Gjeldende: 'success',
    Utgått: 'neutral',
  };

const onOpenCurriculum = fn();

export const ClickableRows = meta.story({
  args: { 'aria-label': 'Læreplaner' },
  render: (args) => (
    <DataList {...args}>
      {curricula.map((curriculum) => (
        <DataList.Item key={curriculum.code} clickable>
          <DataList.Row>
            <DataList.Title>
              <Link
                href={`#${curriculum.code}`}
                onClick={(event) => {
                  event.preventDefault();
                  onOpenCurriculum(curriculum.code);
                }}
              >
                {curriculum.title}
              </Link>
            </DataList.Title>
            <DataList.Value label="Status">
              <Tag data-color={curriculumStatusColor[curriculum.status]}>
                {curriculum.status}
              </Tag>
            </DataList.Value>
            <DataList.Value label="Læreplankode">
              {curriculum.code}
            </DataList.Value>
          </DataList.Row>
          <DataList.Row>
            <DataList.Value label="Fagtype">
              {curriculum.subjectType}
            </DataList.Value>
            <DataList.Value label="Nivå">{curriculum.level}</DataList.Value>
            {curriculum.replacedBy && (
              <DataList.Value>
                Erstattet av {curriculum.replacedBy}
              </DataList.Value>
            )}
          </DataList.Row>
        </DataList.Item>
      ))}
    </DataList>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    onOpenCurriculum.mockClear();

    await step('Clicking anywhere on the item follows the link', async () => {
      await userEvent.click(canvas.getByText('ENG01-04'));
      await expect(onOpenCurriculum).toHaveBeenCalledWith('ENG01-04');
    });

    await step('The link is reachable with the keyboard', async () => {
      await userEvent.tab();
      await expect(
        canvas.getByRole('link', {
          name: 'Læreplan i matematikk 1.–10. trinn',
        }),
      ).toHaveFocus();
    });
  },
});

/* Eksamensoppgaver */

type Exam = {
  code: string;
  subject: string;
  level: string;
  term: string;
  duration: string;
};

const exams: Exam[] = [
  {
    code: 'MAT0010',
    subject: 'Matematikk',
    level: '10. trinn',
    term: 'Vår 2026',
    duration: '5 timer',
  },
  {
    code: 'MAT1021',
    subject: 'Matematikk 1T',
    level: 'Vg1 studieforberedende',
    term: 'Vår 2026',
    duration: '5 timer',
  },
  {
    code: 'ENG1007',
    subject: 'Engelsk',
    level: 'Vg1 studieforberedende',
    term: 'Vår 2026',
    duration: '5 timer',
  },
  {
    code: 'NOR1211',
    subject: 'Norsk hovedmål',
    level: 'Vg3 studieforberedende',
    term: 'Vår 2026',
    duration: '5 timer',
  },
];

const onOpenExam = fn();
const onDownload = fn();

export const WithActions = meta.story({
  args: { 'aria-label': 'Eksamensoppgaver' },
  render: (args) => (
    <DataList {...args}>
      {exams.map((exam) => (
        <DataList.Item key={exam.code} clickable>
          <DataList.Row>
            <DataList.Title>
              <Link
                href={`#eksamen-${exam.code}`}
                onClick={(event) => {
                  event.preventDefault();
                  onOpenExam(exam.code);
                }}
              >
                {exam.subject}
              </Link>
            </DataList.Title>
            <DataList.Value label="Fagkode">{exam.code}</DataList.Value>
            <DataList.Value>{exam.term}</DataList.Value>
          </DataList.Row>
          <DataList.Row>
            <DataList.Value label="Trinn">{exam.level}</DataList.Value>
            <DataList.Value label="Varighet">{exam.duration}</DataList.Value>
          </DataList.Row>
          <DataList.Aside>
            {['Oppgave', 'Sensorveiledning'].map((file) => (
              <Button key={file} asChild variant="tertiary" data-size="sm">
                <a
                  href={`#${exam.code}-${file.toLowerCase()}.pdf`}
                  download
                  onClick={(event) => {
                    event.preventDefault();
                    onDownload(exam.code, file);
                  }}
                >
                  <DownloadIcon aria-hidden />
                  {file}
                  {/* Makes the name unique, and still starts with the
                      visible text */}
                  <span className="ds-sr-only">
                    {' '}
                    for {exam.code} {exam.subject}
                  </span>
                </a>
              </Button>
            ))}
          </DataList.Aside>
        </DataList.Item>
      ))}
    </DataList>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    onOpenExam.mockClear();
    onDownload.mockClear();

    await step('Actions do not trigger the link of the item', async () => {
      await userEvent.click(
        canvas.getByRole('link', {
          name: 'Sensorveiledning for MAT1021 Matematikk 1T',
        }),
      );
      await expect(onDownload).toHaveBeenCalledWith(
        'MAT1021',
        'Sensorveiledning',
      );
      await expect(onOpenExam).not.toHaveBeenCalled();
    });
  },
});

/* Skoler */

const schools = allSchools.slice(0, 10);

const schoolStatusColor: Record<SchoolStatus, TagProps['data-color']> = {
  Ferdig: 'success',
  Behandles: 'info',
  Avvist: 'danger',
};

function SchoolRows({ school, href }: { school: School; href?: string }) {
  return (
    <>
      <DataList.Row>
        <DataList.Title>
          {href ? (
            <Link href={href}>{school.schoolName}</Link>
          ) : (
            school.schoolName
          )}
        </DataList.Title>
        <DataList.Value label="Status">
          <Tag data-color={schoolStatusColor[school.status]}>
            {school.status}
          </Tag>
        </DataList.Value>
        <DataList.Value label="År">{school.year}</DataList.Value>
      </DataList.Row>
      <DataList.Row>
        <DataList.Value label="Kommune">{school.municipality}</DataList.Value>
        <DataList.Value label="System">{school.systemName}</DataList.Value>
      </DataList.Row>
      <DataList.Aside>
        <DataList.Value>Org.nr. {school.organizationNumber}</DataList.Value>
      </DataList.Aside>
    </>
  );
}

export const Selectable = meta.story({
  args: { 'aria-label': 'Skoler som har rapportert' },
  render: function Render(args) {
    const { getCheckboxProps } = useCheckboxGroup({ name: 'valgte-skoler' });
    return (
      <DataList {...args}>
        {schools.slice(0, 4).map((school) => {
          const checkboxId = `datalist-velg-skole-${school.id}`;
          return (
            <DataList.Item key={school.id} data-clickdelegatefor={checkboxId}>
              <Checkbox
                id={checkboxId}
                aria-label={`Velg ${school.schoolName}`}
                {...getCheckboxProps(school.id)}
              />
              <SchoolRows school={school} />
            </DataList.Item>
          );
        })}
      </DataList>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', {
      name: 'Velg Ammerud skole',
    });

    await step('Clicking the item toggles its checkbox', async () => {
      await expect(checkbox).not.toBeChecked();
      await userEvent.click(canvas.getByText('Org.nr. 22222222'));
      await expect(checkbox).toBeChecked();
    });

    await step('Clicking the checkbox itself toggles it once', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    });
  },
});

export const Wrapping = meta.story({
  args: { 'aria-label': 'Skoler som har rapportert' },
  render: (args) => (
    <div style={{ maxWidth: '22rem' }}>
      <DataList {...args}>
        {schools.slice(0, 3).map((school) => (
          <DataList.Item key={school.id}>
            <SchoolRows school={school} href={`#skole-${school.id}`} />
          </DataList.Item>
        ))}
      </DataList>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step('Links alone do not make items clickable', async () => {
      for (const item of within(canvasElement).getAllByRole('listitem')) {
        await expect(item).not.toHaveAttribute('data-clickdelegatefor');
      }
    });
  },
});

/* Høringer */

type Hearing = {
  caseNumber: string;
  title: string;
  open: boolean;
  deadline: string;
  type: string;
  published: string;
};

const hearings: Hearing[] = [
  {
    caseNumber: '2026/1187',
    title: 'Høring om nye læreplaner i kroppsøving',
    open: true,
    deadline: '1. februar 2027',
    type: 'Læreplan',
    published: '2. november 2026',
  },
  {
    caseNumber: '2026/0954',
    title: 'Høring om endringer i rammeplanen for SFO',
    open: false,
    deadline: '1. oktober 2026',
    type: 'Rammeplan',
    published: '20. juni 2026',
  },
];

function HearingActions({ caseNumber }: { caseNumber: string }) {
  return (
    <>
      <Tooltip content={`Last ned høringsnotatet for sak ${caseNumber}`}>
        <Button icon variant="tertiary" data-size="sm">
          <DownloadIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content={`Få varsler om sak ${caseNumber}`}>
        <Button icon variant="tertiary" data-size="sm">
          <BellIcon aria-hidden />
        </Button>
      </Tooltip>
    </>
  );
}

export const MuchContent = meta.story({
  args: { 'aria-label': 'Høringer' },
  render: (args) => (
    <DataList {...args}>
      <DataList.Item clickable>
        <DataList.Row>
          <DataList.Title>
            <Link href="#hoering-2026-1234">
              Høring om endringer i forskrift til opplæringslova om
              standpunktvurdering, eksamen og klagebehandling for elever som
              bytter skole i løpet av skoleåret
            </Link>
          </DataList.Title>
          <DataList.Value label="Status">
            <Tag data-color="success">Åpen</Tag>
          </DataList.Value>
          <DataList.Value>Høringsfrist 15. januar 2027</DataList.Value>
        </DataList.Row>
        <DataList.Row>
          <DataList.Value label="Type">Forskriftsendring</DataList.Value>
          <DataList.Value label="Tema">Vurdering og eksamen</DataList.Value>
          <DataList.Value label="Målgruppe">
            Skoleeiere, skoleledere, lærere og elevorganisasjoner
          </DataList.Value>
          <DataList.Value>Publisert 13. november 2026</DataList.Value>
          <DataList.Value>
            Kontaktperson Markus Johannessen-Bergstrøm
          </DataList.Value>
        </DataList.Row>
        <DataList.Row>
          <DataList.Value label="Sammendrag">
            Elever som bytter skole midt i skoleåret får i dag ikke alltid med
            seg vurderingene fra forrige skole. Vi foreslår at
            halvårsvurderinger, underveisvurderinger og fritak skal følge eleven
            til den nye skolen, og at fristene for klage regnes fra da eleven
            fikk vurderingen.
          </DataList.Value>
        </DataList.Row>
        <DataList.Row>
          <DataList.Value label="Emner">
            <span
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: 'var(--ds-size-2)',
              }}
            >
              <Tag>Standpunkt</Tag>
              <Tag>Eksamen</Tag>
              <Tag>Klage</Tag>
              <Tag>Skolebytte</Tag>
            </span>
          </DataList.Value>
        </DataList.Row>
        <DataList.Aside>
          <DataList.Value>Sak 2026/1234</DataList.Value>
          <HearingActions caseNumber="2026/1234" />
        </DataList.Aside>
      </DataList.Item>
      {hearings.map((hearing) => (
        <DataList.Item key={hearing.caseNumber} clickable>
          <DataList.Row>
            <DataList.Title>
              <Link href={`#hoering-${hearing.caseNumber.replace('/', '-')}`}>
                {hearing.title}
              </Link>
            </DataList.Title>
            <DataList.Value label="Status">
              <Tag data-color={hearing.open ? 'success' : 'neutral'}>
                {hearing.open ? 'Åpen' : 'Avsluttet'}
              </Tag>
            </DataList.Value>
            <DataList.Value>Høringsfrist {hearing.deadline}</DataList.Value>
          </DataList.Row>
          <DataList.Row>
            <DataList.Value label="Type">{hearing.type}</DataList.Value>
            <DataList.Value>Publisert {hearing.published}</DataList.Value>
          </DataList.Row>
          <DataList.Aside>
            <DataList.Value>Sak {hearing.caseNumber}</DataList.Value>
            <HearingActions caseNumber={hearing.caseNumber} />
          </DataList.Aside>
        </DataList.Item>
      ))}
    </DataList>
  ),
});

const PAGE_SIZE = 5;

export const ListOrTable = meta.story({
  args: { 'aria-label': 'Skoler som har rapportert' },
  parameters: { docs: advancedCodeDocs },
  render: function Render(args) {
    const [view, setView] = useState('liste');
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(schools.length / PAGE_SIZE);
    const currentPage = page;
    const visible = schools.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage,
      totalPages,
      showPages: 5,
      setCurrentPage: setPage,
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-6)',
        }}
      >
        <ToggleGroup
          aria-label="Visning"
          value={view}
          onChange={setView}
          style={{ alignSelf: 'start' }}
        >
          <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
          <ToggleGroup.Item value="tabell">Tabell</ToggleGroup.Item>
        </ToggleGroup>

        {/* Tells screen reader users that the content changed when they
            switch page, since focus stays on the pagination. */}
        <Paragraph aria-live="polite" data-size="sm">
          Viser {(currentPage - 1) * PAGE_SIZE + 1}–
          {(currentPage - 1) * PAGE_SIZE + visible.length} av {schools.length}{' '}
          skoler
        </Paragraph>

        {view === 'liste' ? (
          <DataList {...args}>
            {visible.map((school) => (
              <DataList.Item key={school.id} clickable>
                <SchoolRows school={school} href={`#skole-${school.id}`} />
              </DataList.Item>
            ))}
          </DataList>
        ) : (
          <Table border>
            <caption className="ds-sr-only">Skoler som har rapportert</caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Skolenavn</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>År</Table.HeaderCell>
                <Table.HeaderCell>Kommune</Table.HeaderCell>
                <Table.HeaderCell>Fylke</Table.HeaderCell>
                <Table.HeaderCell>System</Table.HeaderCell>
                <Table.HeaderCell>Org.nummer</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {visible.map((school) => (
                <Table.Row key={school.id}>
                  <Table.Cell>
                    <Link href={`#skole-${school.id}`}>
                      {school.schoolName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag data-color={schoolStatusColor[school.status]}>
                      {school.status}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>{school.year}</Table.Cell>
                  <Table.Cell>{school.municipality}</Table.Cell>
                  <Table.Cell>{school.county}</Table.Cell>
                  <Table.Cell>{school.systemName}</Table.Cell>
                  <Table.Cell>{school.organizationNumber}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}

        <Pagination aria-label="Sidenavigering for skoler">
          <Pagination.List>
            <Pagination.Item>
              <Pagination.Button
                aria-label="Forrige side"
                {...prevButtonProps}
              />
            </Pagination.Item>
            {pages.map(({ page, itemKey, buttonProps }) => (
              <Pagination.Item key={itemKey}>
                {typeof page === 'number' && (
                  <Pagination.Button
                    aria-label={`Side ${page}`}
                    {...buttonProps}
                  >
                    {page}
                  </Pagination.Button>
                )}
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Button aria-label="Neste side" {...nextButtonProps} />
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Switching to table shows the same schools', async () => {
      await userEvent.click(canvas.getByText('Tabell'));
      await expect(canvas.getByRole('table')).toBeInTheDocument();
      await userEvent.click(canvas.getByText('Liste'));
      await expect(
        canvas.getByRole('list', { name: 'Skoler som har rapportert' }),
      ).toBeInTheDocument();
    });

    await step('Changing page is announced', async () => {
      await expect(canvas.getByText('Viser 1–5 av 10 skoler')).toHaveAttribute(
        'aria-live',
        'polite',
      );
      await userEvent.click(canvas.getByRole('button', { name: 'Side 2' }));
      await expect(canvas.getByText('Viser 6–10 av 10 skoler')).toBeVisible();
    });
  },
});
