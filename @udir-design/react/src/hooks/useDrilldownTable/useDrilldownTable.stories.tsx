import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Table } from 'src/components/table';
import { useDrilldownTable } from './useDrilldownTable';

const meta = preview.meta({
  title: 'Hooks/useDrilldownTable',
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: { originator: 'self' },
    customStyles: { width: 'fit-content', margin: '0 auto' },
  },
});

type TreeNode = {
  id: string;
  label: string;
  values: React.ReactNode[];
  children?: TreeNode[];
};

type NpNode = [label: string, values: string[], children?: NpNode[]];

const toTree = (nodes: NpNode[], prefix = 'np'): TreeNode[] =>
  nodes.map(([label, values, children]) => {
    const id = `${prefix}-${label.toLowerCase().replace(/[^a-zæøå0-9]/g, '')}`;
    return {
      id,
      label,
      values,
      ...(children && { children: toTree(children, id) }),
    };
  });

const nasjonalePrøverData = toTree([
  [
    'Nasjonalt',
    ['50', '50', '50'],
    [
      ['Akershus', ['52', '52', '53'], [['…', ['…', '…', '…']]]],
      [
        'Oslo',
        ['53', '52', '54'],
        [
          ['Frogner', ['55', '53', '56'], [['…', ['…', '…', '…']]]],
          [
            'Gamle Oslo',
            ['52', '50', '52'],
            [
              ['Gamlebyen skole', ['51', '49', '51']],
              ['Kampen skole', ['54', '52', '55']],
              ['Tøyen skole', ['53', '51', '53']],
              ['Vahl skole', ['52', '50', '52']],
            ],
          ],
          ['Grünerløkka', ['54', '52', '55'], [['…', ['…', '…', '…']]]],
          ['Nordre Aker', ['53', '52', '54'], [['…', ['…', '…', '…']]]],
          ['St. Hanshaugen', ['54', '53', '55'], [['…', ['…', '…', '…']]]],
          ['Søndre Nordstrand', ['50', '48', '50'], [['…', ['…', '…', '…']]]],
        ],
      ],
      ['Rogaland', ['50', '51', '51'], [['…', ['…', '…', '…']]]],
      ['Trøndelag', ['50', '51', '50'], [['…', ['…', '…', '…']]]],
      ['Vestland', ['51', '51', '50'], [['…', ['…', '…', '…']]]],
      ['…', ['…', '…', '…']],
    ],
  ],
]);

export const Preview = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: () => {
    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    useDrilldownTable(tbodyRef);

    const [open, setOpen] = useState<Set<string>>(
      new Set([
        'np-nasjonalt',
        'np-nasjonalt-oslo',
        'np-nasjonalt-oslo-gamleoslo',
      ]),
    );

    const toggle = (id: string) => {
      setOpen((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };

    const rows = useMemo(() => {
      const renderRows = (node: TreeNode, depth = 0): React.ReactNode[] => {
        const isOpen = open.has(node.id);
        const children = node.children ?? [];
        const hasChildren = children.length > 0;

        const currentRow = (
          <Table.Row
            key={node.id}
            id={node.id}
            data-testid={`row-${node.id}`}
            data-level={depth + 1}
          >
            <Table.HeaderCell scope="row">
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggle(node.id)}
                  aria-expanded={isOpen}
                  data-testid={`toggle-${node.id}`}
                >
                  {node.label}
                </button>
              ) : (
                node.label
              )}
            </Table.HeaderCell>

            {node.values.map((value, index) => (
              <Table.Cell
                key={`${node.id}-c${index}`}
                style={{ textAlign: 'right' }}
              >
                {value}
              </Table.Cell>
            ))}
          </Table.Row>
        );

        if (!hasChildren || !isOpen) {
          return [currentRow];
        }

        return [
          currentRow,
          ...children.flatMap((child) => renderRows(child, depth + 1)),
        ];
      };

      return nasjonalePrøverData.flatMap((node) => renderRows(node));
    }, [open]);

    return (
      <Table
        zebra
        tintedColumnHeader
        tintedRowHeader
        data-color="support1"
        style={{
          tableLayout: 'fixed',
          width: '550px',
        }}
      >
        <caption
          style={{
            fontSize: 'var(--ds-font-size-3)',
            captionSide: 'bottom',
            textAlign: 'center',
            fontWeight: 'normal',
            marginTop: 'var(--ds-size-2)',
          }}
        >
          Nasjonale prøver 5. trinn – skoleåret 2024–25, snitt skalapoeng
        </caption>

        <Table.Head>
          <Table.Row>
            <Table.HeaderCell scope="col">Område</Table.HeaderCell>
            <Table.HeaderCell scope="col" style={{ width: '4rem' }}>
              Lesing
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" style={{ width: '4rem' }}>
              Regning
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" style={{ width: '4rem' }}>
              Engelsk
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        <Table.Body ref={tbodyRef}>{rows}</Table.Body>
      </Table>
    );
  },
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);

    await step('Nasjonalt, Oslo and Gamle Oslo are expanded by default', () => {
      expect(canvas.getByTestId('toggle-np-nasjonalt')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(canvas.getByTestId('toggle-np-nasjonalt-oslo')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(
        canvas.getByTestId('toggle-np-nasjonalt-oslo-gamleoslo'),
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        canvas.getByTestId('row-np-nasjonalt-oslo-gamleoslo-tøyenskole'),
      ).toBeInTheDocument();
      expect(
        canvas.getByTestId('row-np-nasjonalt-oslo-gamleoslo-kampenskole'),
      ).toBeInTheDocument();
    });

    await step('Collapsing Gamle Oslo hides schools', async () => {
      await userEvent.click(
        canvas.getByTestId('toggle-np-nasjonalt-oslo-gamleoslo'),
      );

      expect(
        canvas.getByTestId('toggle-np-nasjonalt-oslo-gamleoslo'),
      ).toHaveAttribute('aria-expanded', 'false');
      expect(
        canvas.queryByTestId('row-np-nasjonalt-oslo-gamleoslo-tøyenskole'),
      ).not.toBeInTheDocument();
    });
  },
});
