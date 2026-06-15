import { Pagination, usePagination } from '@digdir/designsystemet-react';
import type React from 'react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Checkbox } from 'src/components/checkbox';
import { Tag } from 'src/components/tag';
import { Textfield } from 'src/components/textfield';
import { Heading } from 'src/components/typography/heading';
import { useCheckboxGroup } from 'src/hooks/useCheckboxGroup';
import { Table as FakeTable } from './docs/FakeTable';
import { TableBody } from './docs/FakeTableBody';
import { TableCell } from './docs/FakeTableCell';
import { TableFoot } from './docs/FakeTableFoot';
import { TableHead } from './docs/FakeTableHead';
import { TableHeaderCell } from './docs/FakeTableHeaderCell';
import { TableRow } from './docs/FakeTableRow';
import { Table } from '.';
import type { TableHeaderCellProps } from '.';

const meta = preview.meta({
  component: FakeTable,
  subcomponents: {
    'Table.Head': TableHead,
    'Table.Body': TableBody,
    'Table.Row': TableRow,
    'Table.Cell': TableCell,
    'Table.HeaderCell': TableHeaderCell,
    'Table.Foot': TableFoot,
  },
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details:
        'Vi har lagt til mulighet for bakgrunnsfarge på overskriftsrader og kolonner, samt andre mindre designjusteringer.',
    },
    customStyles: {
      width: 'fit-content',
      margin: '0 auto',
    },
  },
});

export const Preview = meta.story({
  args: {
    zebra: false,
    stickyHeader: false,
    border: false,
    hover: false,
    children: undefined,
    'data-size': undefined,
    'data-color': 'neutral',
    tintedColumnHeader: false,
    tintedRowHeader: false,
  },
  render: (args) => {
    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps['sort']>(undefined);
    const handleSort = (field: keyof (typeof dummyData)[0]) => {
      if (sortField === field && sortDirection === 'descending') {
        setSortField(null);
        setSortDirection(undefined);
      } else {
        setSortField(field);
        setSortDirection(
          sortField === field && sortDirection === 'ascending'
            ? 'descending'
            : 'ascending',
        );
      }
    };
    const sortedData = [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField])
        return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    });
    const { getCheckboxProps } = useCheckboxGroup({
      name: 'my-checkbox',
    });
    return (
      <Table {...args}>
        <caption>Sensur FSP6236 Tegnspråk III</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                aria-label="Velg alle ansatte"
                id="checkbox-select-all"
                {...getCheckboxProps({
                  allowIndeterminate: true,
                })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'navn' ? sortDirection : 'none'}
              onClick={() => handleSort('navn')}
            >
              Navn
            </Table.HeaderCell>
            <Table.HeaderCell>E-post</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Besvarelser</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Checkbox
                  id={'checkbox-' + row.id}
                  aria-label={`Velg checkbox ${row.id}`}
                  {...getCheckboxProps(String(row.id))}
                />
              </Table.Cell>
              <Table.Cell>{row.navn}</Table.Cell>
              <Table.Cell>{row.epost}</Table.Cell>
              <Table.Cell>
                <Tag data-color={tagColor(row.status)}>{row.status}</Tag>
              </Table.Cell>
              <Table.Cell style={{ textAlign: 'right' }}>
                {row.prover}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={4}>Totalt gjenstår</Table.Cell>
            <Table.Cell style={{ textAlign: 'right' }}>68</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    );
  },
});

