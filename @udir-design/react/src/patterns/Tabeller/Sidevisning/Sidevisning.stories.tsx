import { type ChangeEvent, useEffect, useState } from 'react';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Field } from 'src/components/field/Field';
import { Pagination } from 'src/components/pagination/Pagination';
import { Select } from 'src/components/select/Select';
import { Table } from 'src/components/table';
import { Label } from 'src/components/typography/label/Label';
import { usePagination } from 'src/utilities/hooks/usePagination/usePagination';
import './sidevisning.css';

type Data = {
  id: number;
  navn: string;
  sted: string;
  orgnummer: string;
  klarForGjennomforing: string;
};

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
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setCurrentPage] = useState(1);
    const [width, setWidth] = useState(() =>
      typeof window !== 'undefined' ? window.innerWidth : 1024,
    );

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const onResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);

    const rem =
      typeof document !== 'undefined'
        ? parseFloat(getComputedStyle(document.documentElement).fontSize)
        : 16;
    const isMobile = width < 48 * rem; // < 480px
    const isDesktop = width >= 64 * rem; // >= 1024px

    const totalRows = dummyData.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });

    const rangeStart = totalRows === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const rangeEnd =
      totalRows === 0 ? 0 : Math.min(page * itemsPerPage, totalRows);
    const paginatedData = dummyData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    const handleItemsPerPageChange = (
      event: ChangeEvent<HTMLSelectElement>,
    ) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
    };

    return (
      <div className="example-main">
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Sted</Table.HeaderCell>
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
              Rad {rangeStart}-{rangeEnd} av {totalRows}
            </span>
            <Field className="example-controls-section-select">
              <Label>Rader per side</Label>
              <Select
                value={String(itemsPerPage)}
                onChange={handleItemsPerPageChange}
              >
                {[5, 10, 25, 50].map((size) => (
                  <Select.Option key={size} value={String(size)}>
                    {size}
                  </Select.Option>
                ))}
              </Select>
            </Field>
          </div>
        </div>
      </div>
    );
  },
});

const steder = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'];
const fornavn = ['Rita', 'Kari', 'Ola', 'Kai'];

const dummyData: Data[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  navn: `${fornavn[i % fornavn.length]} Nordmann`,
  sted: steder[i % steder.length],
  orgnummer: String(100000000 + i),
  klarForGjennomforing: i % 3 === 0 ? 'Nei' : 'Ja',
}));
