import { useState } from 'react';
import { Avatar } from '../../components/avatar/Avatar';
import { Field } from '../../components/field/Field';
import { Pagination } from '../../components/pagination/Pagination';
import { Select } from '../../components/select/Select';
import { Table } from '../../components/table';
import { Tag } from '../../components/tag/Tag';
import { Label } from '../../components/typography/label/Label';
import { Paragraph } from '../../components/typography/paragraph/Paragraph';
import { STUDENTS } from '../../demo/table-demo/data/students';
import { usePagination } from '../../utilities/hooks/usePagination/usePagination';
import classes from './NumberOfRows.module.css';

export const NumberOfRows = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // oppdatere når antall studenter per side endrer seg???
  const start = (currentPage - 1) * itemsPerPage;
  const stop = start + itemsPerPage;
  const students = STUDENTS.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(STUDENTS.length / itemsPerPage);

  const pagination = usePagination({
    currentPage,
    setCurrentPage,
    totalPages,
    showPages: totalPages,
  });
  return (
    <div>
      <div>
        <Table style={{ tableLayout: 'fixed' }}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Utdanningsnivå</Table.HeaderCell>
              <Table.HeaderCell>Sist endret</Table.HeaderCell>
              <Table.HeaderCell>Telefon</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {students.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell>
                  <div className={classes.student}>
                    <Avatar
                      aria-label={
                        student.new ? `Ny elev ${student.name}` : student.name
                      }
                    />
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
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className={classes.controls}>
        <div>
          <Field className={classes.selectField}>
            <Label>Rader per side</Label>
            <Select
              defaultValue={5}
              data-size="sm"
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <Select.Option value={5}>5</Select.Option>
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={15}>15</Select.Option>
            </Select>
          </Field>
          <Paragraph className={classes.nowShowing}>
            Viser {start}-{stop} av {STUDENTS.length}
          </Paragraph>
        </div>
        <Pagination>
          <Pagination.List>
            <Pagination.Item>
              <Pagination.Button {...pagination.prevButtonProps} />
            </Pagination.Item>
            {pagination.pages.map(({ itemKey, buttonProps, page }) => (
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
              <Pagination.Button {...pagination.nextButtonProps} />
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
      </div>
    </div>
  );
};

const tagColor = (status: string) => {
  switch (status) {
    case 'Ikke eksportert':
      return 'warning';
    default:
      return 'success';
  }
};