export const ColumnAndRowHeaders = meta.story({
  args: {
    zebra: false,
    stickyHeader: false,
    border: false,
    hover: true,
    children: undefined,
    'data-size': undefined,
    'data-color': undefined,
    tintedColumnHeader: true,
    tintedRowHeader: true,
  },
  render: (args) => (
    <>
      <style>
        {`
.example-caption {
  font-size: var(--ds-font-size-3);
  caption-side: bottom;
  text-align: center;
  font-weight: normal;
  margin-top: var(--ds-size-2);
}
.example-table-body {
  text-align: right;
}
.example-table-body-headercell {
  text-align: left;
}
`}
      </style>
      <Table {...args} data-color="accent">
        <caption className="example-caption">
          Svarprosent for elevundersøkelsen nasjonalt
        </caption>
        <Table.Head>
          <Table.Row>
            <Table.Cell />
            <Table.HeaderCell scope="col">2022-23</Table.HeaderCell>
            <Table.HeaderCell scope="col">2023-24</Table.HeaderCell>
            <Table.HeaderCell scope="col">2024-25</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body className="example-table-body">
          <Table.Row>
            <Table.HeaderCell
              scope="row"
              className="example-table-body-headercell"
            >
              8. trinn
            </Table.HeaderCell>
            <Table.Cell>88,5%</Table.Cell>
            <Table.Cell>86,3%</Table.Cell>
            <Table.Cell>85,3%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              scope="row"
              className="example-table-body-headercell"
            >
              9. trinn
            </Table.HeaderCell>
            <Table.Cell>88,7%</Table.Cell>
            <Table.Cell>86,3%</Table.Cell>
            <Table.Cell>84,9%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              scope="row"
              className="example-table-body-headercell"
            >
              10. trinn
            </Table.HeaderCell>
            <Table.Cell>89,7%</Table.Cell>
            <Table.Cell>87,3%</Table.Cell>
            <Table.Cell>85,7%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              scope="row"
              className="example-table-body-headercell"
            >
              Vg1
            </Table.HeaderCell>
            <Table.Cell>84,8%</Table.Cell>
            <Table.Cell>82,8%</Table.Cell>
            <Table.Cell>83,1%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              scope="row"
              className="example-table-body-headercell"
            >
              Vg2
            </Table.HeaderCell>
            <Table.Cell>82,5%</Table.Cell>
            <Table.Cell>80,0%</Table.Cell>
            <Table.Cell>80,3%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              scope="row"
              className="example-table-body-headercell"
            >
              Vg3
            </Table.HeaderCell>
            <Table.Cell>79,9%</Table.Cell>
            <Table.Cell>75,7%</Table.Cell>
            <Table.Cell>76,9%</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  ),
});

const dummyData = [
  {
    id: 1,
    navn: 'Rita Nordmann',
    epost: 'rita@nordmann.no',
    telefon: '22345678',
    rolle: 'Rektor',
    prover: 19,
    status: 'I arbeid',
  },
  {
    id: 2,
    navn: 'Kari Nordmann',
    epost: 'kari@nordmann.no',
    telefon: '87654321',
    rolle: 'Lektor',
    prover: 0,
    status: 'Ferdig',
  },
  {
    id: 3,
    navn: 'Ola Nordmann',
    epost: 'ola@nordmann.no',
    telefon: '32345678',
    rolle: 'Lektor',
    prover: 14,
    status: 'I arbeid',
  },
  {
    id: 4,
    navn: 'Kai Nordmann',
    epost: 'kai@nordmann.no',
    telefon: '62353278',
    rolle: 'Lektor',
    prover: 35,
    status: 'Ikke begynt',
  },
  {
    id: 5,
    navn: 'Mateo Nordmann',
    epost: 'mateo@nordmann.no',
    telefon: '12345678',
    rolle: 'Ass. rektor',
    prover: 0,
    status: 'Ferdig',
  },
];

const tagColor = (status: string) => {
  switch (status) {
    case 'Ikke begynt':
      return 'warning';
    case 'I arbeid':
      return 'info';
    case 'Ferdig':
      return 'success';
    default:
      return 'info';
  }
};

