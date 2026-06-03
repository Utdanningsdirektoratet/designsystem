import { useMemo, useState } from 'react';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Table, type TableHeaderCellProps } from 'src/components/table';

type Data = {
  id: string;
  emne: string;
  muntligkarakter: string;
  eleverMuntlig: number;
  skriftligkarakter: string;
  eleverSkriftlig: number;
  standpunktkarakter: string;
  antallelever: number;
};

type SortDirection = Exclude<TableHeaderCellProps['sort'], 'none'> | undefined;
type SortField =
  | 'emne'
  | 'muntligkarakter'
  | 'eleverMuntlig'
  | 'skriftligkarakter'
  | 'eleverSkriftlig'
  | 'standpunktkarakter'
  | 'antallelever';

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
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] =
      useState<SortDirection>(undefined);

    const handleSort = (field: SortField) => {
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

    const getSortValue = (row: Data, field: SortField): number | string => {
      if (field === 'emne') return row.emne;
      if (field === 'muntligkarakter') return Number(row.muntligkarakter);
      if (field === 'skriftligkarakter') return Number(row.skriftligkarakter);
      if (field === 'eleverMuntlig') return Number(row.eleverMuntlig);
      if (field === 'eleverSkriftlig') return Number(row.eleverSkriftlig);
      if (field === 'standpunktkarakter') return Number(row.standpunktkarakter);
      if (field === 'antallelever') return Number(row.antallelever);
      return 0;
    };

    const sortedData = useMemo(() => {
      return [...grades].sort((a, b) => {
        if (sortField === null) return 0;
        const aValue = getSortValue(a, sortField);
        const bValue = getSortValue(b, sortField);

        if (aValue < bValue) return sortDirection === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'ascending' ? 1 : -1;
        return 0;
      });
    }, [sortField, sortDirection]);

    return (
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              sort={sortField === 'emne' ? sortDirection : 'none'}
              onClick={() => handleSort('emne')}
            >
              Emne
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'muntligkarakter' ? sortDirection : 'none'}
              onClick={() => handleSort('muntligkarakter')}
            >
              Muntlig karakter
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'eleverMuntlig' ? sortDirection : 'none'}
              onClick={() => handleSort('eleverMuntlig')}
            >
              Antall elever
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'skriftligkarakter' ? sortDirection : 'none'}
              onClick={() => handleSort('skriftligkarakter')}
            >
              Skriftlig karakter
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'eleverSkriftlig' ? sortDirection : 'none'}
              onClick={() => handleSort('eleverSkriftlig')}
            >
              Antall elever
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'standpunktkarakter' ? sortDirection : 'none'}
              onClick={() => handleSort('standpunktkarakter')}
            >
              Standpunkt
            </Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === 'antallelever' ? sortDirection : 'none'}
              onClick={() => handleSort('antallelever')}
            >
              Antall elever
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.emne}</Table.Cell>
              <Table.Cell>{row.muntligkarakter}</Table.Cell>
              <Table.Cell>{row.eleverMuntlig}</Table.Cell>
              <Table.Cell>{row.skriftligkarakter}</Table.Cell>
              <Table.Cell>{row.eleverSkriftlig}</Table.Cell>
              <Table.Cell>{row.standpunktkarakter}</Table.Cell>
              <Table.Cell>{row.antallelever}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
});

const emner = ['Engelsk', 'Matematikk', 'Norsk Hovedmål', 'Norsk Sidemål'];

const seeded = (str: string): number => {
  let h = 0;
  for (const c of str) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
  return Math.abs(h) / 2147483647;
};

const grades: Data[] = emner.map((emne) => ({
  id: emne,
  emne: emne,
  muntligkarakter: (seeded(`${emne}-muntlig`) * 1.2 + 3).toFixed(2),
  eleverMuntlig: Math.floor(seeded(`${emne}-eleverMuntlig`) * 3001) + 5000,
  skriftligkarakter: (seeded(`${emne}-skriftlig`) * 1.2 + 3).toFixed(2),
  eleverSkriftlig: Math.floor(seeded(`${emne}-eleverSkriftlig`) * 3001) + 7000,
  standpunktkarakter: (seeded(`${emne}-standpunkt`) * 1.2 + 3.2).toFixed(2),
  antallelever: Math.floor(seeded(`${emne}-antall`) * 10001) + 5000,
}));
