import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import type { PaginationButtonProps } from 'src/components/pagination/Pagination';
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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const breakpoints = {
      sm: 20 * rem, // 320px
      md: 48 * rem, // 768px
      lg: 75 * rem, // 1200px
    };
    const isSmallMobile = windowWidth <= breakpoints.sm;
    const isMobile = windowWidth < breakpoints.md;
    const isTablet = windowWidth < breakpoints.lg;

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isSmallMobile ? 1 : isMobile ? 2 : isTablet ? 3 : 6,
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
              {!isMobile && <Table.HeaderCell>Orgnummer</Table.HeaderCell>}
              {!isMobile && (
                <Table.HeaderCell>Klar for gjennomføring</Table.HeaderCell>
              )}
              {!isMobile && <Table.HeaderCell>Brukerstøtte</Table.HeaderCell>}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.navn}</Table.Cell>
                <Table.Cell>{row.sted}</Table.Cell>
                {!isMobile && <Table.Cell>{row.orgnummer}</Table.Cell>}
                {!isMobile && (
                  <Table.Cell>{row.klarForGjennomforing}</Table.Cell>
                )}
                {!isMobile && <Table.Cell>{row.brukerstotte}</Table.Cell>}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div
          style={{
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row',
            justifyContent: isTablet ? 'center' : 'space-between',
            alignItems: 'center',
            gap: 'var(--ds-size-4)',
            margin: 'var(--ds-size-6) var(--ds-size-2)',
          }}
        >
          <Pagination aria-label="Sidenavigering" {...args} data-size="sm">
            <Pagination.List>
              <Pagination.Item>
                <Pagination.Button
                  aria-label="Forrige side"
                  {...prevButtonProps}
                />
              </Pagination.Item>
              {pages.map(
                ({
                  page,
                  itemKey,
                  buttonProps,
                }: {
                  page: number | string;
                  itemKey: string;
                  buttonProps: PaginationButtonProps | null;
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
                <Pagination.Button
                  aria-label="Neste side"
                  {...nextButtonProps}
                />
              </Pagination.Item>
            </Pagination.List>
          </Pagination>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: isTablet ? 'space-between' : 'flex-start',
              alignItems: 'center',
              alignSelf: isTablet ? 'center' : 'auto',
              width: isTablet ? '100%' : 'auto',
              maxWidth: isTablet ? '25rem' : 'none',
              gap: 'var(--ds-size-4)',
            }}
          >
            <span
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {rangeStart}-{rangeEnd} av {dummyData.length}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-size-4)',
              }}
            >
              <span>Rader per side</span>
              <Dropdown.TriggerContext>
                <Dropdown.Trigger
                  variant="secondary"
                  aria-label="Rader per side"
                >
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