export const Sortable = meta.story({
  parameters: { docs: advancedCodeDocs },
  render(args) {
    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps['sort']>(undefined);

    const handleSort = (field: keyof (typeof dummyData)[0]) => {
      if (sortField === field && sortDirection === 'descending') {
        setSortField(null);
        setSortDirection(undefined);
      } else {
        setSortField(field);
        setSortDirection(
          sortField === field && sortDirection === 'ascending'
            ? 'descending'
            : 'ascending',
        );
      }
    };

    const sortedData = [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField])
        return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    });

    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              data-testid="sortable-th-navn"
              sort={sortField === 'navn' ? sortDirection : 'none'}
              onClick={() => handleSort('navn')}
            >
              Navn
            </Table.HeaderCell>
            <Table.HeaderCell>Epost</Table.HeaderCell>
            <Table.HeaderCell
              data-testid="sortable-th-telefon"
              sort={sortField === 'telefon' ? sortDirection : 'none'}
              onClick={() => handleSort('telefon')}
            >
              Telefon
            </Table.HeaderCell>
            <Table.HeaderCell
              data-testid="sortable-th-rolle"
              sort={sortField === 'rolle' ? sortDirection : 'none'}
              onClick={() => handleSort('rolle')}
            >
              Rolle
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.navn}</Table.Cell>
              <Table.Cell>{row.epost}</Table.Cell>
              <Table.Cell>{row.telefon}</Table.Cell>
              <Table.Cell>{row.rolle}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);
    await step('Sortable headings should have aria-sort and a button', () => {
      const ths = canvas.getAllByTestId(/^sortable-th/);
      ths.forEach((th) => {
        expect(th).toHaveAttribute('aria-sort');
        const sortButton = within(th).getByRole('button');
        expect(sortButton).toBeVisible();
      });
    });
  },
});

export const StickyHeader = meta.story({
  args: {
    zebra: true,
    stickyHeader: true,
    border: false,
    hover: false,
    children: undefined,
    'data-size': undefined,
    'data-color': 'support1',
    tintedColumnHeader: true,
    tintedRowHeader: true,
  },
  render: (args) => {
    return (
      <>
        <style>
          {`
.example-heading {
  margin-bottom: var(--ds-size-3);
}
.example-main {
  height: 420px;
  width: 580px;
  overflow: auto;
  padding: 0;
}
.example-table-body {
  text-align: right;
}
.example-table-body-headercell {
  text-align: left;
}
`}
        </style>
        <Heading className="example-heading">
          Ansattes utdanning fordelt på eiertype (ordinære), 2021
        </Heading>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- scrollable region needs tabIndex for keyboard access */}
        <div role="region" tabIndex={0} className="example-main">
          <Table {...args}>
            <caption className="ds-sr-only">
              Ansattes utdanning fordelt på eiertype (ordinære), 2021
            </caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell scope="col">
                  <span className="ds-sr-only">Radkategori</span>
                </Table.HeaderCell>
                <Table.HeaderCell>5 store</Table.HeaderCell>
                <Table.HeaderCell>Andre kjeder</Table.HeaderCell>
                <Table.HeaderCell>Frittstående</Table.HeaderCell>
                <Table.HeaderCell>Kommune</Table.HeaderCell>
                <Table.HeaderCell>Totalt</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body className="example-table-body">
              <Table.Row>
                <Table.HeaderCell
                  scope="row"
                  className="example-table-body-headercell"
                >
                  Barnehagelærer
                </Table.HeaderCell>
                <Table.Cell>42,9%</Table.Cell>
                <Table.Cell>42,9%</Table.Cell>
                <Table.Cell>43,8%</Table.Cell>
                <Table.Cell>43,9%</Table.Cell>
                <Table.Cell>43,6%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell
                  scope="row"
                  className="example-table-body-headercell"
                >
                  Annen pedagogisk utdanning
                </Table.HeaderCell>
                <Table.Cell>1,9%</Table.Cell>
                <Table.Cell>2,8%</Table.Cell>
                <Table.Cell>2,0%</Table.Cell>
                <Table.Cell>1,3%</Table.Cell>
                <Table.Cell>1,7%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell
                  scope="row"
                  className="example-table-body-headercell"
                >
                  Annen høyere utdanning
                </Table.HeaderCell>
                <Table.Cell>2,2%</Table.Cell>
                <Table.Cell>2,7%</Table.Cell>
                <Table.Cell>2,2%</Table.Cell>
                <Table.Cell>1,2%</Table.Cell>
                <Table.Cell>1,8%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell
                  scope="row"
                  className="example-table-body-headercell"
                >
                  Barne- og ungdomsarbeider
                </Table.HeaderCell>
                <Table.Cell>15,0%</Table.Cell>
                <Table.Cell>16,4%</Table.Cell>
                <Table.Cell>18,4%</Table.Cell>
                <Table.Cell>27,7%</Table.Cell>
                <Table.Cell>22,3%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell
                  scope="row"
                  className="example-table-body-headercell"
                >
                  Annet fagarbeider
                </Table.HeaderCell>
                <Table.Cell>5,2%</Table.Cell>
                <Table.Cell>4,6%</Table.Cell>
                <Table.Cell>5,3%</Table.Cell>
                <Table.Cell>5,3%</Table.Cell>
                <Table.Cell>5,2%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell
                  scope="row"
                  className="example-table-body-headercell"
                >
                  Annen bakgrunn
                </Table.HeaderCell>
                <Table.Cell>32,8%</Table.Cell>
                <Table.Cell>30,5%</Table.Cell>
                <Table.Cell>28,3%</Table.Cell>
                <Table.Cell>20,6%</Table.Cell>
                <Table.Cell>25,5%</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </>
    );
  },
});

