import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Tag, Textfield } from '@udir-design/react/alpha';
import { List, Table, TableHeaderCellProps } from '@udir-design/react/beta';
import { useState } from 'react';
import { useCheckboxGroup } from '@udir-design/react/alpha';
import { expect, within } from 'storybook/test';
import { Pagination, usePagination } from '@digdir/designsystemet-react';

const meta: Meta<typeof Table> = {
  component: Table,
  tags: ['beta'],
  parameters: {
    customStyles: {
      width: 'fit-content',
      margin: '0 auto',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Preview: Story = {
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
};

export const ColumnAndRowHeaders: Story = {
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
      <Table.Head style={{ textAlign: 'right' }}>
        <Table.Row>
          <Table.Cell />
          <Table.HeaderCell scope="col">2022–23</Table.HeaderCell>
          <Table.HeaderCell scope="col">2023–24</Table.HeaderCell>
          <Table.HeaderCell scope="col">2024–25</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body
        style={{ textAlign: 'right', fontFeatureSettings: "'tnum' 1" }}
      >
        <Table.Row>
          <Table.HeaderCell scope="row">8. årstrinn</Table.HeaderCell>
          <Table.Cell>88,5%</Table.Cell>
          <Table.Cell>86,3%</Table.Cell>
          <Table.Cell>85,3%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">9. årstrinn</Table.HeaderCell>
          <Table.Cell>88,7%</Table.Cell>
          <Table.Cell>86,3%</Table.Cell>
          <Table.Cell>84,9%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">10. årstrinn</Table.HeaderCell>
          <Table.Cell>89,7%</Table.Cell>
          <Table.Cell>87,3%</Table.Cell>
          <Table.Cell>85,7%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">Videregående trinn 1</Table.HeaderCell>
          <Table.Cell>84,8%</Table.Cell>
          <Table.Cell>82,8%</Table.Cell>
          <Table.Cell>83,1%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">Videregående trinn 2</Table.HeaderCell>
          <Table.Cell>82,5%</Table.Cell>
          <Table.Cell>80,0%</Table.Cell>
          <Table.Cell>80,3%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell scope="row">Videregående trinn 3</Table.HeaderCell>
          <Table.Cell>79,9%</Table.Cell>
          <Table.Cell>75,7%</Table.Cell>
          <Table.Cell>76,9%</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

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

export const Sortable: Story = {
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
  async play({ canvasElement, args, step }) {
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
};

export const StickyHeader: Story = {
  args: {
    tabIndex: 0,
    stickyHeader: true,
    zebra: true,
    tintedColumnHeader: true,
    tintedRowHeader: true,
    'data-color': 'support1',
  },
  parameters: {
    customStyles: {
      height: '280px',
      width: '500px',
      overflow: 'auto',
      padding: 0,
    },
  },
  render: (args) => {
    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Fylke</Table.HeaderCell>
            <Table.HeaderCell>Oppholdsareal per barn</Table.HeaderCell>
            <Table.HeaderCell>Åpningstid per dag</Table.HeaderCell>
            <Table.HeaderCell>Kostpenger</Table.HeaderCell>
            <Table.HeaderCell>Foreldrebetaling under makspris</Table.HeaderCell>
            <Table.HeaderCell>Hatt tilsyn</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body style={{ textAlign: 'right' }}>
          <Table.Row>
            <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
              Agder
            </Table.HeaderCell>
            <Table.Cell>5.9</Table.Cell>
            <Table.Cell>9.4</Table.Cell>
            <Table.Cell>400.6</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>66</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
              Akershus
            </Table.HeaderCell>
            <Table.Cell>5.5</Table.Cell>
            <Table.Cell>9.7</Table.Cell>
            <Table.Cell>419.3</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>87</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
              Buskerud
            </Table.HeaderCell>
            <Table.Cell>5.7</Table.Cell>
            <Table.Cell>9.8</Table.Cell>
            <Table.Cell>377.1</Table.Cell>
            <Table.Cell>9</Table.Cell>
            <Table.Cell>18</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
              Finnmark
            </Table.HeaderCell>
            <Table.Cell>7.7</Table.Cell>
            <Table.Cell>9.1</Table.Cell>
            <Table.Cell>357.4</Table.Cell>
            <Table.Cell>44</Table.Cell>
            <Table.Cell>11</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
              Innlandet
            </Table.HeaderCell>
            <Table.Cell>6.4</Table.Cell>
            <Table.Cell>9.7</Table.Cell>
            <Table.Cell>380.5</Table.Cell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>74</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="row" style={{ textAlign: 'left' }}>
              Møre og Romsdal
            </Table.HeaderCell>
            <Table.Cell>6.4</Table.Cell>
            <Table.Cell>9.7</Table.Cell>
            <Table.Cell>380.5</Table.Cell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>46</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

export const WithFormElements: Story = {
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
                {
                  ...(getCheckboxProps({
                    allowIndeterminate: true,
                    id: `${ctx.id}-selectAll`,
                  }) as object) /* TODO: remove "as object" after next.49*/
                }
              />
            </Table.HeaderCell>
            <Table.HeaderCell>#</Table.HeaderCell>
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
                {
                  ...(getCheckboxProps({
                    id: `${ctx.id}-select1`,
                    value: '1',
                  }) as object) /* TODO: remove "as object" after next.49*/
                }
              />
            </Table.Cell>
            <Table.Cell>1.</Table.Cell>
            <Table.Cell>
              <Textfield
                data-size="sm"
                value="Trives du på skolen?"
                aria-label={`Textfield 1-1`}
                id={`${ctx.id}-textfield1-1`}
              />
            </Table.Cell>
            <Table.Cell>
              <Textfield
                data-size="sm"
                value="Trives ikke noe særlig"
                aria-label={`Textfield 1-2`}
                id={`${ctx.id}-textfield1-2`}
              />
            </Table.Cell>
            <Table.Cell>
              <Textfield
                value="Trives godt"
                data-size="sm"
                aria-label={`Textfield 1-3`}
                id={`${ctx.id}-textfield1-3`}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Checkbox
                aria-label={`Check 1`}
                {
                  ...(getCheckboxProps({
                    id: `${ctx.id}-select1`,
                    value: '2',
                  }) as object) /* TODO: remove "as object" after next.49*/
                }
              />
            </Table.Cell>
            <Table.Cell>2.</Table.Cell>
            <Table.Cell>
              <Textfield
                data-size="sm"
                value="Har du opplevd mobbing?"
                aria-label={`Textfield 1-1`}
                id={`${ctx.id}-textfield1-1`}
                style={{ width: 250 }}
              />
            </Table.Cell>
            <Table.Cell>
              <Textfield
                data-size="sm"
                value="Sjelden"
                aria-label={`Textfield 1-2`}
                id={`${ctx.id}-textfield1-2`}
              />
            </Table.Cell>
            <Table.Cell>
              <Textfield
                cols={3}
                value="Ofte"
                data-size="sm"
                aria-label={`Textfield 1-3`}
                id={`${ctx.id}-textfield1-3`}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

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

export const FixedTable: Story = {
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
              <Table.HeaderCell>Tildeling</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {currentItems.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.kommune}</Table.Cell>
                <Table.Cell>{item.tildeling}</Table.Cell>
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
};

export const MultipleHeaderRows: Story = {
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
            <Table.Cell>0.5</Table.Cell>
            <Table.Cell>1.0</Table.Cell>
            <Table.Cell>5.7</Table.Cell>
            <Table.Cell>46.0</Table.Cell>
            <Table.Cell>46.9</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
              Medier og kommunikasjon
            </Table.HeaderCell>
            <Table.Cell>1.2</Table.Cell>
            <Table.Cell>1.9</Table.Cell>
            <Table.Cell>11.3</Table.Cell>
            <Table.Cell>49.4</Table.Cell>
            <Table.Cell>36.1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
              Musikk, dans og drama
            </Table.HeaderCell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>7.0</Table.Cell>
            <Table.Cell>41.9</Table.Cell>
            <Table.Cell>49.8</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope={'row'} style={{ textAlign: 'left' }}>
              Studiespesialisering
            </Table.HeaderCell>
            <Table.Cell>1.2</Table.Cell>
            <Table.Cell>1.8</Table.Cell>
            <Table.Cell>8.9</Table.Cell>
            <Table.Cell>49.8</Table.Cell>
            <Table.Cell>38.3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

export const WithBorder: Story = {
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
              <Table.HeaderCell>Uke</Table.HeaderCell>
              <Table.HeaderCell>Datoer</Table.HeaderCell>
              <Table.HeaderCell>Hva</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>31</Table.Cell>
              <Table.Cell>1. august</Table.Cell>
              <Table.Cell>Påmelding til nasjonale prøver starter</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>36-39</Table.Cell>
              <Table.Cell>1. september - 26. september</Table.Cell>
              <Table.Cell>
                Gjennomføringsuker for nasjonale prøver 5.trinn i
                <List.Unordered>
                  <List.Item>Engelsk</List.Item>
                  <List.Item>Lesing</List.Item>
                  <List.Item>Regning</List.Item>
                </List.Unordered>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>39</Table.Cell>
              <Table.Cell>26. september</Table.Cell>
              <Table.Cell>
                Frist for registrering av fritatt og ikke deltatt for alle
                prøvene
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  },
};
