import { useEffect, useRef, useState } from 'react';
import { FilterIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button/Button';
import { Checkbox } from 'src/components/checkbox/Checkbox';
import { Chip } from 'src/components/chip/Chip';
import { Dialog } from 'src/components/dialog/Dialog';
import { Field } from 'src/components/field/Field';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Pagination } from 'src/components/pagination/Pagination';
import { Search } from 'src/components/search/Search';
import { Select } from 'src/components/select/Select';
import { Suggestion } from 'src/components/suggestion/Suggestion';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { Prose } from 'src/components/typography/prose/Prose';
import { useCheckboxGroup } from 'src/hooks/useCheckboxGroup/useCheckboxGroup';
import { usePagination } from 'src/hooks/usePagination/usePagination';
import dialogStyles from './filtering-dialog.module.css';
import previewStyles from './filtering-preview.module.css';
import {
  type SchoolStatus,
  schoolStatuses,
  schools,
  uniqueCounties,
  uniqueSystemNames,
  uniqueYears,
} from './schools';

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

const tableArgs = {
  zebra: true,
  stickyHeader: false,
  border: false,
  hover: false,
  tintedColumnHeader: false,
  tintedRowHeader: false,
  'data-color': 'neutral' as const,
};

const previewArgs = {
  ...tableArgs,
  suggestionDisplay: 'count' as 'count' | 'chips',
  showActiveFilters: true,
};

