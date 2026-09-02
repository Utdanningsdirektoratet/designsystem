import {
  type ChangeEvent,
  type HTMLAttributes,
  type SubmitEvent,
  useEffect,
  useState,
} from 'react';
import { Button } from 'src/components/button';
import { Chip } from 'src/components/chip';
import { Field } from 'src/components/field';
import { Pagination } from 'src/components/pagination';
import { Search } from 'src/components/search';
import { Select } from 'src/components/select';
import { Suggestion } from 'src/components/suggestion';
import { Switch } from 'src/components/switch';
import { Table } from 'src/components/table';
import { Tabs } from 'src/components/tabs';
import { Tag } from 'src/components/tag';
import { ToggleGroup } from 'src/components/toggleGroup';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label';
import { usePagination } from 'src/hooks/usePagination';
import classes from './DensityDemo.module.css';

const employees = [
  {
    id: 1,
    name: 'Rita Nordmann',
    email: 'rita@nordmann.no',
    role: 'Rektor',
    department: 'Ledelse',
    status: 'Aktiv',
  },
  {
    id: 2,
    name: 'Kari Nordmann',
    email: 'kari@nordmann.no',
    role: 'Lektor',
    department: 'Språkfag',
    status: 'Deaktivert',
  },
  {
    id: 3,
    name: 'Ola Nordmann',
    email: 'ola@nordmann.no',
    role: 'Lektor',
    department: 'Realfag',
    status: 'Aktiv',
  },
  {
    id: 4,
    name: 'Kai Nordmann',
    email: 'kai@nordmann.no',
    role: 'Lektor',
    department: 'Realfag',
    status: 'Aktiv',
  },
  {
    id: 5,
    name: 'Mateo Nordmann',
    email: 'mateo@nordmann.no',
    role: 'Ass. rektor',
    department: 'Ledelse',
    status: 'Deaktivert',
  },
  {
    id: 6,
    name: 'Sara Nordmann',
    email: 'sara@nordmann.no',
    role: 'Lektor',
    department: 'Språkfag',
    status: 'Aktiv',
  },
  {
    id: 7,
    name: 'Ali Nordmann',
    email: 'ali@nordmann.no',
    role: 'Rådgiver',
    department: 'Samfunnsfag',
    status: 'Aktiv',
  },
  {
    id: 8,
    name: 'Liv Nordmann',
    email: 'liv@nordmann.no',
    role: 'Lektor',
    department: 'Realfag',
    status: 'Aktiv',
  },
];

const departments = ['Ledelse', 'Realfag', 'Språkfag', 'Samfunnsfag'];

const statusColor = (status: string) => {
  return status === 'Aktiv' ? 'success' : 'warning';
};

type DensityDemoProps = HTMLAttributes<HTMLDivElement>;

