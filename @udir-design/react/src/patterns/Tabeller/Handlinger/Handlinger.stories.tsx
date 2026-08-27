import {
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from 'react';
import {
  DownloadIcon,
  MenuElipsisVerticalIcon,
  PencilWritingIcon,
  TrashFillIcon,
} from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button';
import { Checkbox } from 'src/components/checkbox';
import { Chip } from 'src/components/chip/Chip';
import { Divider } from 'src/components/divider/Divider';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Field } from 'src/components/field/Field';
import { Pagination } from 'src/components/pagination/Pagination';
import { Search } from 'src/components/search/Search';
import { Select } from 'src/components/select/Select';
import { Suggestion } from 'src/components/suggestion/Suggestion';
import { Table } from 'src/components/table';
import { Tooltip } from 'src/components/tooltip/Tooltip';
import { Label } from 'src/components/typography/label/Label';
import { Paragraph } from 'src/components/typography/paragraph';
import { usePagination } from 'src/hooks/usePagination';
import styles from './handlinger-toolbar.module.css';

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
  parameters: { componentOrigin: { originator: 'self' }, layout: 'fullscreen' },
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

type ToolbarApi = {
  selectedCount: number;
  filteredCount: number;
  selectAll: () => void;
  clearSelection: () => void;
};

const ActionTable = ({
  args,
  toolbar,
}: {
  args: ComponentProps<typeof Table>;
  toolbar: (api: ToolbarApi) => ReactNode;
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [emne, setEmne] = useState<string[]>([]);
  const [fylke, setFylke] = useState<string[]>([]);
  const rowMenuPrefix = useId();
  const tableCaptionId = useId();
  const [isMobile, setIsMobile] = useState(
    () => !window.matchMedia('(min-width: 48rem)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 48rem)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const filterKey = `${emne.join(',')}|${fylke.join(',')}|${searchQuery}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
    setSelectedIds(new Set());
  }

  const filteredData = grades
    .filter((d) => emne.length === 0 || emne.includes(d.emne))
    .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
    .filter((d) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return Object.values(d).some((v) => String(v).toLowerCase().includes(q));
    });

  const totalRows = filteredData.length;
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
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const allOnPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedIds.has(row.id));
  const someOnPageSelected = paginatedData.some((row) =>
    selectedIds.has(row.id),
  );

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        paginatedData.forEach((row) => next.delete(row.id));
      } else {
        paginatedData.forEach((row) => next.add(row.id));
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredData.map((row) => row.id)));
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <section className={styles.actions} aria-labelledby={tableCaptionId}>
      <div className={styles['actions-filters-section']}>
        <div className={styles['actions-suggestion-section']}>
          <Field className={styles['actions-suggestion-field']}>
            <Label>Velg fylker</Label>
            <Suggestion
              multiple
              display="count"
              selected={fylke}
              onSelectedChange={(items) =>
                setFylke(items.map((item) => item.value))
              }
            >
              <Suggestion.Input />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty>Tomt</Suggestion.Empty>
                {uniqueFylker.map((f) => (
                  <Suggestion.Option key={f} label={f} value={f}>
                    {f}
                  </Suggestion.Option>
                ))}
              </Suggestion.List>
            </Suggestion>
          </Field>
          <Field className={styles['actions-suggestion-field']}>
            <Label>Velg emner</Label>
            <Suggestion
              multiple
              display="count"
              selected={emne}
              onSelectedChange={(items) =>
                setEmne(items.map((item) => item.value))
              }
            >
              <Suggestion.Input />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty>Tomt</Suggestion.Empty>
                {uniqueEmner.map((e) => (
                  <Suggestion.Option key={e} label={e} value={e}>
                    {e}
                  </Suggestion.Option>
                ))}
              </Suggestion.List>
            </Suggestion>
          </Field>
          {(emne.length > 0 || fylke.length > 0) && (
            <Field>
              <Button
                onClick={() => {
                  setEmne([]);
                  setFylke([]);
                }}
                variant="tertiary"
                data-size="sm"
                className={styles['actions-clear-filters']}
              >
                Fjern filtre
              </Button>
            </Field>
          )}
        </div>
        <Field className={styles['actions-search-field']}>
          <Label>Søk</Label>
          <Search>
            <Search.Input
              aria-label="Søk"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search.Clear onClick={() => setSearchQuery('')} />
          </Search>
        </Field>
      </div>
      {(emne.length > 0 || fylke.length > 0) && (
        <div className={styles['actions-active-filters']}>
          {fylke.length > 0 && (
            <div className={styles['actions-active-filters-group']}>
              <Label>Fylke</Label>
              <ul>
                {fylke.map((f) => (
                  <li key={f}>
                    <Chip.Removable
                      aria-label={`Fjern ${f}`}
                      onClick={() =>
                        setFylke((prev) => prev.filter((v) => v !== f))
                      }
                    >
                      {f}
                    </Chip.Removable>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {emne.length > 0 && (
            <div className={styles['actions-active-filters-group']}>
              <Label>Emne</Label>
              <ul>
                {emne.map((e) => (
                  <li key={e}>
                    <Chip.Removable
                      aria-label={`Fjern ${e}`}
                      onClick={() =>
                        setEmne((prev) => prev.filter((v) => v !== e))
                      }
                    >
                      {e}
                    </Chip.Removable>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {toolbar({
        selectedCount: selectedIds.size,
        filteredCount: filteredData.length,
        selectAll,
        clearSelection: () => setSelectedIds(new Set()),
      })}
      <div className={styles['actions-table-scroll']}>
        <Table {...args}>
          <caption id={tableCaptionId} className="ds-sr-only">
            Karakterer fordelt på fylke og emne
          </caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox
                  ref={(checkbox) => {
                    if (checkbox) {
                      checkbox.indeterminate =
                        someOnPageSelected && !allOnPageSelected;
                    }
                  }}
                  aria-label="Velg alle"
                  checked={allOnPageSelected}
                  onChange={toggleSelectAll}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Fylke</Table.HeaderCell>
              <Table.HeaderCell>Emne</Table.HeaderCell>
              <Table.HeaderCell>Antall elever</Table.HeaderCell>
              <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              <Table.HeaderCell>Muntlig</Table.HeaderCell>
              <Table.HeaderCell>Skriftlig</Table.HeaderCell>
              <Table.HeaderCell aria-label="Handlinger">
                Handling
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>
                  <Checkbox
                    aria-label={`Velg rad for ${row.fylke}, ${row.emne}`}
                    checked={selectedIds.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </Table.Cell>
                <Table.Cell>{row.fylke}</Table.Cell>
                <Table.Cell>{row.emne}</Table.Cell>
                <Table.Cell>{row.antallelever}</Table.Cell>
                <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                <Table.Cell>{row.muntligkarakter}</Table.Cell>
                <Table.Cell>{row.skriftligkarakter}</Table.Cell>
                <Table.Cell>
                  <Tooltip content="Handlinger">
                    <Button
                      popoverTarget={`${rowMenuPrefix}-row-menu-${row.id}`}
                      variant="tertiary"
                      icon
                      title="Handlinger"
                      aria-label="Handlinger"
                      data-size="sm"
                    >
                      <MenuElipsisVerticalIcon aria-hidden />
                    </Button>
                  </Tooltip>
                  <Dropdown id={`${rowMenuPrefix}-row-menu-${row.id}`}>
                    <Dropdown.List>
                      <Dropdown.Item>
                        <Dropdown.Button aria-label="Rediger">
                          <PencilWritingIcon aria-hidden /> Rediger
                        </Dropdown.Button>
                        <Dropdown.Button aria-label="Eksporter">
                          <DownloadIcon aria-hidden /> Eksporter
                        </Dropdown.Button>
                        <Divider />
                        <Dropdown.Button aria-label="Slett" data-color="danger">
                          <TrashFillIcon aria-hidden /> Slett
                        </Dropdown.Button>
                      </Dropdown.Item>
                    </Dropdown.List>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className={styles['actions-controls']}>
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
              <Pagination.Button aria-label="Neste side" {...nextButtonProps} />
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
        <div className={styles['actions-controls-section']}>
          <span className={styles['actions-controls-section-span']}>
            Rad {rangeStart}-{rangeEnd} av {totalRows}
          </span>
          <Field className={styles['actions-controls-section-select']}>
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
    </section>
  );
};

export const Preview = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: {
    zebra: false,
    stickyHeader: false,
    border: false,
    hover: true,
    tintedColumnHeader: false,
    tintedRowHeader: false,
    'data-color': 'neutral',
  },
  render: (args) => {
    const ActionToolbar = ({
      selectedCount,
      filteredCount,
      selectAll,
      clearSelection,
    }: ToolbarApi) => {
      return (
        <div className={styles['action-toolbar']}>
          <div className={styles['action-toolbar-selection']}>
            <Paragraph data-size="sm">{selectedCount} valgt</Paragraph>
            <div className={styles['action-toolbar-divider']} />
            <ul
              className={styles['action-toolbar-buttons']}
              aria-label="Radvalg"
            >
              <li>
                <Button variant="tertiary" onClick={selectAll} data-size="sm">
                  Velg alle
                  <span className={styles['action-toolbar-select-count']}>
                    {' '}
                    {filteredCount}
                  </span>
                </Button>
              </li>
              {selectedCount > 0 && (
                <li>
                  <Button
                    variant="tertiary"
                    onClick={clearSelection}
                    data-size="sm"
                  >
                    Fjern alle
                  </Button>
                </li>
              )}
            </ul>
          </div>
          {selectedCount > 0 && (
            <div className={styles['action-toolbar-actions']}>
              <ul
                className={styles['action-toolbar-actions-compact']}
                aria-label="Handlinger for valgte rader"
              >
                <li>
                  <Tooltip content="Rediger">
                    <Button
                      variant="tertiary"
                      icon
                      aria-label="Rediger"
                      data-size="sm"
                    >
                      <PencilWritingIcon aria-hidden />
                    </Button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Eksporter">
                    <Button
                      variant="tertiary"
                      icon
                      aria-label="Eksporter"
                      data-size="sm"
                    >
                      <DownloadIcon aria-hidden />
                    </Button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Slett">
                    <Button
                      variant="tertiary"
                      data-color="danger"
                      icon
                      aria-label="Slett"
                      data-size="sm"
                    >
                      <TrashFillIcon aria-hidden />
                    </Button>
                  </Tooltip>
                </li>
              </ul>
              <ul
                className={styles['action-toolbar-actions-desktop']}
                aria-label="Handlinger for valgte rader"
              >
                <li>
                  <Button variant="tertiary" data-size="sm">
                    <PencilWritingIcon aria-hidden />
                    Rediger
                  </Button>
                </li>
                <li>
                  <Button variant="tertiary" data-size="sm">
                    <DownloadIcon aria-hidden />
                    Eksporter
                  </Button>
                </li>
                <li>
                  <Button variant="tertiary" data-color="danger" data-size="sm">
                    <TrashFillIcon aria-hidden />
                    Slett
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    };
    return (
      <ActionTable args={args} toolbar={(api) => <ActionToolbar {...api} />} />
    );
  },
});

export const Secondary = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: {
    zebra: false,
    stickyHeader: false,
    border: false,
    hover: true,
    tintedColumnHeader: false,
    tintedRowHeader: false,
    'data-color': 'neutral',
  },
  render: (args) => {
    const ActionToolbar = ({
      selectedCount,
      filteredCount,
      selectAll,
      clearSelection,
    }: ToolbarApi) => {
      return (
        <div className={styles['action-toolbar']}>
          <div className={styles['action-toolbar-selection']}>
            <Paragraph data-size="sm">{selectedCount} valgt</Paragraph>
            <ul
              className={styles['action-toolbar-buttons']}
              aria-label="Radvalg"
            >
              <li>
                <Button variant="secondary" onClick={selectAll} data-size="sm">
                  Velg alle
                  <span className={styles['action-toolbar-select-count']}>
                    {' '}
                    {filteredCount}
                  </span>
                </Button>
              </li>
              {selectedCount > 0 && (
                <li>
                  <Button
                    variant="secondary"
                    onClick={clearSelection}
                    data-size="sm"
                  >
                    Fjern alle
                  </Button>
                </li>
              )}
            </ul>
          </div>
          {selectedCount > 0 && (
            <div className={styles['action-toolbar-actions']}>
              <ul
                className={styles['action-toolbar-actions-compact']}
                aria-label="Handlinger for valgte rader"
              >
                <li>
                  <Tooltip content="Rediger">
                    <Button
                      variant="secondary"
                      icon
                      aria-label="Rediger"
                      data-size="sm"
                    >
                      <PencilWritingIcon aria-hidden />
                    </Button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Eksporter">
                    <Button
                      variant="secondary"
                      icon
                      aria-label="Eksporter"
                      data-size="sm"
                    >
                      <DownloadIcon aria-hidden />
                    </Button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Slett">
                    <Button
                      variant="secondary"
                      data-color="danger"
                      icon
                      aria-label="Slett"
                      data-size="sm"
                    >
                      <TrashFillIcon aria-hidden />
                    </Button>
                  </Tooltip>
                </li>
              </ul>
              <ul
                className={styles['action-toolbar-actions-desktop']}
                aria-label="Handlinger for valgte rader"
              >
                <li>
                  <Button variant="secondary" data-size="sm">
                    <PencilWritingIcon aria-hidden />
                    Rediger
                  </Button>
                </li>
                <li>
                  <Button variant="secondary" data-size="sm">
                    <DownloadIcon aria-hidden />
                    Eksporter
                  </Button>
                </li>
                <li>
                  <Button
                    variant="secondary"
                    data-color="danger"
                    data-size="sm"
                  >
                    <TrashFillIcon aria-hidden />
                    Slett
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    };
    return (
      <ActionTable args={args} toolbar={(api) => <ActionToolbar {...api} />} />
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

const uniqueEmner = [...new Set(grades.map((d) => d.emne))].sort();
const uniqueFylker = [...new Set(grades.map((d) => d.fylke))].sort();
