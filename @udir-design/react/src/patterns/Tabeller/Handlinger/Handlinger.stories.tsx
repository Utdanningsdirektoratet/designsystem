import { type ChangeEvent, useEffect, useRef, useState } from 'react';
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
import {
  Suggestion,
  type SuggestionMultipleProps,
} from 'src/components/suggestion/Suggestion';
import { Table } from 'src/components/table';
import { Label } from 'src/components/typography/label/Label';
import './handlinger.css';
import { usePagination } from 'src/hooks/usePagination';

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
    zebra: false,
    stickyHeader: false,
    border: false,
    hover: true,
    tintedColumnHeader: false,
    tintedRowHeader: false,
    'data-color': 'neutral',
  },
  render: (args) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [emne, setEmne] = useState<string[]>([]);
    const [fylke, setFylke] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(
      () => !window.matchMedia('(min-width: 48rem)').matches,
    );

    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 48rem)');
      const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
      setCurrentPage(1);
      setSelectedIds(new Set());
    }, [emne, fylke, searchQuery]);

    const filteredData = grades
      .filter((d) => emne.length === 0 || emne.includes(d.emne))
      .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return Object.values(d).some((v) =>
          String(v).toLowerCase().includes(q),
        );
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
      if (allOnPageSelected) return;
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginatedData.forEach((row) => next.add(row.id));
        return next;
      });
    };

    const toggleRow = (id: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };

    const selectAllRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (selectAllRef.current) {
        selectAllRef.current.indeterminate =
          someOnPageSelected && !allOnPageSelected;
      }
    }, [someOnPageSelected, allOnPageSelected]);

    const handleItemsPerPageChange = (
      event: ChangeEvent<HTMLSelectElement>,
    ) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
    };

    return (
      <div className="example-main">
        <div className="example-filters-section">
          <Field className="example-search-field">
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
          <div className="example-suggestion-section">
            <Field className="example-suggestion-field">
              <Label>Velg emne(r)</Label>
              <Suggestion
                {...(args as SuggestionMultipleProps)}
                multiple
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
            <Field className="example-suggestion-field">
              <Label>Velg fylke(r)</Label>
              <Suggestion
                {...(args as SuggestionMultipleProps)}
                multiple
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
          </div>
        </div>
        {(emne.length > 0 || fylke.length > 0) && (
          <div className="example-active-filters">
            {emne.length > 0 && (
              <div className="example-active-filters-group">
                <Label>Emne</Label>
                <ul>
                  {emne.map((e) => (
                    <Chip.Removable
                      key={e}
                      aria-label={`Fjern ${e}`}
                      onClick={() =>
                        setEmne((prev) => prev.filter((v) => v !== e))
                      }
                    >
                      {e}
                    </Chip.Removable>
                  ))}
                </ul>
              </div>
            )}
            {fylke.length > 0 && (
              <div className="example-active-filters-group">
                <Label>Fylke</Label>
                <ul>
                  {fylke.map((f) => (
                    <Chip.Removable
                      key={f}
                      aria-label={`Fjern ${f}`}
                      onClick={() =>
                        setFylke((prev) => prev.filter((v) => v !== f))
                      }
                    >
                      {f}
                    </Chip.Removable>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {selectedIds.size > 0 && (
          <div className="handlinger-toolbar">
            <div className="handlinger-toolbar__selection">
              <p data-size="sm">{selectedIds.size} valgt</p>
              <div className="handlinger-toolbar__buttons">
                <Button variant="tertiary" onClick={selectAll} data-size="sm">
                  Velg alle
                </Button>
                <Button
                  variant="tertiary"
                  onClick={() => setSelectedIds(new Set())}
                  data-size="sm"
                >
                  Fjern alle
                </Button>
              </div>
            </div>
            <div className="handlinger-toolbar__actions">
              <Button data-variant="tertiary" data-size="sm">
                <PencilWritingIcon aria-hidden />
                Rediger
              </Button>
              <Button data-variant="tertiary" data-size="sm">
                <DownloadIcon aria-hidden />
                Eksporter
              </Button>
              <div className="handlinger-toolbar__divider" />
              <Button
                data-variant="tertiary"
                data-color="danger"
                data-size="sm"
                onClick={() => setSelectedIds(new Set())}
              >
                <TrashFillIcon aria-hidden />
                Slett
              </Button>
            </div>
          </div>
        )}
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox
                  ref={selectAllRef}
                  aria-label="Velg alle"
                  checked={allOnPageSelected}
                  onChange={toggleSelectAll}
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="show-below-tablet">
                Fylke, emne
              </Table.HeaderCell>
              <Table.HeaderCell className="hide-below-tablet">
                Fylke
              </Table.HeaderCell>
              <Table.HeaderCell className="hide-below-tablet">
                Emne
              </Table.HeaderCell>
              <Table.HeaderCell className="hide-below-tablet">
                Antall elever
              </Table.HeaderCell>
              <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              <Table.HeaderCell className="desktop-only">
                Muntlig
              </Table.HeaderCell>
              <Table.HeaderCell className="desktop-only">
                Skriftlig
              </Table.HeaderCell>
              <Table.HeaderCell className="desktop-only" aria-label="Rediger" />
              <Table.HeaderCell aria-label="Handlinger" />
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
                <Table.Cell className="show-below-tablet">
                  {row.fylke}, <br /> {row.emne}
                </Table.Cell>
                <Table.Cell className="hide-below-tablet">
                  {row.fylke}
                </Table.Cell>
                <Table.Cell className="hide-below-tablet">
                  {row.emne}
                </Table.Cell>
                <Table.Cell className="hide-below-tablet">
                  {row.antallelever}
                </Table.Cell>
                <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                <Table.Cell className="desktop-only">
                  {row.muntligkarakter}
                </Table.Cell>
                <Table.Cell className="desktop-only">
                  {row.skriftligkarakter}
                </Table.Cell>
                <Table.Cell className="desktop-only">
                  <Button variant="tertiary" data-size="sm">
                    <PencilWritingIcon aria-hidden />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    popoverTarget={`row-menu-${row.id}`}
                    variant="tertiary"
                    icon
                    title="Flere valg"
                    data-size="sm"
                  >
                    <MenuElipsisVerticalIcon aria-hidden />
                  </Button>
                  <Dropdown id={`row-menu-${row.id}`}>
                    <Dropdown.List>
                      <Dropdown.Item>
                        <Dropdown.Button>
                          <PencilWritingIcon aria-hidden /> Rediger
                        </Dropdown.Button>
                        <Dropdown.Button>
                          <DownloadIcon aria-hidden /> Eksporter
                        </Dropdown.Button>
                        <Divider />
                        <Dropdown.Button data-color="danger">
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