export const DensityDemo = ({ className, ...props }: DensityDemoProps) => {
  const [isCompact, setIsCompact] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([
    'Ledelse',
    'Realfag',
  ]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setCurrentPage] = useState(1);
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

  const normalizedSearchQuery = searchQuery.toLocaleLowerCase('nb');
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = [employee.name, employee.email].some((value) =>
      value.toLocaleLowerCase('nb').includes(normalizedSearchQuery),
    );

    return (
      matchesSearch &&
      (roleFilter === 'all' || employee.role === roleFilter) &&
      (statusFilter === 'all' || employee.status === statusFilter) &&
      (selectedDepartments.length === 0 ||
        selectedDepartments.includes(employee.department))
    );
  });
  const totalRows = filteredEmployees.length;
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
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
    setCurrentPage(1);
  };

  const handleSearchReset = () => {
    setSearchInput('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleDepartmentsChange = (values: string[]) => {
    setSelectedDepartments(values);
    setCurrentPage(1);
  };

  return (
    <main {...props} className={`${classes.page} ${className ?? ''}`}>
      <header className={classes.header}>
        <div className={classes.heading}>
          <Heading level={1} data-size="md">
            Ansatte og tilganger
          </Heading>
          <p>Administrer brukere ved Solsiden videregående skole</p>
        </div>
        <Switch
          label="Kompakt visning"
          checked={isCompact}
          onChange={(event) => setIsCompact(event.currentTarget.checked)}
        />
      </header>

      <section
        aria-label="Ansattoversikt"
        className={classes.region}
        data-density={isCompact ? 'compact' : 'default'}
      >
        <Tabs defaultValue="employees">
          <Tabs.List>
            <Tabs.Tab value="employees">Ansatte</Tabs.Tab>
            <Tabs.Tab value="invitations">Invitasjoner</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="employees" className={classes.panel}>
            <div className={classes.toolbar}>
              <Field className={classes.search}>
                <Label>Søk etter ansatte</Label>
                <form onSubmit={handleSearchSubmit} onReset={handleSearchReset}>
                  <Search>
                    <Search.Input
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <Search.Clear onClick={handleSearchReset} />
                    <Search.Button aria-label="Søk etter ansatte" />
                  </Search>
                </form>
              </Field>
              <Button>Legg til ansatt</Button>
            </div>

            <div className={classes.filters}>
              <Field className={classes.filterControl}>
                <Label>Rolle</Label>
                <Select value={roleFilter} onChange={handleRoleChange}>
                  <Select.Option value="all">Alle roller</Select.Option>
                  <Select.Option value="Rektor">Rektor</Select.Option>
                  <Select.Option value="Ass. rektor">Ass. rektor</Select.Option>
                  <Select.Option value="Lektor">Lektor</Select.Option>
                  <Select.Option value="Rådgiver">Rådgiver</Select.Option>
                </Select>
              </Field>
              <Field className={classes.filterControl}>
                <Label>Avdelinger</Label>
                <Suggestion
                  multiple
                  display="count"
                  selected={selectedDepartments}
                  onSelectedChange={(items) =>
                    handleDepartmentsChange(items.map((item) => item.value))
                  }
                >
                  <Suggestion.Input />
                  <Suggestion.Clear />
                  <Suggestion.List>
                    <Suggestion.Empty>Ingen avdelinger</Suggestion.Empty>
                    {departments.map((department) => (
                      <Suggestion.Option
                        key={department}
                        label={department}
                        value={department}
                      >
                        {department}
                      </Suggestion.Option>
                    ))}
                  </Suggestion.List>
                </Suggestion>
              </Field>
              <ToggleGroup
                aria-label="Filtrer etter tilgangsstatus"
                className={classes.toggleGroup}
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <ToggleGroup.Item value="all">Alle</ToggleGroup.Item>
                <ToggleGroup.Item value="Aktiv">Aktive</ToggleGroup.Item>
                <ToggleGroup.Item value="Deaktivert">
                  Deaktiverte
                </ToggleGroup.Item>
              </ToggleGroup>
            </div>

            {selectedDepartments.length > 0 && (
              <div className={classes.activeFilters}>
                <Label>Avdelinger</Label>
                <ul>
                  {selectedDepartments.map((department) => (
                    <li key={department}>
                      <Chip.Removable
                        aria-label={`Fjern ${department}`}
                        onClick={() =>
                          handleDepartmentsChange(
                            selectedDepartments.filter(
                              (selectedDepartment) =>
                                selectedDepartment !== department,
                            ),
                          )
                        }
                      >
                        {department}
                      </Chip.Removable>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={classes.tableFrame}>
              <Table hover className={classes.table}>
                <caption>Ansatte ved Solsiden</caption>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>Navn</Table.HeaderCell>
                    <Table.HeaderCell>Rolle</Table.HeaderCell>
                    <Table.HeaderCell>Avdeling</Table.HeaderCell>
                    <Table.HeaderCell>E-post</Table.HeaderCell>
                    <Table.HeaderCell>Tilgang</Table.HeaderCell>
                    <Table.HeaderCell>Handling</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {paginatedEmployees.map((employee) => (
                    <Table.Row key={employee.id}>
                      <Table.Cell>{employee.name}</Table.Cell>
                      <Table.Cell>{employee.role}</Table.Cell>
                      <Table.Cell>{employee.department}</Table.Cell>
                      <Table.Cell>{employee.email}</Table.Cell>
                      <Table.Cell>
                        <Tag data-color={statusColor(employee.status)}>
                          {employee.status}
                        </Tag>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          aria-label={`Åpne ${employee.name}`}
                          variant="tertiary"
                        >
                          Åpne
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            <footer className={classes.footer}>
              <Pagination
                aria-label="Sidenavigering for ansatte"
                data-size="sm"
              >
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
              <div className={classes.paginationControls}>
                <span className={classes.subtleText}>
                  Rad {rangeStart}-{rangeEnd} av {totalRows}
                </span>
                <Field className={classes.itemsPerPage}>
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
            </footer>
          </Tabs.Panel>
          <Tabs.Panel value="invitations" className={classes.emptyState}>
            Ingen ventende invitasjoner.
          </Tabs.Panel>
        </Tabs>
      </section>
    </main>
  );
};
