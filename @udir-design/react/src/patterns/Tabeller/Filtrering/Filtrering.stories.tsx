import { Button } from '@digdir/designsystemet-react';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, FunnelIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Dialog } from 'src/components/dialog/Dialog';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Field } from 'src/components/field/Field';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Pagination } from 'src/components/pagination/Pagination';
import { Radio } from 'src/components/radio/Radio';
import { Search } from 'src/components/search/Search';
import {
  Suggestion,
  type SuggestionMultipleProps,
} from 'src/components/suggestion/Suggestion';
import type { TableHeaderCellProps } from 'src/components/table';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { Prose } from 'src/components/typography/prose/Prose';
import { usePagination } from 'src/utilities/hooks/usePagination/usePagination';
import { useRadioGroup } from 'src/utilities/hooks/useRadioGroup/useRadioGroup';

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
    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps['sort']>(undefined);
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

    const [city, setCity] = useState<string[]>([]);
    const [orgnummer, setOrgnummer] = useState<string[]>([]);

    useEffect(() => {
      setCurrentPage(1);
    }, [city, orgnummer, searchQuery]);

    const sortedData = [...dummyData]
      .filter((d) => city.length === 0 || city.includes(d.sted))
      .filter((d) => orgnummer.length === 0 || orgnummer.includes(d.orgnummer))
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return Object.values(d).some((v) =>
          String(v).toLowerCase().includes(q),
        );
      })
      .sort((a, b) => {
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

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });

    const rangeStart = (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, sortedData.length);
    const paginatedData = sortedData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return (
      <>
        <style>
          {`
        .example-filters-section {
            display: flex;
                flex-direction: ${isMobile || isTablet ? 'column' : 'row'};
                justify-content: space-between;
                align-items: ${isMobile || isTablet ? 'flex-start' : 'flex-end'};
                gap: var(--ds-size-6);
        }
        .example-suggestion-section {
            display: flex;
            flex-direction: ${isMobile ? 'column' : 'row'};
            gap: var(--ds-size-4);
            align-items: flex-end;
            width: ${isMobile ? '100%' : 'auto'};
        }
        .example-suggestion-field {
            max-width: ${isMobile ? 'none' : '280px'};
            width: ${isMobile ? '100%' : 'auto'};
        }
        .example-search-field {
            width: ${isMobile ? '100%' : 'auto'};
        }
        .example-main {
          margin: 20px;
          gap: 20px;
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
                  <Label>Velg sted</Label>
                  <Suggestion
                    {...(args as SuggestionMultipleProps)}
                    multiple
                    selected={city}
                    onSelectedChange={(items) =>
                      setCity(items.map((item) => item.value))
                    }
                  >
                    <Suggestion.Input />
                    <Suggestion.Clear />
                    <Suggestion.List>
                      <Suggestion.Empty>Tomt</Suggestion.Empty>
                      {uniqueCities.map((city) => (
                        <Suggestion.Option key={city} label={city} value={city}>
                          {city}
                        </Suggestion.Option>
                      ))}
                    </Suggestion.List>
                  </Suggestion>
                </Field>
                <Field className="example-suggestion-field">
                  <Label>Velg orgnummer</Label>
                  <Suggestion
                    {...(args as SuggestionMultipleProps)}
                    multiple
                    selected={orgnummer}
                    onSelectedChange={(items) =>
                      setOrgnummer(items.map((item) => item.value))
                    }
                  >
                    <Suggestion.Input />
                    <Suggestion.Clear />
                    <Suggestion.List>
                      <Suggestion.Empty>Tomt</Suggestion.Empty>
                      {uniqueOrgnummers.map((org) => (
                        <Suggestion.Option key={org} label={org} value={org}>
                          {org}
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
                Rad {rangeStart}–{rangeEnd} av {sortedData.length}
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
    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps['sort']>(undefined);
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

    const [city, setCity] = useState<string[]>([]);
    const [fylke, setFylke] = useState<string[]>([]);
    const [orgnummer, setOrgnummer] = useState<string[]>([]);
    const [klarFilter, setKlarFilter] = useState<'alle' | 'ja' | 'nei'>('alle');
    const [draftCity, setDraftCity] = useState<string[]>([]);
    const [draftFylke, setDraftFylke] = useState<string[]>([]);
    const [draftOrgnummer, setDraftOrgnummer] = useState<string[]>([]);
    const [draftKlar, setDraftKlar] = useState<'alle' | 'ja' | 'nei'>('alle');
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      setCurrentPage(1);
    }, [city, fylke, orgnummer, klarFilter, searchQuery]);

    const { getRadioProps } = useRadioGroup({
      name: 'radio-group',
      value: draftKlar,
      onChange: (value) => setDraftKlar(value as 'alle' | 'ja' | 'nei'),
      variant: 'outline',
    });

    const sortedData = [...dummyData]
      .filter((d) => city.length === 0 || city.includes(d.sted))
      .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
      .filter((d) => orgnummer.length === 0 || orgnummer.includes(d.orgnummer))
      .filter(
        (d) =>
          klarFilter === 'alle' ||
          d.klarForGjennomforing.toLowerCase() === klarFilter,
      )
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return Object.values(d).some((v) =>
          String(v).toLowerCase().includes(q),
        );
      })
      .sort((a, b) => {
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

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });

    const rangeStart = (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, sortedData.length);
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
          gap: 20px;
        }
        .example-filters-section {
          display: flex;
          flex-direction: ${isMobile ? 'column' : 'row'};
          align-items: ${isMobile ? 'flex-start' : 'flex-end'};
          gap: var(--ds-size-4);
        }
        .example-dialog-filters {
            display: grid;
            grid-template-columns: ${isMobile ? '1fr' : '1fr 1fr'};
            gap: var(--ds-size-4);
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
        }
        .example-footer {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--ds-size-2);
        }
        .example-footer button {
          margin: 0;
        }
        `}
        </style>
        <div className="example-main">
          <Prose>
            <div className="example-filters-section">
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
                  <FunnelIcon aria-label="En tittel for skjermleser" />
                  Filtre
                </Dialog.Trigger>
                <Dialog
                  ref={dialogRef}
                  closedby="any"
                  onToggle={(e) => {
                    if ((e.target as HTMLDialogElement).open) {
                      setDraftCity(city);
                      setDraftFylke(fylke);
                      setDraftOrgnummer(orgnummer);
                      setDraftKlar(klarFilter);
                    }
                  }}
                  style={{
                    zIndex: 10,
                  }}
                >
                  <Heading>Filtre</Heading>
                  <div className="example-dialog-filters">
                    <Prose>
                      <Fieldset>
                        <Fieldset.Legend>
                          Klar for gjennomføring
                        </Fieldset.Legend>
                        <Radio label="Ja" {...getRadioProps('ja')} />
                        <Radio label="Nei" {...getRadioProps('nei')} />
                        <Radio label="Alle" {...getRadioProps('alle')} />
                      </Fieldset>
                      <Field className="example-suggestion-field">
                        <Label>Velg orgnummer</Label>
                        <Suggestion
                          {...(args as SuggestionMultipleProps)}
                          multiple
                          selected={draftOrgnummer}
                          onSelectedChange={(items) =>
                            setDraftOrgnummer(items.map((item) => item.value))
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {uniqueOrgnummers.map((org) => (
                              <Suggestion.Option
                                key={org}
                                label={org}
                                value={org}
                              >
                                {org}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                    </Prose>
                    <Prose>
                      <Field className="example-suggestion-field">
                        <Label>Velg sted</Label>
                        <Suggestion
                          {...(args as SuggestionMultipleProps)}
                          multiple
                          selected={draftCity}
                          onSelectedChange={(items) =>
                            setDraftCity(items.map((item) => item.value))
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {uniqueCities.map((c) => (
                              <Suggestion.Option key={c} label={c} value={c}>
                                {c}
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
                        setCity(draftCity);
                        setFylke(draftFylke);
                        setOrgnummer(draftOrgnummer);
                        setKlarFilter(draftKlar);
                        dialogRef.current?.close();
                      }}
                    >
                      Lagre
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setDraftCity(city);
                        setDraftFylke(fylke);
                        setDraftOrgnummer(orgnummer);
                        setDraftKlar(klarFilter);
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
                {!isMobile && (
                  <Table.HeaderCell
                    sort={sortField === 'fylke' ? sortDirection : 'none'}
                    onClick={() => handleSort('fylke')}
                  >
                    Fylke
                  </Table.HeaderCell>
                )}
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
                  {!isMobile && <Table.Cell>{row.fylke}</Table.Cell>}
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
                Rad {rangeStart}-{rangeEnd} av {sortedData.length}
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

const steder = [
  { sted: 'Oslo', fylke: 'Oslo' },
  { sted: 'Bergen', fylke: 'Vestland' },
  { sted: 'Trondheim', fylke: 'Trøndelag' },
  { sted: 'Stavanger', fylke: 'Rogaland' },
];

const fornavn = ['Rita', 'Kari', 'Ola', 'Kai'];

const dummyData = Array.from({ length: 200 }, (_, i) => {
  const { sted, fylke } = steder[i % steder.length];
  return {
    id: i + 1,
    navn: `${fornavn[i % fornavn.length]} Nordmann`,
    sted,
    fylke,
    orgnummer: String(100000000 + i),
    klarForGjennomforing: i % 3 === 0 ? 'Nei' : 'Ja',
  };
});

const uniqueCities = [...new Set(dummyData.map((d) => d.sted))];
const uniqueFylker = [...new Set(dummyData.map((d) => d.fylke))];
const uniqueOrgnummers = [...new Set(dummyData.map((d) => d.orgnummer))];
