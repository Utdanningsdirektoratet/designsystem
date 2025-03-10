import { HTMLAttributes, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dialog,
  Field,
  Heading,
  Label,
  Search,
  Select,
  Table,
  Tag,
  Tooltip,
  useCheckboxGroup,
} from '../../alpha';
import classes from './showcase.module.css';
import cl from 'clsx/lite';
import { Student, STUDENTS } from './data/students';
import PaginationControls from './PaginationControls';
import useSortableData from './utilities/useSortableData';
import { useFilterData } from './utilities/useFilterData';
import { TrashFillIcon } from '@navikt/aksel-icons';

type TableDemoProps = HTMLAttributes<HTMLDivElement>;

export const TableDemo = ({ ...props }: TableDemoProps) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(STUDENTS);

  const { getCheckboxProps, value: selectedValues } = useCheckboxGroup({
    name: 'my-checkbox',
  });

  // Hook for filtering the users.
  const { filteredData: filteredByEducation, updateFilter } =
    useFilterData(students);

  // Handle the change of the education filter.
  const handleEducationFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateFilter('utdanningsnivå', e.target.value);
    setCurrentPage(1);
  };

  // Filter users based on the search query.
  const filteredStudents = useMemo(() => {
    return searchQuery
      ? filteredByEducation.filter(
          (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.phone.includes(searchQuery)
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

  const isButtonDisabled = selectedValues.length === 0;

  // Handler to delete a student by id.
  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const numNewStudents = students.filter(
    (student) => student.status === 'Ny'
  ).length;

  return (
    <div {...props}>
      <div className={cl(classes.card, classes.tableContainer)}>
        <Badge.Position placement="top-right">
          <Badge count={numNewStudents} data-color="support1" />
          <Heading className={classes.cardTitle}>Studenter</Heading>
        </Badge.Position>
        <div className={classes.tableHeader}>
          <div className={classes.tableAction}>
            <Field>
              <Label>Velg utdanningsnivå</Label>
              <Select
                aria-label="Velg utdanningsnivå"
                onChange={handleEducationFilterChange}
              >
                <Select.Option value="blank">Alle nivåer</Select.Option>
                <Select.Option value="Barneskole">Barneskole</Select.Option>
                <Select.Option value="Ungdomsskole">Ungdomsskole</Select.Option>
                <Select.Option value="Videregående skole">
                  Videregående skole
                </Select.Option>
              </Select>
            </Field>
          </div>
          <Search className={classes.tableSearch}>
            <Search.Input
              aria-label="Søk"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search.Clear onClick={() => setSearchQuery('')} />
          </Search>
        </div>

        <Table border className={classes.table}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox
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
                sort={sortField === 'utdanningsnivå' ? sortDirection : 'none'}
                onClick={() => handleSort('utdanningsnivå')}
              >
                Utdanningsnivå
              </Table.HeaderCell>
              <Table.HeaderCell>Epost</Table.HeaderCell>
              <Table.HeaderCell>Telefon</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Slett</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {currentUsers.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell>
                  <Checkbox
                    aria-label={'Check ' + student.name}
                    // {...getCheckboxProps({
                    //   value: student.id.toString(),
                    // })}
                  />
                </Table.Cell>
                <Table.Cell className={classes.tableCell}>
                  <Avatar aria-label={student.avatarLabel} />
                  {student.name}
                </Table.Cell>
                <Table.Cell>{student.utdanningsnivå}</Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.phone}</Table.Cell>
                <Table.Cell>
                  <Tag data-color={tagColor(student.status)}>
                    {student.status}
                  </Tag>
                </Table.Cell>

                <Table.Cell>
                  <Dialog.TriggerContext>
                    <Tooltip content="Slett">
                      <Dialog.Trigger
                        data-color="danger"
                        icon
                        variant="tertiary"
                        aria-label="Slett"
                      >
                        <TrashFillIcon />
                      </Dialog.Trigger>
                    </Tooltip>
                    <Dialog ref={dialogRef}>
                      <Dialog.Block>
                        <Heading data-size="xs">
                          Er du sikker på at du vil slette {student.name}?
                        </Heading>
                      </Dialog.Block>
                      <Dialog.Block className={classes.dialogActions}>
                        <Button
                          data-color="danger"
                          onClick={() => handleDelete(student.id)}
                        >
                          Slett
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => dialogRef.current?.close()}
                        >
                          Avbryt
                        </Button>
                      </Dialog.Block>
                    </Dialog>
                  </Dialog.TriggerContext>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className={classes.tableFooter}>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <Button disabled={isButtonDisabled}>Eksporter</Button>
        </div>
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
