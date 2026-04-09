import { useState } from 'react';
import { ChevronDownIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Pagination } from 'src/components/pagination/Pagination';
import type { TableHeaderCellProps } from 'src/components/table';
import { Table } from 'src/components/table';
import { usePagination } from 'src/utilities/hooks/usePagination/usePagination';

const meta = preview.meta({
  tags: ['beta', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [
    withResponsiveDataSize,
    (Story, context) => {
      // Hacky way to detect docs mode in iframe-rendered story
      const isInDocsPage =
        window.parent.location.search.includes('viewMode=docs');
      if (isInDocsPage) {
        // Set viewMode since Storybook doesn't detect it properly when rendered with "inline: false" (iframe mode)
        context.viewMode = 'docs';
      }
      return <Story />;
    },
  ],
});

export const Preview = meta.story({
  args: {
    zebra: true,
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
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setCurrentPage] = useState(1);

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
      setCurrentPage(1);
    };
    const sortedData = [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField])
        return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    });
    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: 5,
      setCurrentPage,
    });

    const rangeStart = (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, dummyData.length);

    const paginatedData = sortedData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );
    return (
      <div style={{ margin: '20px' }}>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell
                sort={sortField === 'navn' ? sortDirection : 'none'}
                onClick={() => handleSort('navn')}
              >
                Navn
              </Table.HeaderCell>
              <Table.HeaderCell
                sort={sortField === 'sted' ? sortDirection : 'none'}
                onClick={() => handleSort('sted')}
              >
                Sted
              </Table.HeaderCell>
              <Table.HeaderCell>Orgnummer</Table.HeaderCell>
              <Table.HeaderCell>Klar for gjennomføring</Table.HeaderCell>
              <Table.HeaderCell>Brukerstøtte</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.navn}</Table.Cell>
                <Table.Cell>{row.sted}</Table.Cell>
                <Table.Cell>{row.orgnummer}</Table.Cell>
                <Table.Cell>{row.klarForGjennomforing}</Table.Cell>
                <Table.Cell>{row.brukerstotte}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 'var(--ds-size-6) var(--ds-size-2)',
          }}
        >
          <Pagination aria-label="Sidenavigering" {...args} data-size="sm">
            <Pagination.List>
              <Pagination.Item>
                <Pagination.Button
                  aria-label="Forrige side"
                  {...prevButtonProps}
                >
                  Forrige
                </Pagination.Button>
              </Pagination.Item>
              {pages.map(
                ({
                  page,
                  itemKey,
                  buttonProps,
                }: {
                  page: number | string;
                  itemKey: string;
                  buttonProps: any;
                }) => (
                  <Pagination.Item key={itemKey}>
                    {typeof page === 'number' && (
                      <Pagination.Button
                        {...buttonProps}
                        aria-label={`Side ${page}`}
                      >
                        {page}
                      </Pagination.Button>
                    )}
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Button aria-label="Neste side" {...nextButtonProps}>
                  Neste
                </Pagination.Button>
              </Pagination.Item>
            </Pagination.List>
          </Pagination>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-size-4)',
            }}
          >
            <span
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                marginRight: 'var(--ds-size-6)',
              }}
            >
              {rangeStart}-{rangeEnd} av {dummyData.length}
            </span>
            <span>Rader per side</span>
            <Dropdown.TriggerContext>
              <Dropdown.Trigger variant="secondary" aria-label="Rader per side">
                {itemsPerPage}
                <ChevronDownIcon aria-hidden />
              </Dropdown.Trigger>
              <Dropdown>
                <Dropdown.List>
                  {[5, 10, 25, 50].map((size) => (
                    <Dropdown.Item key={size}>
                      <Dropdown.Button
                        onClick={() => {
                          setItemsPerPage(size);
                          setCurrentPage(1);
                        }}
                      >
                        {size}
                      </Dropdown.Button>
                    </Dropdown.Item>
                  ))}
                </Dropdown.List>
              </Dropdown>
            </Dropdown.TriggerContext>
          </div>
        </div>
      </div>
    );
  },
});

const steder = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'];
const fornavn = ['Rita', 'Kari', 'Ola', 'Kai'];

const dummyData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  navn: `${fornavn[i % fornavn.length]} Nordmann`,
  sted: steder[i % steder.length],
  orgnummer: String(100000000 + i),
  klarForGjennomforing: i % 3 === 0 ? 'Nei' : 'Ja',
  brukerstotte: 'Brukerstøtte',
}));