export const WithFormElements = meta.story({
  render(args, ctx) {
    const { getCheckboxProps } = useCheckboxGroup({
      name: `${ctx.id}-checkboxGroup`,
      value: ['2'],
    });

    return (
      <>
        <style>
          {`
.example-main {
  height: 420px;
  width: 580px;
  overflow: auto;
  padding: 0;
}
.example-table-body {
  alignContent: 'start',
  justifyContent: 'center',
  alignItems: 'center',
}
.example-table-body-cell {
  minWidth: 200px;
}
.example-textfield {
  minWidth: 250px;
}
`}
        </style>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox
                  aria-label="Select all"
                  {...getCheckboxProps({
                    allowIndeterminate: true,
                    id: `${ctx.id}-selectAll`,
                  })}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>nr.</Table.HeaderCell>
              <Table.HeaderCell>Spørsmål</Table.HeaderCell>
              <Table.HeaderCell>Alternativ 1</Table.HeaderCell>
              <Table.HeaderCell>Alternativ 2</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body className="example-table-body">
            <Table.Row>
              <Table.Cell>
                <Checkbox
                  aria-label={`Check 1`}
                  {...getCheckboxProps({
                    id: `${ctx.id}-select1`,
                    value: '1',
                  })}
                />
              </Table.Cell>
              <Table.Cell>1.</Table.Cell>
              <Table.Cell className="example-table-body-cell">
                <Textfield
                  data-size="sm"
                  value="Trives du på skolen?"
                  aria-label={`Textfield 1-1`}
                  autoComplete="off"
                />
              </Table.Cell>
              <Table.Cell className="example-table-body-cell">
                <Textfield
                  data-size="sm"
                  value="Trives ikke noe særlig"
                  aria-label={`Textfield 1-2`}
                  autoComplete="off"
                />
              </Table.Cell>
              <Table.Cell className="example-table-body-cell">
                <Textfield
                  value="Trives godt"
                  data-size="sm"
                  aria-label={`Textfield 1-3`}
                  autoComplete="off"
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Checkbox
                  aria-label={`Check 2`}
                  {...getCheckboxProps({
                    id: `${ctx.id}-select2`,
                    value: '2',
                  })}
                />
              </Table.Cell>
              <Table.Cell>2.</Table.Cell>
              <Table.Cell>
                <Textfield
                  data-size="sm"
                  value="Har du opplevd mobbing?"
                  aria-label={`Textfield 2-1`}
                  autoComplete="off"
                  className="example-textfield"
                />
              </Table.Cell>
              <Table.Cell>
                <Textfield
                  data-size="sm"
                  value="Sjelden"
                  aria-label={`Textfield 2-2`}
                  autoComplete="off"
                />
              </Table.Cell>
              <Table.Cell>
                <Textfield
                  cols={3}
                  value="Ofte"
                  data-size="sm"
                  aria-label={`Textfield 2-3`}
                  autoComplete="off"
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    );
  },
});

