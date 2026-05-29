import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Pagination } from 'src/components/pagination/Pagination';
import type { TableHeaderCellProps } from 'src/components/table';
import { Table } from 'src/components/table';
import { usePagination } from 'src/utilities/hooks/usePagination/usePagination';

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: { componentOrigin: { originator: 'self' } },
  decorators: [
    withResponsiveDataSize,
    (Story, context) => {
      const isInDocsPage =
        window.parent.location.search.includes('viewMode=docs');
      if (isInDocsPage) context.viewMode = 'docs';
      return <Story />;
    },
  ],
});

export const Preview = meta.story({
  parameters: { docs: advancedCodeDocs },
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
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const onResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = width < 48 * rem; // < 480px
    const isTablet = width >= 48 * rem && width < 64 * rem; // 480–1024px
    const isDesktop = width >= 64 * rem; // >= 1024px

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
      if (!sortField) return 0;
      return a[sortField] < b[sortField]
        ? sortDirection === 'ascending'
          ? -1
          : 1
        : a[sortField] > b[sortField]
          ? sortDirection === 'ascending'
            ? 1
            : -1
          : 0;
    });

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });

    const rangeStart = (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, dummyData.length);
    const paginatedData = sortedData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return (
      <>
        <style>
          {`
        .example-main {
          margin: 20px;
        }
        .example-controls {
          display: flex;
          flex-direction: ${isDesktop ? 'row' : 'column'};
          justify-content: ${isDesktop ? 'space-between' : 'center'};
          align-items: center;
          gap: var(--ds-size-4);
          margin: var(--ds-size-6) var(--ds-size-2); 
        }
        .example-controls-section {
          display: flex;
          flex-direction: ${isMobile ? 'column' : 'row'};
          justify-content: ${isTablet ? 'space-between' : 'flex-start'};
          align-items: center;
          width: ${isTablet ? 'fit-content' : 'auto'};
          gap: ${isTablet ? 'var(--ds-size-8)' : isDesktop ? 'var(--ds-size-6)' : 'var(--ds-size-2)'};
        }
        .example-controls-section-span {
          color: var(--ds-color-neutral-text-subtle);
        }
        .example-controls-section-dropdown {
          display: flex;
          align-items: center;
          gap: var(--ds-size-2);
        }`}
        </style>
        <div className="example-main" style={{ margin: '20px' }}>
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
                {isDesktop && (
                  <Table.HeaderCell>Klar for gjennomføring</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {paginatedData.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.navn}</Table.Cell>
                  <Table.Cell>{row.sted}</Table.Cell>
                  {!isMobile && <Table.Cell>{row.orgnummer}</Table.Cell>}
                  {isDesktop && (
                    <Table.Cell>{row.klarForGjennomforing}</Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="example-controls">
            <Pagination aria-label="Sidenavigering" data-size="sm">
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
                        {...buttonProps}
                        aria-label={`Side ${page}`}
                      >
                        {page}
                      </Pagination.Button>
                    )}
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Button
                    aria-label="Neste side"
                    {...nextButtonProps}
                  />
                </Pagination.Item>
              </Pagination.List>
            </Pagination>
            <div className="example-controls-section">
              <span className="example-controls-section-span">
                Rad {rangeStart}-{rangeEnd} av {dummyData.length}
              </span>
              <div className="example-controls-section-dropdown">
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
      </>
    );
  },
});

const steder = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'];
const fornavn = ['Rita', 'Kari', 'Ola', 'Kai'];

const dummyData = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  navn: `${fornavn[i % fornavn.length]} Nordmann`,
  sted: steder[i % steder.length],
  orgnummer: String(100000000 + i),
  klarForGjennomforing: i % 3 === 0 ? 'Nei' : 'Ja',
}));
