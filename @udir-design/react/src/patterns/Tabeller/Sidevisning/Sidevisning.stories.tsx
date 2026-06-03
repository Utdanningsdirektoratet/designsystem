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
  id: string;
  fylke: string;
  emne: string;
  muntligkarakter: string;
  skriftligkarakter: string;
  standpunktkarakter: string;
  antallelever: number;
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

    const totalRows = grades.length;
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
    const paginatedData = grades.slice(
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
              {isMobile && <Table.HeaderCell>Fylke, emne</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Fylke</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Emne</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Antall elever</Table.HeaderCell>}
              <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              {isDesktop && <Table.HeaderCell>Muntlig </Table.HeaderCell>}
              {isDesktop && <Table.HeaderCell>Skriftlig </Table.HeaderCell>}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((row) => (
              <Table.Row key={row.id}>
                {isMobile && (
                  <Table.Cell>
                    {row.fylke}, <br /> {row.emne}
                  </Table.Cell>
                )}
                {!isMobile && <Table.Cell>{row.fylke}</Table.Cell>}
                {!isMobile && <Table.Cell>{row.emne}</Table.Cell>}
                {!isMobile && <Table.Cell>{row.antallelever}</Table.Cell>}
                <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                {isDesktop && <Table.Cell>{row.muntligkarakter}</Table.Cell>}
                {isDesktop && <Table.Cell>{row.skriftligkarakter}</Table.Cell>}
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

const emner = ['Engelsk', 'Matematikk', 'Hovedmål', 'Sidemål'];
const fylker = [
  'Agder',
  'Akershus',
  'Buskerud',
  'Finnmark',
  'Innlandet',
  'Nordland',
  'Oslo',
  'Rogaland',
  'Telemark',
  'Troms',
  'Vestland',
  'Viken',
];

const seeded = (str: string): number => {
  let h = 0;
  for (const c of str) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
  return Math.abs(h) / 2147483647;
};

const grades: Data[] = fylker.flatMap((fylke) =>
  emner.map((emne) => ({
    id: `${fylke}-${emne}`,
    emne,
    fylke,
    muntligkarakter: (seeded(`${fylke}-${emne}-muntlig`) * 1.2 + 3).toFixed(2),
    skriftligkarakter: (seeded(`${fylke}-${emne}-skriftlig`) * 1.2 + 3).toFixed(
      2,
    ),
    standpunktkarakter: (
      seeded(`${fylke}-${emne}-standpunkt`) * 1.2 +
      3
    ).toFixed(2),
    antallelever: Math.floor(seeded(`${fylke}-${emne}-antall`) * 10001) + 5000,
  })),
);
