import { useState } from 'react';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Table, type TableHeaderCellProps } from 'src/components/table';
import { Table as FakeTable } from 'src/components/table/docs/FakeTable';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [
    withResponsiveDataSize,
    (Story, context) => {
      const isInDocsPage =
        window.parent.location.search.includes('viewMode=docs');
      if (isInDocsPage) {
        context.viewMode = 'docs';
      }
      return <Story />;
    },
  ],
});

export const Preview = meta.story({
  args: {
    zebra: true,
    stickyHeader: false,
    border: false,
    hover: false,
    tintedColumnHeader: false,
    tintedRowHeader: false,
    'data-color': 'neutral',
  },
  parameters: { docs: advancedCodeDocs },
  render: (args) => {
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
            : 'ascending',
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
      <div style={{ margin: '20px' }}>
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
              <Table.HeaderCell
                sort={sortField === 'orgnummer' ? sortDirection : 'none'}
                onClick={() => handleSort('orgnummer')}
              >
                Orgnummer
              </Table.HeaderCell>
              <Table.HeaderCell>Klar for gjennomføring</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {sortedData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.navn}</Table.Cell>
                <Table.Cell>{row.sted}</Table.Cell>
                <Table.Cell>{row.orgnummer}</Table.Cell>
                <Table.Cell>{row.klarForGjennomforing}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
});

const steder = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'];
const fornavn = ['Rita', 'Kari', 'Ola', 'Kai'];

const dummyData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  navn: `${fornavn[i % fornavn.length]} Nordmann`,
  sted: steder[i % steder.length],
  orgnummer: String(100000000 + i),
  klarForGjennomforing: i % 3 === 0 ? 'Nei' : 'Ja',
}));
