import { Pagination, usePagination } from '@digdir/designsystemet-react';
import type React from 'react';
import { useMemo, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { useCheckboxGroup } from 'src/utilities/hooks/useCheckboxGroup/useCheckboxGroup';
import { Checkbox } from '../checkbox/Checkbox';
import { Tag } from '../tag/Tag';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import type { TableHeaderCellProps } from '.';
import { Table } from '.';

const meta = preview.meta({
  component: Table,
  tags: ['beta', 'digdir'],
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
    tintedColumnHeader: false,
    tintedRowHeader: false,
    'data-color': 'neutral',
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
                  aria-label={`Velg ${row}`}
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
    tintedColumnHeader: true,
    tintedRowHeader: true,
  },
  render: (args) => (
    <Table {...args} data-color="accent">
      <caption
        style={{
          fontSize: 'var(--ds-font-size-3)',
          captionSide: 'bottom',
          textAlign: 'center',
          fontWeight: 'normal',
          marginTop: 'var(--ds-size-2)',
        }}
      >
        Svarprosent for elevundersøkelsen nasjonalt
      </caption>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.HeaderCell scope="col">2022–23</Table.HeaderCell>
          <Table.HeaderCell scope="col">2023–24</Table.HeaderCell>
          <Table.HeaderCell scope="col">2024–25</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body style={{ textAlign: 'right' }}>
        <Table.Row>
          <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
            8. trinn
          </Table.HeaderCell>
          <Table.Cell>88,5%</Table.Cell>
          <Table.Cell>86,3%</Table.Cell>
          <Table.Cell>85,3%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
            9. trinn
          </Table.HeaderCell>
          <Table.Cell>88,7%</Table.Cell>
          <Table.Cell>86,3%</Table.Cell>
          <Table.Cell>84,9%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
            10. trinn
          </Table.HeaderCell>
          <Table.Cell>89,7%</Table.Cell>
          <Table.Cell>87,3%</Table.Cell>
          <Table.Cell>85,7%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
            Vg1
          </Table.HeaderCell>
          <Table.Cell>84,8%</Table.Cell>
          <Table.Cell>82,8%</Table.Cell>
          <Table.Cell>83,1%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
            Vg2
          </Table.HeaderCell>
          <Table.Cell>82,5%</Table.Cell>
          <Table.Cell>80,0%</Table.Cell>
          <Table.Cell>80,3%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
            Vg3
          </Table.HeaderCell>
          <Table.Cell>79,9%</Table.Cell>
          <Table.Cell>75,7%</Table.Cell>
          <Table.Cell>76,9%</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
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
    tabIndex: 0,
    stickyHeader: true,
    zebra: true,
    tintedColumnHeader: true,
    tintedRowHeader: true,
    'data-color': 'support1',
  },
  render: (args) => {
    return (
      <>
        <Heading style={{ marginBottom: 'var(--ds-size-3)' }}>
          Ansattes utdanning fordelt på eiertype (ordinære), 2021
        </Heading>
        <div
          style={{
            height: '420px',
            width: '580px',
            overflow: 'auto',
            padding: 0,
          }}
        >
          <Table {...args}>
            <caption className="ds-sr-only">
              Ansattes utdanning fordelt på eiertype (ordinære), 2021
            </caption>
            <Table.Head>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.HeaderCell>5 store</Table.HeaderCell>
                <Table.HeaderCell>Andre kjeder</Table.HeaderCell>
                <Table.HeaderCell>Frittstående</Table.HeaderCell>
                <Table.HeaderCell>Kommune</Table.HeaderCell>
                <Table.HeaderCell>Totalt</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body style={{ textAlign: 'right' }}>
              <Table.Row>
                <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
                  Barnehagelærer
                </Table.HeaderCell>
                <Table.Cell>42,9%</Table.Cell>
                <Table.Cell>42,9%</Table.Cell>
                <Table.Cell>43,8%</Table.Cell>
                <Table.Cell>43,9%</Table.Cell>
                <Table.Cell>43,6%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
                  Annen pedagogisk utdanning
                </Table.HeaderCell>
                <Table.Cell>1,9%</Table.Cell>
                <Table.Cell>2,8%</Table.Cell>
                <Table.Cell>2,0%</Table.Cell>
                <Table.Cell>1,3%</Table.Cell>
                <Table.Cell>1,7%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
                  Annen høyere utdanning
                </Table.HeaderCell>
                <Table.Cell>2,2%</Table.Cell>
                <Table.Cell>2,7%</Table.Cell>
                <Table.Cell>2,2%</Table.Cell>
                <Table.Cell>1,2%</Table.Cell>
                <Table.Cell>1,8%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
                  Barne- og ungdomsarbeider
                </Table.HeaderCell>
                <Table.Cell>15,0%</Table.Cell>
                <Table.Cell>16,4%</Table.Cell>
                <Table.Cell>18,4%</Table.Cell>
                <Table.Cell>27,7%</Table.Cell>
                <Table.Cell>22,3%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
                  Annet fagarbeider
                </Table.HeaderCell>
                <Table.Cell>5,2%</Table.Cell>
                <Table.Cell>4,6%</Table.Cell>
                <Table.Cell>5,3%</Table.Cell>
                <Table.Cell>5,3%</Table.Cell>
                <Table.Cell>5,2%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
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
        <Table.Body
          style={{
            alignContent: 'start',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
            <Table.Cell style={{ minWidth: 200 }}>
              <Textfield
                data-size="sm"
                value="Trives du på skolen?"
                aria-label={`Textfield 1-1`}
              />
            </Table.Cell>
            <Table.Cell style={{ minWidth: 200 }}>
              <Textfield
                data-size="sm"
                value="Trives ikke noe særlig"
                aria-label={`Textfield 1-2`}
              />
            </Table.Cell>
            <Table.Cell style={{ minWidth: 200 }}>
              <Textfield
                value="Trives godt"
                data-size="sm"
                aria-label={`Textfield 1-3`}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Checkbox
                aria-label={`Check 1`}
                {...getCheckboxProps({
                  id: `${ctx.id}-select1`,
                  value: '2',
                })}
              />
            </Table.Cell>
            <Table.Cell>2.</Table.Cell>
            <Table.Cell>
              <Textfield
                data-size="sm"
                value="Har du opplevd mobbing?"
                aria-label={`Textfield 1-1`}
                style={{ width: 250 }}
              />
            </Table.Cell>
            <Table.Cell>
              <Textfield
                data-size="sm"
                value="Sjelden"
                aria-label={`Textfield 1-2`}
              />
            </Table.Cell>
            <Table.Cell>
              <Textfield
                cols={3}
                value="Ofte"
                data-size="sm"
                aria-label={`Textfield 1-3`}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
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
      <div>
        <Table
          {...args}
          id="myTable"
          style={{
            tableLayout: 'fixed',
            marginBottom: '12px',
          }}
        >
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
                <Table.Cell
                  style={{
                    fontFeatureSettings: "'tnum' 1",
                  }}
                >
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
      </div>
    );
  },
});

export const MultipleHeaderRows = meta.story({
  args: {
    zebra: true,
    tintedColumnHeader: true,
    tintedRowHeader: true,
    'data-color': 'support1',
  },
  render: (args) => {
    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.Cell />
            <Table.HeaderCell colSpan={5} style={{ textAlign: 'center' }}>
              Trives du på skolen?
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell />
            <Table.HeaderCell>Trives ikke i det hele tatt</Table.HeaderCell>
            <Table.HeaderCell>Trives ikke noe særlig</Table.HeaderCell>
            <Table.HeaderCell>Trives litt</Table.HeaderCell>
            <Table.HeaderCell>Trives godt</Table.HeaderCell>
            <Table.HeaderCell>Trives svært godt</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body style={{ textAlign: 'right' }}>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
              Idrettsfag
            </Table.HeaderCell>
            <Table.Cell>0,5%</Table.Cell>
            <Table.Cell>1,0%</Table.Cell>
            <Table.Cell>5,7%</Table.Cell>
            <Table.Cell>46,0%</Table.Cell>
            <Table.Cell>46,9%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
              Medier og kommunikasjon
            </Table.HeaderCell>
            <Table.Cell>1,2%</Table.Cell>
            <Table.Cell>1,9%</Table.Cell>
            <Table.Cell>11,3%</Table.Cell>
            <Table.Cell>49,4%</Table.Cell>
            <Table.Cell>36,1%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
              Musikk, dans og drama
            </Table.HeaderCell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>7,0%</Table.Cell>
            <Table.Cell>41,9%</Table.Cell>
            <Table.Cell>49,8%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
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
    );
  },
});

export const WithBorder = meta.story({
  args: {
    border: true,
    tintedColumnHeader: true,
    tintedRowHeader: true,
    'data-color': 'support2',
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

type TreeNode = {
  id: string;
  label: string;
  values: React.ReactNode[];
  children?: TreeNode[];
};

/* ─── Nasjonale prøver – tree table ─── */

type NpNode = [label: string, values: string[], children?: NpNode[]];

const toTree = (nodes: NpNode[], prefix = 'np'): TreeNode[] =>
  nodes.map(([label, values, children]) => {
    const id = `${prefix}-${label.toLowerCase().replace(/[^a-zæøå0-9]/g, '')}`;
    return {
      id,
      label,
      values,
      ...(children && { children: toTree(children, id) }),
    };
  });

const nasjonalePrøverData = toTree([
  [
    'Nasjonalt',
    ['50', '50', '50'],
    [
      ['Akershus', ['52', '52', '53'], [['…', ['…', '…', '…']]]],
      [
        'Oslo',
        ['53', '52', '54'],
        [
          ['Frogner', ['55', '53', '56'], [['…', ['…', '…', '…']]]],
          [
            'Gamle Oslo',
            ['52', '50', '52'],
            [
              ['Gamlebyen skole', ['51', '49', '51']],
              ['Kampen skole', ['54', '52', '55']],
              ['Tøyen skole', ['53', '51', '53']],
              ['Vahl skole', ['52', '50', '52']],
            ],
          ],
          ['Grünerløkka', ['54', '52', '55'], [['…', ['…', '…', '…']]]],
          ['Nordre Aker', ['53', '52', '54'], [['…', ['…', '…', '…']]]],
          ['St. Hanshaugen', ['54', '53', '55'], [['…', ['…', '…', '…']]]],
          ['Søndre Nordstrand', ['50', '48', '50'], [['…', ['…', '…', '…']]]],
        ],
      ],
      ['Rogaland', ['50', '51', '51'], [['…', ['…', '…', '…']]]],
      ['Trøndelag', ['50', '51', '50'], [['…', ['…', '…', '…']]]],
      ['Vestland', ['51', '51', '50'], [['…', ['…', '…', '…']]]],
      ['…', ['…', '…', '…']],
    ],
  ],
]);

export const TreeStructuredTable = meta.story({
  args: {
    zebra: true,
    tintedColumnHeader: true,
    tintedRowHeader: true,
    'data-color': 'support1',
  },
  render: (args) => {
    const [open, setOpen] = useState<Set<string>>(
      new Set([
        'np-nasjonalt',
        'np-nasjonalt-oslo',
        'np-nasjonalt-oslo-gamleoslo',
      ]),
    );

    const toggle = (id: string) => {
      setOpen((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };

    const rows = useMemo(() => {
      const renderRows = (node: TreeNode, depth = 0): React.ReactNode[] => {
        const isOpen = open.has(node.id);
        const children = node.children ?? [];
        const hasChildren = children.length > 0;

        const currentRow = (
          <Table.Row
            key={node.id}
            data-testid={`row-${node.id}`}
            aria-level={depth + 1}
          >
            <Table.HeaderCell scope="row">
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggle(node.id)}
                  aria-expanded={isOpen}
                  data-testid={`toggle-${node.id}`}
                >
                  {node.label}
                </button>
              ) : (
                node.label
              )}
            </Table.HeaderCell>

            {node.values.map((value, index) => (
              <Table.Cell
                key={`${node.id}-c${index}`}
                style={{ textAlign: 'right' }}
              >
                {value}
              </Table.Cell>
            ))}
          </Table.Row>
        );

        if (!hasChildren || !isOpen) {
          return [currentRow];
        }

        return [
          currentRow,
          ...children.flatMap((child) => renderRows(child, depth + 1)),
        ];
      };

      return nasjonalePrøverData.flatMap((node) => renderRows(node));
    }, [open]);

    return (
      <Table
        {...args}
        style={{
          tableLayout: 'fixed',
          width: '550px',
        }}
      >
        <caption
          style={{
            fontSize: 'var(--ds-font-size-3)',
            captionSide: 'bottom',
            textAlign: 'center',
            fontWeight: 'normal',
            marginTop: 'var(--ds-size-2)',
          }}
        >
          Nasjonale prøver 5. trinn – skoleåret 2024–25, snitt skalapoeng
        </caption>

        <Table.Head>
          <Table.Row>
            <Table.HeaderCell scope="col">Område</Table.HeaderCell>
            <Table.HeaderCell scope="col" style={{ width: '4rem' }}>
              Lesing
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" style={{ width: '4rem' }}>
              Regning
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" style={{ width: '4rem' }}>
              Engelsk
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  },
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);

    await step('Nasjonalt, Oslo and Gamle Oslo are expanded by default', () => {
      expect(canvas.getByTestId('toggle-np-nasjonalt')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(canvas.getByTestId('toggle-np-nasjonalt-oslo')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(
        canvas.getByTestId('toggle-np-nasjonalt-oslo-gamleoslo'),
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        canvas.getByTestId('row-np-nasjonalt-oslo-gamleoslo-tøyenskole'),
      ).toBeInTheDocument();
      expect(
        canvas.getByTestId('row-np-nasjonalt-oslo-gamleoslo-kampenskole'),
      ).toBeInTheDocument();
    });

    await step('Collapsing Gamle Oslo hides schools', async () => {
      await userEvent.click(
        canvas.getByTestId('toggle-np-nasjonalt-oslo-gamleoslo'),
      );

      expect(
        canvas.getByTestId('toggle-np-nasjonalt-oslo-gamleoslo'),
      ).toHaveAttribute('aria-expanded', 'false');
      expect(
        canvas.queryByTestId('row-np-nasjonalt-oslo-gamleoslo-tøyenskole'),
      ).not.toBeInTheDocument();
    });
  },
});
