import { type ChangeEvent, useEffect, useState } from 'react';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Field } from 'src/components/field/Field';
import { Pagination } from 'src/components/pagination/Pagination';
import { Select } from 'src/components/select/Select';
import { Table } from 'src/components/table';
import { Label } from 'src/components/typography/label/Label';
import { usePagination } from 'src/hooks/usePagination/usePagination';
import { grades } from '../grades';
import styles from './sidevisning-preview.module.css';

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
    const [isMobile, setIsMobile] = useState(
      () => !window.matchMedia('(min-width: 48rem)').matches,
    );

    useEffect(() => {
      const mq = window.matchMedia('(min-width: 48rem)');
      const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);

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
      <div className={styles['preview-main']}>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell className={styles['show-below-tablet']}>
                Fylke, emne
              </Table.HeaderCell>
              <Table.HeaderCell className={styles['hide-below-tablet']}>
                Fylke
              </Table.HeaderCell>
              <Table.HeaderCell className={styles['hide-below-tablet']}>
                Emne
              </Table.HeaderCell>
              <Table.HeaderCell className={styles['hide-below-tablet']}>
                Antall elever
              </Table.HeaderCell>
              <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              <Table.HeaderCell className={styles['desktop-only']}>
                Muntlig
              </Table.HeaderCell>
              <Table.HeaderCell className={styles['desktop-only']}>
                Skriftlig
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell className={styles['show-below-tablet']}>
                  {row.fylke}, <br /> {row.emne}
                </Table.Cell>
                <Table.Cell className={styles['hide-below-tablet']}>
                  {row.fylke}
                </Table.Cell>
                <Table.Cell className={styles['hide-below-tablet']}>
                  {row.emne}
                </Table.Cell>
                <Table.Cell className={styles['hide-below-tablet']}>
                  {row.antallelever}
                </Table.Cell>
                <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                <Table.Cell className={styles['desktop-only']}>
                  {row.muntligkarakter}
                </Table.Cell>
                <Table.Cell className={styles['desktop-only']}>
                  {row.skriftligkarakter}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className={styles['preview-controls']}>
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
          <div className={styles['preview-controls-section']}>
            <span className={styles['preview-controls-section-span']}>
              Rad {rangeStart}-{rangeEnd} av {totalRows}
            </span>
            <Field className={styles['preview-controls-section-select']}>
              <Label>Rader per side</Label>
              <Select
                value={String(itemsPerPage)}
                onChange={handleItemsPerPageChange}
                autoComplete="off"
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