const dummyDataKommune = [
  {
    id: 1,
    kommune: 'Bjerkreim kommune',
    tildeling: '330 000',
  },
  {
    id: 2,
    kommune: 'Færder kommune',
    tildeling: '750 000',
  },
  {
    id: 3,
    kommune: 'Gjøvik kommune',
    tildeling: '150 000',
  },
  {
    id: 4,
    kommune: 'Hurdal kommune',
    tildeling: '550 000',
  },
  {
    id: 5,
    kommune: 'Marker kommune',
    tildeling: '900 000',
  },
  {
    id: 6,
    kommune: 'Nordreisa kommune',
    tildeling: '304 000',
  },
  {
    id: 7,
    kommune: 'Osen kommune',
    tildeling: '251 722',
  },
  {
    id: 8,
    kommune: 'Rana kommune',
    tildeling: '700 000',
  },
  {
    id: 9,
    kommune: 'Randaberg kommune',
    tildeling: '800 000',
  },
  {
    id: 10,
    kommune: 'Risør kommune',
    tildeling: '450 000',
  },
  {
    id: 11,
    kommune: 'Tinn kommune',
    tildeling: '179 200',
  },
  {
    id: 12,
    kommune: 'Bømlo kommune',
    tildeling: '391 500',
  },
  {
    id: 13,
    kommune: 'Gjesdal kommune',
    tildeling: '380 000',
  },
  {
    id: 14,
    kommune: 'Haugesund kommune',
    tildeling: '3 000 000',
  },
  {
    id: 15,
    kommune: 'Karmøy kommune',
    tildeling: '525 000',
  },
];

export const FixedTable = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: (args) => {
    const [page, setCurrentPage] = useState(1);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages: 3,
      showPages: 3,
      setCurrentPage: (page) => {
        setCurrentPage(page);
      },
    });
    const itemsPerPage = 5;

    // Calculate the start and end index for slicing the data
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dummyDataKommune.slice(
      indexOfFirstItem,
      indexOfLastItem,
    );

    return (
      <>
        <style>
          {`
.example-main {
  height: 420px;
  width: 580px;
  overflow: auto;
  padding: 0;
}
.example-table {
  table-layout: fixed;
  margin-bottom: 12px;
}
.example-table-body-cell {
  font-feature-settings: "'tnum' 1",
}
.example-textfield {
  min-width: 250px;
}
`}
        </style>
        <Table {...args} id="myTable" className="example-table">
          <caption>Tildeling skolebibliotek 2024</caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Kommune</Table.HeaderCell>
              <Table.HeaderCell>Tildeling (kr)</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {currentItems.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.kommune}</Table.Cell>
                <Table.Cell className="example-table-body-cell">
                  {item.tildeling}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination>
          <Pagination.List>
            <Pagination.Item>
              <Pagination.Button aria-label="Forrige side" {...prevButtonProps}>
                Forrige
              </Pagination.Button>
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
              <Pagination.Button aria-label="Neste side" {...nextButtonProps}>
                Neste
              </Pagination.Button>
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
      </>
    );
  },
});