export const Preview = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: previewArgs,
  render: (args) => {
    const { suggestionDisplay, showActiveFilters, ...tableProps } = args;
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>(emptyFilters);
    const [isMobile, setIsMobile] = useState(
      () => !window.matchMedia('(min-width: 48rem)').matches,
    );

    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 48rem)');
      const handleChange = (event: MediaQueryListEvent) =>
        setIsMobile(!event.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleFiltersChange = (nextFilters: Filters) => {
      setFilters(nextFilters);
      setCurrentPage(1);
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredData = schools.filter((school) => {
      const matchesFilters =
        (filters.counties.length === 0 ||
          filters.counties.includes(school.county)) &&
        (filters.municipalities.length === 0 ||
          filters.municipalities.includes(school.municipality));
      if (!matchesFilters || !normalizedQuery) return matchesFilters;

      return [
        school.year,
        school.organizationNumber,
        school.schoolName,
        school.county,
        school.municipality,
        school.status,
        school.systemName,
      ].some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });
    const municipalityOptions = getMunicipalities(filters.counties);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });
    const rangeStart =
      filteredData.length === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, filteredData.length);
    const paginatedData = filteredData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return (
      <div className={previewStyles['preview-main']}>
        <div className={previewStyles['preview-filters-section']}>
          <div className={previewStyles['preview-suggestion-section']}>
            <Field className={previewStyles['preview-suggestion-field']}>
              <Label>Velg fylker</Label>
              <Suggestion
                multiple
                display={suggestionDisplay}
                selected={filters.counties}
                onSelectedChange={(items) =>
                  handleFiltersChange(
                    updateCounties(
                      filters,
                      items.map((item) => item.value),
                    ),
                  )
                }
              >
                <Suggestion.Input />
                <Suggestion.Clear />
                <Suggestion.List>
                  <Suggestion.Empty>Tomt</Suggestion.Empty>
                  {uniqueCounties.map((county) => (
                    <Suggestion.Option
                      key={county}
                      label={county}
                      value={county}
                    >
                      {county}
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            </Field>
            <Field className={previewStyles['preview-suggestion-field']}>
              <Label>Velg kommuner</Label>
              <Suggestion
                multiple
                display={suggestionDisplay}
                selected={filters.municipalities}
                onSelectedChange={(items) =>
                  handleFiltersChange({
                    ...filters,
                    municipalities: items.map((item) => item.value),
                  })
                }
              >
                <Suggestion.Input />
                <Suggestion.Clear />
                <Suggestion.List>
                  <Suggestion.Empty>Tomt</Suggestion.Empty>
                  {municipalityOptions.map((municipality) => (
                    <Suggestion.Option
                      key={municipality}
                      label={municipality}
                      value={municipality}
                    >
                      {municipality}
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            </Field>
            <Field>
              <Button
                onClick={() => handleFiltersChange(emptyFilters)}
                variant="tertiary"
                data-size="sm"
                className={previewStyles['preview-clear-filters']}
              >
                Fjern filtre
              </Button>
            </Field>
          </div>
          <Field className={previewStyles['preview-search-field']}>
            <Label>Søk</Label>
            <Search>
              <Search.Input
                aria-label="Søk"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
              />
              <Search.Clear
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
              />
            </Search>
          </Field>
        </div>

        {showActiveFilters && (
          <ActiveFilters filters={filters} onChange={handleFiltersChange} />
        )}

        <Table {...tableProps}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>År</Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['show-below-mobile']}>
                Skole
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Org.nummer
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Skolenavn
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['desktop-only']}>
                Fylke
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['desktop-only']}>
                Kommune
              </Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Systemnavn
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.year}</Table.Cell>
                <Table.Cell className={previewStyles['show-below-mobile']}>
                  {school.schoolName}
                  <br />
                  {school.organizationNumber}
                </Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {school.organizationNumber}
                </Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {school.schoolName}
                </Table.Cell>
                <Table.Cell className={previewStyles['desktop-only']}>
                  {school.county}
                </Table.Cell>
                <Table.Cell className={previewStyles['desktop-only']}>
                  {school.municipality}
                </Table.Cell>
                <Table.Cell>
                  <Status status={school.status} />
                </Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {school.systemName}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className={previewStyles['preview-controls']}>
          <Pagination aria-label="Sidenavigering" data-size="sm">
            <Pagination.List>
              <Pagination.Item>
                <Pagination.Button
                  aria-label="Forrige side"
                  {...prevButtonProps}
                />
              </Pagination.Item>
              {pages.map(({ page: pageNumber, itemKey, buttonProps }) => (
                <Pagination.Item key={itemKey}>
                  {typeof pageNumber === 'number' ? (
                    <Pagination.Button
                      {...buttonProps}
                      aria-label={`Side ${pageNumber}`}
                    >
                      {pageNumber}
                    </Pagination.Button>
                  ) : null}
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
          <div className={previewStyles['preview-controls-section']}>
            <span className={previewStyles['preview-controls-section-span']}>
              Rad {rangeStart}-{rangeEnd} av {filteredData.length}
            </span>
            <Field className={previewStyles['preview-controls-section-select']}>
              <Label>Rader per side</Label>
              <Select
                value={String(itemsPerPage)}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
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

export const CountWithoutChips = Preview.extend({
  args: { showActiveFilters: false },
});

export const ChipsDisplay = Preview.extend({
  args: {
    suggestionDisplay: 'chips',
    showActiveFilters: false,
  },
});

export const WithDialog = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: tableArgs,
  render: (args) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>(emptyFilters);
    const [draftFilters, setDraftFilters] = useState<Filters>(emptyFilters);
    const [isMobile, setIsMobile] = useState(
      () => !window.matchMedia('(min-width: 48rem)').matches,
    );
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 48rem)');
      const handleChange = (event: MediaQueryListEvent) =>
        setIsMobile(!event.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleFiltersChange = (nextFilters: Filters) => {
      setFilters(nextFilters);
      setCurrentPage(1);
    };

    const { getCheckboxProps, setValue: setCheckboxValues } = useCheckboxGroup({
      name: 'dialog-status',
      value: draftFilters.statuses,
      onChange: (statuses) =>
        setDraftFilters({
          ...draftFilters,
          statuses: statuses as SchoolStatus[],
        }),
    });

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredData = schools.filter((school) => {
      const matchesFilters =
        (filters.years.length === 0 ||
          filters.years.includes(String(school.year))) &&
        (filters.counties.length === 0 ||
          filters.counties.includes(school.county)) &&
        (filters.municipalities.length === 0 ||
          filters.municipalities.includes(school.municipality)) &&
        (filters.statuses.length === 0 ||
          filters.statuses.includes(school.status)) &&
        (filters.systemNames.length === 0 ||
          filters.systemNames.includes(school.systemName));
      if (!matchesFilters || !normalizedQuery) return matchesFilters;

      return [
        school.year,
        school.organizationNumber,
        school.schoolName,
        school.county,
        school.municipality,
        school.status,
        school.systemName,
      ].some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });

    const municipalityOptions = getMunicipalities(draftFilters.counties);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages,
      showPages: isMobile ? 3 : 6,
      setCurrentPage,
    });
    const rangeStart =
      filteredData.length === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(page * itemsPerPage, filteredData.length);
    const paginatedData = filteredData.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return (
      <div className={dialogStyles['dialog-main']}>
        <div className={dialogStyles['dialog-filters-section']}>
          <Field className={previewStyles['preview-search-field']}>
            <Label>Søk</Label>
            <Search>
              <Search.Input
                aria-label="Søk"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
              />
              <Search.Clear
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
              />
            </Search>
          </Field>
          <div className={dialogStyles['dialog-section']}>
            <Dialog.TriggerContext>
              <Dialog.Trigger variant="secondary">
                <FilterIcon aria-hidden />
                Filter
              </Dialog.Trigger>
              <Dialog
                ref={dialogRef}
                closedby="any"
                onToggle={(event) => {
                  if ((event.target as HTMLDialogElement).open) {
                    setDraftFilters(filters);
                    setCheckboxValues(filters.statuses);
                  }
                }}
              >
                <Prose>
                  <Heading>Filter</Heading>
                  <div className={dialogStyles['dialog-filters']}>
                    <div className={dialogStyles['dialog-filter-column']}>
                      <Field
                        className={previewStyles['preview-suggestion-field']}
                      >
                        <Label>År</Label>
                        <Suggestion
                          multiple
                          display="count"
                          selected={draftFilters.years}
                          onSelectedChange={(items) =>
                            setDraftFilters({
                              ...draftFilters,
                              years: items.map((item) => item.value),
                            })
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {uniqueYears.map(String).map((year) => (
                              <Suggestion.Option
                                key={year}
                                label={year}
                                value={year}
                              >
                                {year}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                      <Field
                        className={previewStyles['preview-suggestion-field']}
                      >
                        <Label>Fylke</Label>
                        <Suggestion
                          multiple
                          display="count"
                          selected={draftFilters.counties}
                          onSelectedChange={(items) =>
                            setDraftFilters(
                              updateCounties(
                                draftFilters,
                                items.map((item) => item.value),
                              ),
                            )
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {uniqueCounties.map((county) => (
                              <Suggestion.Option
                                key={county}
                                label={county}
                                value={county}
                              >
                                {county}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                      <Field
                        className={previewStyles['preview-suggestion-field']}
                      >
                        <Label>Kommune</Label>
                        <Suggestion
                          multiple
                          display="count"
                          selected={draftFilters.municipalities}
                          onSelectedChange={(items) =>
                            setDraftFilters({
                              ...draftFilters,
                              municipalities: items.map((item) => item.value),
                            })
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {municipalityOptions.map((municipality) => (
                              <Suggestion.Option
                                key={municipality}
                                label={municipality}
                                value={municipality}
                              >
                                {municipality}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                    </div>
                    <div className={dialogStyles['dialog-filter-column']}>
                      <Fieldset>
                        <Fieldset.Legend>Status</Fieldset.Legend>
                        {schoolStatuses.map((status) => (
                          <Checkbox
                            key={status}
                            label={status}
                            {...getCheckboxProps(status)}
                          />
                        ))}
                      </Fieldset>
                      <Field
                        className={previewStyles['preview-suggestion-field']}
                      >
                        <Label>Systemnavn</Label>
                        <Suggestion
                          multiple
                          display="count"
                          selected={draftFilters.systemNames}
                          onSelectedChange={(items) =>
                            setDraftFilters({
                              ...draftFilters,
                              systemNames: items.map((item) => item.value),
                            })
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {uniqueSystemNames.map((systemName) => (
                              <Suggestion.Option
                                key={systemName}
                                label={systemName}
                                value={systemName}
                              >
                                {systemName}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                    </div>
                  </div>
                  <div className={dialogStyles['dialog-footer']}>
                    <Button
                      onClick={() => {
                        handleFiltersChange(draftFilters);
                        dialogRef.current?.close();
                      }}
                    >
                      Lagre
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setDraftFilters(filters);
                        dialogRef.current?.close();
                      }}
                    >
                      Avbryt
                    </Button>
                  </div>
                </Prose>
              </Dialog>
            </Dialog.TriggerContext>
            <Button
              onClick={() => handleFiltersChange(emptyFilters)}
              variant="tertiary"
              data-size="sm"
              className={dialogStyles['dialog-clear-filters']}
            >
              Fjern filtre
            </Button>
          </div>
        </div>

        <ActiveFilters filters={filters} onChange={handleFiltersChange} />

        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>År</Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['show-below-mobile']}>
                Skole
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['hide-below-mobile']}>
                Org.nummer
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['hide-below-mobile']}>
                Skolenavn
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['desktop-only']}>
                Fylke
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['desktop-only']}>
                Kommune
              </Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['hide-below-mobile']}>
                Systemnavn
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.year}</Table.Cell>
                <Table.Cell className={dialogStyles['show-below-mobile']}>
                  {school.schoolName}
                  <br />
                  {school.organizationNumber}
                </Table.Cell>
                <Table.Cell className={dialogStyles['hide-below-mobile']}>
                  {school.organizationNumber}
                </Table.Cell>
                <Table.Cell className={dialogStyles['hide-below-mobile']}>
                  {school.schoolName}
                </Table.Cell>
                <Table.Cell className={dialogStyles['desktop-only']}>
                  {school.county}
                </Table.Cell>
                <Table.Cell className={dialogStyles['desktop-only']}>
                  {school.municipality}
                </Table.Cell>
                <Table.Cell>
                  <Status status={school.status} />
                </Table.Cell>
                <Table.Cell className={dialogStyles['hide-below-mobile']}>
                  {school.systemName}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className={dialogStyles['dialog-controls']}>
          <Pagination aria-label="Sidenavigering" data-size="sm">
            <Pagination.List>
              <Pagination.Item>
                <Pagination.Button
                  aria-label="Forrige side"
                  {...prevButtonProps}
                />
              </Pagination.Item>
              {pages.map(({ page: pageNumber, itemKey, buttonProps }) => (
                <Pagination.Item key={itemKey}>
                  {typeof pageNumber === 'number' ? (
                    <Pagination.Button
                      {...buttonProps}
                      aria-label={`Side ${pageNumber}`}
                    >
                      {pageNumber}
                    </Pagination.Button>
                  ) : null}
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
          <div className={dialogStyles['dialog-controls-section']}>
            <span className={dialogStyles['dialog-controls-section-span']}>
              Rad {rangeStart}-{rangeEnd} av {filteredData.length}
            </span>
            <Field className={dialogStyles['dialog-controls-section-select']}>
              <Label>Rader per side</Label>
              <Select
                value={String(itemsPerPage)}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
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

type Filters = {
  years: string[];
  counties: string[];
  municipalities: string[];
  statuses: SchoolStatus[];
  systemNames: string[];
};

const emptyFilters: Filters = {
  years: [],
  counties: [],
  municipalities: [],
  statuses: [],
  systemNames: [],
};

function getMunicipalities(counties: string[]) {
  return [
    ...new Set(
      schools
        .filter(
          (school) => counties.length === 0 || counties.includes(school.county),
        )
        .map((school) => school.municipality),
    ),
  ].sort();
}

function updateCounties(filters: Filters, counties: string[]): Filters {
  const municipalities = getMunicipalities(counties);

  return {
    ...filters,
    counties,
    municipalities: filters.municipalities.filter((municipality) =>
      municipalities.includes(municipality),
    ),
  };
}

function ActiveFilters({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const groups = [
    filters.years.length > 0
      ? { label: 'År', values: filters.years, key: 'years' as const }
      : null,
    filters.counties.length > 0
      ? { label: 'Fylke', values: filters.counties, key: 'counties' as const }
      : null,
    filters.municipalities.length > 0
      ? {
          label: 'Kommune',
          values: filters.municipalities,
          key: 'municipalities' as const,
        }
      : null,
    filters.statuses.length > 0
      ? { label: 'Status', values: filters.statuses, key: 'statuses' as const }
      : null,
    filters.systemNames.length > 0
      ? {
          label: 'Systemnavn',
          values: filters.systemNames,
          key: 'systemNames' as const,
        }
      : null,
  ].filter((group) => group !== null);

  if (groups.length === 0) return null;

  return (
    <div className={previewStyles['preview-active-filters']}>
      {groups.map((group) => (
        <div
          className={previewStyles['preview-active-filters-group']}
          key={group.key}
        >
          <Label>{group.label}</Label>
          <ul>
            {group.values.map((value) => (
              <li key={value}>
                <Chip.Removable
                  aria-label={`Fjern ${value}`}
                  onClick={() => {
                    if (group.key === 'counties') {
                      onChange(
                        updateCounties(
                          filters,
                          filters.counties.filter((county) => county !== value),
                        ),
                      );
                      return;
                    }

                    onChange({
                      ...filters,
                      [group.key]: filters[group.key].filter(
                        (item) => item !== value,
                      ),
                    });
                  }}
                >
                  {value}
                </Chip.Removable>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Status({ status }: { status: SchoolStatus }) {
  const color =
    status === 'Ferdig'
      ? 'success'
      : status === 'Behandles'
        ? 'warning'
        : 'danger';

  return (
    <span className={previewStyles['preview-status']}>
      <span
        aria-hidden
        className={previewStyles['preview-status-dot']}
        data-color={color}
      />
      {status}
    </span>
  );
}
