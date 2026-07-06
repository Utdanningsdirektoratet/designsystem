import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import {
  grades,
  uniqueEmner as emner,
  uniqueFylker as fylker,
} from '../grades';
import dialogStyles from './filtering-dialog.module.css';
import previewStyles from './filtering-preview.module.css';

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
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(
      () => !window.matchMedia('(min-width: 48rem)').matches,
    );

    useEffect(() => {
      const mq = window.matchMedia('(min-width: 48rem)');
      const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);

    const [emne, setEmne] = useState<string[]>([]);
    const [fylke, setFylke] = useState<string[]>([]);

    const handleClearFilters = () => {
      setEmne([]);
      setFylke([]);
    };

    useEffect(() => {
      setCurrentPage(1);
    }, [emne, fylke, searchQuery]);

    const filteredData = grades
      .filter((d) => emne.length === 0 || emne.includes(d.emne))
      .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return [
          d.fylke,
          d.emne,
          d.antallelever,
          d.standpunktkarakter,
          d.muntligkarakter,
          d.skriftligkarakter,
        ].some((v) => String(v).toLowerCase().includes(q));
      });

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
                  {fylker.map((option) => (
                    <Suggestion.Option
                      key={option}
                      label={option}
                      value={option}
                    >
                      {option}
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            </Field>
            <Field className={previewStyles['preview-suggestion-field']}>
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
                  {emner.map((option) => (
                    <Suggestion.Option
                      key={option}
                      label={option}
                      value={option}
                    >
                      {option}
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            </Field>
            <Field>
              <Button
                onClick={handleClearFilters}
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search.Clear onClick={() => setSearchQuery('')} />
            </Search>
          </Field>
        </div>
        <ActiveFilters
          emne={emne}
          setEmne={setEmne}
          fylke={fylke}
          setFylke={setFylke}
        />
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell className={previewStyles['show-below-mobile']}>
                Fylke, emne
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Fylke
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Emne
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['desktop-only']}>
                Antall elever
              </Table.HeaderCell>
              <Table.HeaderCell>Standpunkt</Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Muntlig
              </Table.HeaderCell>
              <Table.HeaderCell className={previewStyles['hide-below-mobile']}>
                Skriftlig
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell className={previewStyles['show-below-mobile']}>
                  {row.fylke}, <br /> {row.emne}
                </Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {row.fylke}
                </Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {row.emne}
                </Table.Cell>
                <Table.Cell className={previewStyles['desktop-only']}>
                  {row.antallelever}
                </Table.Cell>
                <Table.Cell>{row.standpunktkarakter}</Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {row.muntligkarakter}
                </Table.Cell>
                <Table.Cell className={previewStyles['hide-below-mobile']}>
                  {row.skriftligkarakter}
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

export const WithDialog = meta.story({
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
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(
      () => !window.matchMedia('(min-width: 48rem)').matches,
    );

    useEffect(() => {
      const mq = window.matchMedia('(min-width: 48rem)');
      const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);

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
      setCurrentPage(1);
    }, [emne, fylke, eksamen, searchQuery]);

    const handleClearFilters = () => {
      setEmne([]);
      setFylke([]);
    };

    const { getCheckboxProps } = useCheckboxGroup({
      name: 'checkbox-group',
      value: draftEksamen,
      onChange: (value) => setDraftEksamen(value),
    });

    const filteredData = grades
      .filter((d) => emne.length === 0 || emne.includes(d.emne))
      .filter((d) => fylke.length === 0 || fylke.includes(d.fylke))
      .filter((d) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return [
          d.fylke,
          d.emne,
          d.antallelever,
          d.standpunktkarakter,
          d.muntligkarakter,
          d.skriftligkarakter,
        ].some((v) => String(v).toLowerCase().includes(q));
      });

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
          <div className={dialogStyles['dialog-section']}>
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
                <Prose>
                  <Heading>Filter</Heading>
                  <div className={dialogStyles['dialog-filters']}>
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
                      <Field
                        className={dialogStyles['dialog-suggestion-field']}
                      >
                        <Label>Velg emner</Label>
                        <Suggestion
                          multiple
                          display="count"
                          selected={draftEmne}
                          onSelectedChange={(items) =>
                            setDraftEmne(items.map((item) => item.value))
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {emner.map((option) => (
                              <Suggestion.Option
                                key={option}
                                label={option}
                                value={option}
                              >
                                {option}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                      <Field
                        className={dialogStyles['dialog-suggestion-field']}
                      >
                        <Label>Velg fylker</Label>
                        <Suggestion
                          multiple
                          display="count"
                          selected={draftFylke}
                          onSelectedChange={(items) =>
                            setDraftFylke(items.map((item) => item.value))
                          }
                        >
                          <Suggestion.Input />
                          <Suggestion.Clear />
                          <Suggestion.List>
                            <Suggestion.Empty>Tomt</Suggestion.Empty>
                            {fylker.map((option) => (
                              <Suggestion.Option
                                key={option}
                                label={option}
                                value={option}
                              >
                                {option}
                              </Suggestion.Option>
                            ))}
                          </Suggestion.List>
                        </Suggestion>
                      </Field>
                    </Prose>
                  </div>
                  <div className={dialogStyles['dialog-footer']}>
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
                  </div>
                </Prose>
              </Dialog>
            </Dialog.TriggerContext>
            <Button
              onClick={handleClearFilters}
              variant="tertiary"
              data-size="sm"
              className={dialogStyles['dialog-clear-filters']}
            >
              Fjern filtre
            </Button>
          </div>
        </div>

        <ActiveFilters
          emne={emne}
          setEmne={setEmne}
          fylke={fylke}
          setFylke={setFylke}
        />
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell className={dialogStyles['show-below-mobile']}>
                Fylke, emne
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['hide-below-mobile']}>
                Fylke
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['hide-below-mobile']}>
                Emne
              </Table.HeaderCell>
              <Table.HeaderCell className={dialogStyles['desktop-only']}>
                Antall elever
              </Table.HeaderCell>
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
                <Table.Cell className={dialogStyles['show-below-mobile']}>
                  {row.fylke}, <br /> {row.emne}
                </Table.Cell>
                <Table.Cell className={dialogStyles['hide-below-mobile']}>
                  {row.fylke}
                </Table.Cell>
                <Table.Cell className={dialogStyles['hide-below-mobile']}>
                  {row.emne}
                </Table.Cell>
                <Table.Cell className={dialogStyles['desktop-only']}>
                  {row.antallelever}
                </Table.Cell>
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
        <div className={dialogStyles['dialog-controls']}>
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

function ActiveFilters({
  emne,
  setEmne,
  fylke,
  setFylke,
}: {
  emne: string[];
  setEmne: Dispatch<SetStateAction<string[]>>;
  fylke: string[];
  setFylke: Dispatch<SetStateAction<string[]>>;
}) {
  if (emne.length === 0 && fylke.length === 0) return null;
  return (
    <div className={previewStyles['preview-active-filters']}>
      {fylke.length > 0 && (
        <div className={previewStyles['preview-active-filters-group']}>
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
        <div className={previewStyles['preview-active-filters-group']}>
          <Label>Emne</Label>
          <ul>
            {emne.map((e) => (
              <li key={e}>
                <Chip.Removable
                  aria-label={`Fjern ${e}`}
                  onClick={() => setEmne((prev) => prev.filter((v) => v !== e))}
                >
                  {e}
                </Chip.Removable>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
