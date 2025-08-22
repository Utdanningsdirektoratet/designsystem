import { HTMLAttributes, useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Checkbox,
  Chip,
  Divider,
  ErrorSummary,
  Heading,
  Label,
  Search,
  Table,
  Tag,
  useCheckboxGroup,
} from '@udir-design/react/alpha';
import classes from './TableDemo.module.css';
import cl from 'clsx/lite';
import { Student, STUDENTS } from './data/students';
import PaginationControls from './components/PaginationControls';
import useSortableData from './utilities/useSortableData';
import { useFilterData } from './utilities/useFilterData';
import { ExportDialog } from './components/ExportDialog';
import { DeleteDialog } from './components/DeleteDialog';

type TableDemoProps = HTMLAttributes<HTMLDivElement>;

export const TableDemo = ({ ...props }: TableDemoProps) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const levels = ['Barnehage', 'Grunnskole', 'Videregående'];

  // Merge selected students from different pages.
  const handleCheckboxChange = (newSelectedStudentIds: string[]) => {
    setShowErrorSummary(false);
    const currentPageIds = currentUsers.map((student) => student.id.toString());
    const filteredPrev = selectedStudentIds.filter(
      (val) => !currentPageIds.includes(val),
    );
    setSelectedStudentIds([...filteredPrev, ...newSelectedStudentIds]);
  };

  const { getCheckboxProps } = useCheckboxGroup({
    name: 'my-checkbox',
    value: selectedStudentIds,
    onChange: handleCheckboxChange,
    error: showErrorSummary,
  });

  // Hook for filtering the users.
  const {
    filteredData: filteredByEducation,
    filters,
    updateFilter,
  } = useFilterData(students, { educationLevel: levels });

  // Handle the change of the education filter.
  const handleEducationFilterChange = (level: string) => {
    const currentFilter = filters.educationLevel as string[];
    if (currentFilter.includes(level)) {
      updateFilter(
        'educationLevel',
        currentFilter.filter((filterItem) => filterItem !== level),
      );
    } else {
      updateFilter('educationLevel', [...currentFilter, level]);
    }
    setCurrentPage(1);
  };

  // Filter users based on the search query.
  const filteredStudents = useMemo(() => {
    return searchQuery
      ? filteredByEducation.filter(
          (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.phone.includes(searchQuery),
        )
      : filteredByEducation;
  }, [searchQuery, filteredByEducation]);

  // Hook for sorting the users.
  const { sortedData, sortField, sortDirection, handleSort } =
    useSortableData(filteredStudents);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Get the users for the current page from the sorted list.
  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedData]);

  const isStudentsSelected = selectedStudentIds.length > 0;

  // Handler to delete a student by id.
  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  // Handler to export the selected students.
  const handleExport = (
    dialogExportRef: React.RefObject<HTMLDialogElement | null>,
  ) => {
    if (!isStudentsSelected) {
      setShowErrorSummary(true);
    } else {
      setShowErrorSummary(false);
      dialogExportRef.current?.showModal();
    }
  };

  return (
    <div {...props}>
      <div className={cl(classes.card)}>
        <Alert>Elevlisten vil bli oppdatert ved semesterstart.</Alert>
        <Heading data-size="md" className={classes.cardTitle}>
          Elevliste
        </Heading>
        <Divider />
        <div className={classes.tableHeader}>
          <div>
            <Label>Filtrer på utdanningsnivå</Label>
            <div
              style={{
                display: 'flex',
                gap: 'var(--ds-size-2)',
                marginTop: 'var(--ds-size-2)',
              }}
            >
              {levels.map((level) => (
                <Chip.Checkbox
                  key={level}
                  value={level}
                  defaultChecked
                  onChange={(e) => handleEducationFilterChange(e.target.value)}
                >
                  {level}
                </Chip.Checkbox>
              ))}
            </div>
          </div>
          <Search className={classes.tableSearch}>
            <Search.Input
              name="search"
              aria-label="Søk"
              placeholder="Søk"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search.Clear onClick={() => setSearchQuery('')} />
          </Search>
        </div>
        <div className={classes.tableContainer}>
          <Table border className={classes.table}>
            <Table.Head>
              <Table.Row className={classes.row}>
                <Table.HeaderCell>
                  <Checkbox
                    id="checkbox-select-all"
                    aria-label="Select all"
                    {...getCheckboxProps({
                      allowIndeterminate: true,
                      value: 'all',
                    })}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell
                  sort={sortField === 'name' ? sortDirection : 'none'}
                  onClick={() => handleSort('name')}
                >
                  Navn
                </Table.HeaderCell>
                <Table.HeaderCell
                  sort={sortField === 'educationLevel' ? sortDirection : 'none'}
                  onClick={() => handleSort('educationLevel')}
                >
                  Utdanningsnivå
                </Table.HeaderCell>
                <Table.HeaderCell>Sist endret</Table.HeaderCell>
                <Table.HeaderCell>Telefon</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Slett</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {currentUsers.map((student) => (
                <Table.Row className={classes.row} key={student.id}>
                  <Table.Cell>
                    <Checkbox
                      id={'checkbox-' + student.id}
                      aria-label={'Check ' + student.name}
                      {...getCheckboxProps({
                        value: student.id.toString(),
                      })}
                      checked={selectedStudentIds.includes(
                        student.id.toString(),
                      )}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className={classes.student}>
                      <Badge.Position placement="top-right" overlap="circle">
                        {student.new && (
                          <Badge data-color="accent" data-size="md" />
                        )}
                        <Avatar
                          aria-label={
                            student.new
                              ? `Ny elev ${student.name}`
                              : student.name
                          }
                        />
                      </Badge.Position>
                      {student.name}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{student.educationLevel}</Table.Cell>
                  <Table.Cell>{student.edited}</Table.Cell>
                  <Table.Cell>{student.phone}</Table.Cell>
                  <Table.Cell>
                    <Tag data-color={tagColor(student.status)}>
                      {student.status}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteDialog
                      student={student}
                      handleDelete={handleDelete}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className={classes.tableFooter}>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <ExportDialog handleExport={handleExport} />
        </div>
        {showErrorSummary && (
          <ErrorSummary>
            <ErrorSummary.Heading>
              For å eksportere liste må du gjøre følgende:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              <ErrorSummary.Item>
                <ErrorSummary.Link href="#checkbox-select-all">
                  Velge studenter som skal eksporteres
                </ErrorSummary.Link>
              </ErrorSummary.Item>
            </ErrorSummary.List>
          </ErrorSummary>
        )}
      </div>
    </div>
  );
};

const tagColor = (status: string) => {
  switch (status) {
    case 'Ny':
      return 'info';
    case 'Eksportert':
      return 'success';
    case 'Ikke eksportert':
      return 'warning';
    default:
      return 'info';
  }
};
