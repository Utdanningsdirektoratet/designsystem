import { useEffect, useRef, useState } from 'react';
import { FilterIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button/Button';
import { Checkbox } from 'src/components/checkbox/Checkbox';
import { Dialog } from 'src/components/dialog/Dialog';
import { Field } from 'src/components/field/Field';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Pagination } from 'src/components/pagination/Pagination';
import { Search } from 'src/components/search/Search';
import { Select } from 'src/components/select/Select';
import {
  Suggestion,
  type SuggestionMultipleProps,
} from 'src/components/suggestion/Suggestion';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { Prose } from 'src/components/typography/prose/Prose';
import { useCheckboxGroup } from 'src/utilities/hooks/useCheckboxGroup/useCheckboxGroup';
import { usePagination } from 'src/utilities/hooks/usePagination/usePagination';
import './filtering.css';

type Data = {
  id: string;
  fylke: string;
  emne: string;
  antallelever: number;
  muntligkarakter: string;
  skriftligkarakter: string;
  standpunktkarakter: string;
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
    border: false,
    hover: false,
    tintedColumnHeader: false,
    'data-color': 'neutral',
  },
  render: (args) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      const onResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = width < 48 * rem; // < 480px
    const isDesktop = width >= 64 * rem; // >= 1024px

    const [emne, setEmne] = useState<string[]>([]);
    const [fylke, setFylke] = useState<string[]>([]);

    useEffect(() => {
      setCurrentPage(1);
    }, [emne, fylke, searchQuery]);

    const filteredData = [...grades]
      .filter((d) => emne.length === 0 || emne.includes(d.emne))
      .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return Object.values(d).some((v) =>
          String(v).toLowerCase().includes(q),
        );
      });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });

    const rangeStart = (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, filteredData.length);
    const paginatedData = filteredData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return (
      <div className="example-main">
        <Prose>
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
                    {uniqueEmner.map((c) => (
                      <Suggestion.Option key={c} label={c} value={c}>
                        {c}
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
                    {uniqueFylker.map((fylke) => (
                      <Suggestion.Option
                        key={fylke}
                        label={fylke}
                        value={fylke}
                      >
                        {fylke}
                      </Suggestion.Option>
                    ))}
                  </Suggestion.List>
                </Suggestion>
              </Field>
            </div>
          </div>
        </Prose>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              {isMobile && <Table.HeaderCell>Fylke, emne</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Fylke</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Emne</Table.HeaderCell>}
              {isDesktop && <Table.HeaderCell>Antall elever</Table.HeaderCell>}
              <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              {!isMobile && <Table.HeaderCell>Muntlig </Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Skriftlig </Table.HeaderCell>}
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
                {isDesktop && <Table.Cell>{row.antallelever}</Table.Cell>}
                <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                {!isMobile && <Table.Cell>{row.muntligkarakter}</Table.Cell>}
                {!isMobile && <Table.Cell>{row.skriftligkarakter}</Table.Cell>}
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
            <span>
              Rad {rangeStart}-{rangeEnd} av {filteredData.length}
            </span>
            <Field className="example-controls-section-select">
              <Label>Rader per side</Label>
              <Select>
                {[5, 10, 25, 50].map((size) => (
                  <Select.Option
                    key={size}
                    value={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                  >
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

export const WithDialog = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: {
    zebra: true,
    border: false,
    hover: false,
    tintedColumnHeader: false,
    'data-color': 'neutral',
  },
  render: (args) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const [searchQuery, setSearchQuery] = useState('');
    const [emne, setEmne] = useState<string[]>([]);
    const [fylke, setFylke] = useState<string[]>([]);
    const [eksamen, setEksamen] = useState<string[]>([
      'skriftlig',
      'muntlig',
      'standpunkt',
    ]);
    const [draftEmne, setDraftEmne] = useState<string[]>([]);
    const [draftFylke, setDraftFylke] = useState<string[]>([]);
    const [draftEksamen, setDraftEksamen] = useState<string[]>([
      'skriftlig',
      'muntlig',
      'standpunkt',
    ]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      const onResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = width < 48 * rem; // < 480px
    const isDesktop = width >= 64 * rem; // >= 1024px

    useEffect(() => {
      setCurrentPage(1);
    }, [emne, fylke, eksamen, searchQuery]);

    const { getCheckboxProps } = useCheckboxGroup({
      name: 'checkbox-group',
      value: draftEksamen,
      onChange: (value) => setDraftEksamen(value),
    });

    const filteredData = [...grades]
      .filter((d) => emne.length === 0 || emne.includes(d.emne))
      .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return Object.values(d).some((v) =>
          String(v).toLowerCase().includes(q),
        );
      });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });

    const rangeStart = (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, filteredData.length);
    const paginatedData = filteredData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return (
      <div className="example-main">
        <Prose>
          <div className="example-filters-section-modal">
            <Field>
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
            <Dialog.TriggerContext>
              <Dialog.Trigger variant="secondary">
                <FilterIcon aria-label="Filter" />
                Filter
              </Dialog.Trigger>
              <Dialog
                ref={dialogRef}
                closedby="any"
                onToggle={(e) => {
                  if ((e.target as HTMLDialogElement).open) {
                    setDraftEmne(emne);
                    setDraftFylke(fylke);
                    setDraftEksamen(eksamen);
                  }
                }}
              >
                <Heading>Filter</Heading>
                <div className="example-dialog-filters">
                  <Prose>
                    <Fieldset>
                      <Fieldset.Legend>Karaktertype</Fieldset.Legend>
                      <Checkbox
                        label="Skriftlig"
                        {...getCheckboxProps('skriftlig')}
                      />
                      <Checkbox
                        label="Muntlig"
                        {...getCheckboxProps('muntlig')}
                      />
                      <Checkbox
                        label="Standpunkt"
                        {...getCheckboxProps('standpunkt')}
                      />
                    </Fieldset>
                  </Prose>
                  <Prose>
                    <Field className="example-suggestion-field">
                      <Label>Velg emne</Label>
                      <Suggestion
                        {...(args as SuggestionMultipleProps)}
                        multiple
                        selected={draftEmne}
                        onSelectedChange={(items) =>
                          setDraftEmne(items.map((item) => item.value))
                        }
                      >
                        <Suggestion.Input />
                        <Suggestion.Clear />
                        <Suggestion.List>
                          <Suggestion.Empty>Tomt</Suggestion.Empty>
                          {uniqueEmner.map((emne) => (
                            <Suggestion.Option
                              key={emne}
                              label={emne}
                              value={emne}
                            >
                              {emne}
                            </Suggestion.Option>
                          ))}
                        </Suggestion.List>
                      </Suggestion>
                    </Field>
                    <Field className="example-suggestion-field">
                      <Label>Velg fylke</Label>
                      <Suggestion
                        {...(args as SuggestionMultipleProps)}
                        multiple
                        selected={draftFylke}
                        onSelectedChange={(items) =>
                          setDraftFylke(items.map((item) => item.value))
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
                  </Prose>
                </div>
                <Field className="example-footer">
                  <Button
                    onClick={() => {
                      setEmne(draftEmne);
                      setFylke(draftFylke);
                      setEksamen(draftEksamen);
                      dialogRef.current?.close();
                    }}
                  >
                    Lagre
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setDraftEmne(emne);
                      setDraftFylke(fylke);
                      setDraftEksamen(eksamen);
                      dialogRef.current?.close();
                    }}
                  >
                    Avbryt
                  </Button>
                </Field>
              </Dialog>
            </Dialog.TriggerContext>
          </div>
        </Prose>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              {isMobile && <Table.HeaderCell>Fylke, emne</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Fylke</Table.HeaderCell>}
              {!isMobile && <Table.HeaderCell>Emne</Table.HeaderCell>}
              {isDesktop && <Table.HeaderCell>Antall elever</Table.HeaderCell>}
              {eksamen.includes('standpunkt') && (
                <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              )}
              {eksamen.includes('muntlig') &&
                (!isMobile || !eksamen.includes('standpunkt')) && (
                  <Table.HeaderCell>Muntlig</Table.HeaderCell>
                )}
              {eksamen.includes('skriftlig') &&
                (!isMobile || !eksamen.includes('standpunkt')) && (
                  <Table.HeaderCell>Skriftlig</Table.HeaderCell>
                )}
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
                {isDesktop && <Table.Cell>{row.antallelever}</Table.Cell>}
                {eksamen.includes('standpunkt') && (
                  <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                )}
                {eksamen.includes('muntlig') &&
                  (!isMobile || !eksamen.includes('standpunkt')) && (
                    <Table.Cell>{row.muntligkarakter}</Table.Cell>
                  )}
                {eksamen.includes('skriftlig') &&
                  (!isMobile || !eksamen.includes('standpunkt')) && (
                    <Table.Cell>{row.skriftligkarakter}</Table.Cell>
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
            <span>
              Rad {rangeStart}–{rangeEnd} av {filteredData.length}
            </span>
            <Field className="example-controls-section-select">
              <Label>Rader per side</Label>
              <Select>
                {[5, 10, 25, 50].map((size) => (
                  <Select.Option
                    key={size}
                    value={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                  >
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

const grades: Data[] = fylker.flatMap((fylke) =>
  emner.map((emne) => ({
    id: `${fylke}-${emne}`,
    emne,
    fylke,
    muntligkarakter: (Math.random() * (4.2 - 3) + 3).toFixed(2),
    skriftligkarakter: (Math.random() * (4.2 - 3) + 3).toFixed(2),
    standpunktkarakter: (Math.random() * (4.2 - 3) + 3).toFixed(2),
    antallelever: Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000,
  })),
);

const uniqueFylker = [...new Set(grades.map((d) => d.fylke))];
const uniqueEmner = [...new Set(grades.map((d) => d.emne))];
