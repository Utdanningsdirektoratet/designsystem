import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Table, TableHeaderCellProps, Textfield } from '../alpha';
import { useState } from 'react';
import { useCheckboxGroup } from '../../alpha';

const meta: Meta<typeof Table> = {
  component: Table,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Preview: Story = {
  args: {
    zebra: true,
    stickyHeader: false,
    border: true,
    hover: true,
  },
  render: (args) => {
    return (
      <Table {...args}>
        <caption>Table caption</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell>Header 2</Table.HeaderCell>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell 1</Table.Cell>
            <Table.Cell>Cell 2</Table.Cell>
            <Table.Cell>Cell 3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell 4</Table.Cell>
            <Table.Cell>Cell 5</Table.Cell>
            <Table.Cell>Cell 6</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell>Footer 1</Table.Cell>
            <Table.Cell>Footer 2</Table.Cell>
            <Table.Cell>Footer 3</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    );
  },
};

const dummyData = [
  {
    id: 1,
    navn: 'Lise Nordmann',
    epost: 'lise@nordmann.no',
    telefon: '22345678',
  },
  {
    id: 2,
    navn: 'Kari Nordmann',
    epost: 'kari@nordmann.no',
    telefon: '87654321',
  },
  {
    id: 3,
    navn: 'Ola Nordmann',
    epost: 'ola@nordmann.no',
    telefon: '32345678',
  },
  {
    id: 4,
    navn: 'Per Nordmann',
    epost: 'per@nordmann.no',
    telefon: '12345678',
  },
];

export const Sortable: Story = {
  render: function Render(args) {
    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps['sort']>(undefined);

    const handleSort = (field: keyof (typeof dummyData)[0]) => {
      if (sortField === field && sortDirection === 'descending') {
        setSortField(null);
        setSortDirection(undefined);
      } else {
        setSortField(field);
        setSortDirection(
          sortField === field && sortDirection === 'ascending'
            ? 'descending'
            : 'ascending'
        );
      }
    };

    const sortedData = [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField])
        return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    });

    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              sort={sortField === 'navn' ? sortDirection : 'none'}
              onClick={() => handleSort('navn')}
            >
              Navn
            </Table.HeaderCell>
            <Table.HeaderCell>Epost</Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'telefon' ? sortDirection : 'none'}
              onClick={() => handleSort('telefon')}
            >
              Telefon
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.navn}</Table.Cell>
              <Table.Cell>{row.epost}</Table.Cell>
              <Table.Cell>{row.telefon}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const StickyHeader: Story = {
  args: {
    tabIndex: 0,
    stickyHeader: true,
  },
  parameters: {
    customStyles: { height: '280px', overflow: 'auto', padding: 0 },
  },
  render: (args) => {
    const rows = Array.from({ length: 50 }, (_, i) => i + 1);
    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell>Header 2</Table.HeaderCell>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row}>
              <Table.Cell>{`Cell ${row}1`}</Table.Cell>
              <Table.Cell>{`Cell ${row}2`}</Table.Cell>
              <Table.Cell>{`Cell ${row}3`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const WithFormElements: Story = {
  render: function Render(args) {
    const { getCheckboxProps } = useCheckboxGroup({
      name: 'my-checkbox',
      value: ['2'],
    });

    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                aria-label="Select all"
                {
                  ...(getCheckboxProps({
                    allowIndeterminate: true,
                  }) as object) /* TODO: remove "as object" after next.49*/
                }
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell>Header 2</Table.HeaderCell>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[1, 2, 3].map((row) => (
            <Table.Row key={row}>
              <Table.Cell>
                <Checkbox
                  aria-label={`Check ${row}`}
                  {
                    ...(getCheckboxProps(
                      String(row)
                    ) as object) /* TODO: remove "as object" after next.49*/
                  }
                />
              </Table.Cell>
              <Table.Cell>{row}</Table.Cell>
              <Table.Cell>{row}</Table.Cell>
              <Table.Cell>
                <Textfield data-size="sm" aria-label={`Textfield ${row}`} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const FixedTable: Story = {
  render: (args) => {
    const rows = Array.from({ length: 3 }, (_, i) => i + 1);
    return (
      <Table
        {...args}
        style={{
          tableLayout: 'fixed',
        }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell>Header 2</Table.HeaderCell>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row}>
              <Table.Cell>{`Cell ${row}1`}</Table.Cell>
              <Table.Cell>{`Cell ${row}2`}</Table.Cell>
              <Table.Cell>{`Cell ${row}3`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const MultipleHeaderRows: Story = {
  render: (args) => {
    const rows = Array.from({ length: 50 }, (_, i) => i + 1);
    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Header 1</Table.HeaderCell>
            <Table.HeaderCell colSpan={2}>Header 2</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Header 3</Table.HeaderCell>
            <Table.HeaderCell>Header 4</Table.HeaderCell>
            <Table.HeaderCell>Header 5</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row}>
              <Table.Cell>{`Cell ${row}1`}</Table.Cell>
              <Table.Cell>{`Cell ${row}2`}</Table.Cell>
              <Table.Cell>{`Cell ${row}3`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const WithBorder: Story = {
  args: {
    border: true,
  },
  render: (args) => {
    const rows = Array.from({ length: 3 }, (_, i) => i + 1);
    return (
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Table {...args}>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row}>
                <Table.Cell>{`Cell ${row}1`}</Table.Cell>
                <Table.Cell>{`Cell ${row}2`}</Table.Cell>
                <Table.Cell>{`Cell ${row}3`}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row}>
                <Table.Cell>{`Cell ${row}1`}</Table.Cell>
                <Table.Cell>{`Cell ${row}2`}</Table.Cell>
                <Table.Cell>{`Cell ${row}3`}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Header 3</Table.HeaderCell>
              <Table.HeaderCell>Header 4</Table.HeaderCell>
              <Table.HeaderCell>Header 5</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row}>
                <Table.Cell>{`Cell ${row}1`}</Table.Cell>
                <Table.Cell>{`Cell ${row}2`}</Table.Cell>
                <Table.Cell>{`Cell ${row}3`}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Table {...args}>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row}>
                <Table.Cell>{`Cell ${row}1`}</Table.Cell>
                <Table.Cell>{`Cell ${row}2`}</Table.Cell>
                <Table.Cell>{`Cell ${row}3`}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Foot>
            <Table.Row>
              <Table.HeaderCell>Footer 1</Table.HeaderCell>
              <Table.HeaderCell>Footer 2</Table.HeaderCell>
              <Table.HeaderCell>Footer 3</Table.HeaderCell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </div>
    );
  },
};