export const MultipleHeaderRows = meta.story({
  args: {
    zebra: true,
    stickyHeader: false,
    border: false,
    hover: false,
    children: undefined,
    'data-size': undefined,
    'data-color': 'support1',
    tintedColumnHeader: true,
    tintedRowHeader: true,
  },
  render: (args) => {
    return (
      <>
        <style>
          {`
.example-table-head-headercell {
  text-align: center;
}
.example-table-body {
  align-items: center;
}
.example-table-body-headercell {
  text-align: left;
}
.example-table-body-cell {
  minWidth: 200px;
}
.example-table-body-textfield {
  minWidth: 250px;
}
`}
        </style>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell scope="col">
                <span className="ds-sr-only">Radkategori</span>
              </Table.HeaderCell>
              <Table.HeaderCell
                colSpan={5}
                className="example-table-head-headercell"
              >
                Trives du på skolen?
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell scope="col">
                <span className="ds-sr-only">Radkategori</span>
              </Table.HeaderCell>
              <Table.HeaderCell>Trives ikke i det hele tatt</Table.HeaderCell>
              <Table.HeaderCell>Trives ikke noe særlig</Table.HeaderCell>
              <Table.HeaderCell>Trives litt</Table.HeaderCell>
              <Table.HeaderCell>Trives godt</Table.HeaderCell>
              <Table.HeaderCell>Trives svært godt</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body className="example-table-body">
            <Table.Row>
              <Table.HeaderCell
                scope={'row'}
                className="example-table-body-headercell"
              >
                Idrettsfag
              </Table.HeaderCell>
              <Table.Cell>0,5%</Table.Cell>
              <Table.Cell>1,0%</Table.Cell>
              <Table.Cell>5,7%</Table.Cell>
              <Table.Cell>46,0%</Table.Cell>
              <Table.Cell>46,9%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                scope={'row'}
                className="example-table-body-headercell"
              >
                Medier og kommunikasjon
              </Table.HeaderCell>
              <Table.Cell>1,2%</Table.Cell>
              <Table.Cell>1,9%</Table.Cell>
              <Table.Cell>11,3%</Table.Cell>
              <Table.Cell>49,4%</Table.Cell>
              <Table.Cell>36,1%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                scope={'row'}
                className="example-table-body-headercell"
              >
                Musikk, dans og drama
              </Table.HeaderCell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>7,0%</Table.Cell>
              <Table.Cell>41,9%</Table.Cell>
              <Table.Cell>49,8%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                scope={'row'}
                className="example-table-body-headercell"
              >
                Studiespesialisering
              </Table.HeaderCell>
              <Table.Cell>1,2%</Table.Cell>
              <Table.Cell>1,8%</Table.Cell>
              <Table.Cell>8,9%</Table.Cell>
              <Table.Cell>49,8%</Table.Cell>
              <Table.Cell>38,3%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    );
  },
});

export const WithBorder = meta.story({
  args: {
    zebra: false,
    stickyHeader: false,
    border: true,
    hover: false,
    children: undefined,
    'data-size': undefined,
    'data-color': 'support2',
    tintedColumnHeader: true,
    tintedRowHeader: true,
  },
  render: (args) => {
    return (
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Rolle</Table.HeaderCell>
              <Table.HeaderCell>Epost</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {dummyData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.navn}</Table.Cell>
                <Table.Cell>{row.rolle}</Table.Cell>
                <Table.Cell>{row.epost}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
});

const expandableData = [
  {
    id: 1,
    navn: 'Rita Nordmann',
    rolle: 'Rektor',
    epost: 'rita@nordmann.no',
    detaljer:
      'Rita har vært rektor i 12 år og har ansvar for 45 ansatte. Hun leder skolens pedagogiske utviklingsarbeid.',
  },
  {
    id: 2,
    navn: 'Kari Nordmann',
    rolle: 'Lektor',
    epost: 'kari@nordmann.no',
    detaljer:
      'Kari underviser i norsk og samfunnsfag for 8.–10. trinn. Hun er også kontaktlærer for 9A.',
  },
  {
    id: 3,
    navn: 'Ola Nordmann',
    rolle: 'Lektor',
    epost: 'ola@nordmann.no',
    detaljer:
      'Ola underviser i matematikk og naturfag. Han er ansvarlig for skolens realfagssatsing.',
  },
];

export const ExpandableRows = meta.story({
  render: (args) => (
    <Table {...args} style={{ tableLayout: 'fixed', width: '600px' }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Navn</Table.HeaderCell>
          <Table.HeaderCell>Rolle</Table.HeaderCell>
          <Table.HeaderCell>Epost</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {expandableData.map((row) => (
          <ExpandableTableRow key={row.id} row={row} />
        ))}
      </Table.Body>
    </Table>
  ),
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);

    await step('Detail row is hidden when collapsed', () => {
      const button = canvas.getAllByRole('button')[0];
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Detail row is shown when expanded', async () => {
      const button = canvas.getAllByRole('button')[0];
      await userEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  },
});

function ExpandableTableRow({ row }: { row: (typeof expandableData)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Table.Row>
        <Table.Cell>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {row.navn}
          </button>
        </Table.Cell>
        <Table.Cell>{row.rolle}</Table.Cell>
        <Table.Cell>{row.epost}</Table.Cell>
      </Table.Row>
      <Table.Row hidden={!expanded}>
        <Table.Cell colSpan={3}>{row.detaljer}</Table.Cell>
      </Table.Row>
    </>
  );
}
