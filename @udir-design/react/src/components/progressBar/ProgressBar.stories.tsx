import { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Fieldset } from '../fieldset/Fieldset';
import { Radio } from '../radio/Radio';
import { Table } from '../table';
import { Heading } from '../typography/heading/Heading';
import { ProgressBar } from './ProgressBar';

const meta = preview.meta({
  component: ProgressBar,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  args: {
    value: 3,
    max: 10,
    prefix: 'Steg',
  },
  render: (args) => <ProgressBar {...args} />,
});

const DATA_RANKINGS = ['Uenig', 'Nøytral', 'Enig'];
const DATA_ASSERTIONS = [
  ['Første påstand', 'Andre påstand', 'Tredje påstand'],
  ['Fjerde påstand', 'Femte påstand', 'Sjette påstand'],
  ['Sjuende påstand', 'Åttende påstand', 'Niende påstand'],
  ['Tiende påstand', 'Ellevte påstand', 'Tolvte påstand'],
  ['Trettende påstand', 'Fjortende påstand', 'Femtende påstand'],
  ['Sekstende påstand', 'Syttende påstand', 'Attende påstand'],
  ['Nittende påstand', 'Tjuende påstand', 'Tjueførste påstand'],
];

export const FormExample = meta.story({
  args: {
    'data-color': 'accent',
    prefix: 'Side',
    value: 1,
    max: 7,
  },
  render: (args) => {
    const [page, setPage] = useState<number>(1);
    const progressRef = useRef<HTMLDivElement>(null);

    const nextPage = () => {
      if (page < args.max) {
        setPage(page + 1);
        progressRef.current?.focus();
      }
    };

    const prevPage = () => {
      if (page > 1) {
        setPage(page - 1);
        progressRef.current?.focus();
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-6)',
        }}
      >
        <Fieldset id="rankings">
          <Fieldset.Legend>
            <Heading level={4}>Skjema</Heading>
          </Fieldset.Legend>
          <ProgressBar
            {...args}
            tabIndex={-1}
            ref={progressRef}
            value={page}
            style={{ marginInline: 'var(--ds-size-8)' }}
            aria-label="Skjemafremgang"
          />
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Påstander</Table.HeaderCell>
                {DATA_RANKINGS.map((ranking, index) => (
                  <Table.HeaderCell key={index}>{ranking}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {DATA_ASSERTIONS[page - 1].map((assertion, rowIndex) => {
                const fieldName = `rankings.${assertion}` as const;
                return (
                  <Table.Row key={rowIndex}>
                    <Table.Cell>{assertion}</Table.Cell>

                    {DATA_RANKINGS.map((ranking, colIndex) => (
                      <Table.Cell key={colIndex}>
                        <Radio
                          id={`${fieldName}-${ranking}`}
                          name={fieldName}
                          aria-label={`${ranking} i påstand ${assertion}`}
                          value={ranking}
                        />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Fieldset>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 'var(--ds-size-4)',
          }}
        >
          {page > 1 && (
            <Button variant="tertiary" onClick={() => prevPage()}>
              <ArrowLeftIcon aria-hidden />
              Forrige
            </Button>
          )}
          {page < 10 && (
            <Button variant="secondary" onClick={() => nextPage()}>
              Neste
              <ArrowRightIcon aria-hidden />
            </Button>
          )}
        </div>
      </div>
    );
  },
});
