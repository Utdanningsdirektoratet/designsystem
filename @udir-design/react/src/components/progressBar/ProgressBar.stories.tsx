import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { Fieldset } from '../fieldset/Fieldset';
import { Radio } from '../radio/Radio';
import { Table } from '../table';
import { Heading } from '../typography/heading/Heading';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Preview: Story = {
  args: {
    value: 3,
    max: 10,
    label: 'Label',
  },
  render: (args) => <ProgressBar {...args} />,
};

const DATA_RANKINGS = ['Uenig', 'Nøytral', 'Enig'];
const DATA_ASSERTIONS = ['Påstand 1', 'Påstand 2', 'Påstand 3'];

export const FormExample: Story = {
  args: {
    'data-color': 'accent',
    label: 'Side',
  },
  render: (args) => {
    const [page, setPage] = useState<number>(1);

    const nextPage = () => {
      if (page < 10) {
        setPage(page + 1);
      }
    };

    const prevPage = () => {
      if (page > 1) {
        setPage(page - 1);
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
          <ProgressBar {...args} value={page} max={10} />
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
              {DATA_ASSERTIONS.map((assertion, rowIndex) => {
                const fieldName = `rankings.${assertion}` as const;
                return (
                  <Table.Row key={rowIndex}>
                    <Table.Cell>{assertion}</Table.Cell>

                    {DATA_RANKINGS.map((ranking, colIndex) => (
                      <Table.Cell key={colIndex}>
                        <Radio
                          id={`${fieldName}-${ranking}`}
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
            justifyContent: 'flex-end',
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
};

export const LoadExample: Story = {
  args: {
    'data-color': 'support1',
    percentage: true,
    label: 'Laster..',
    max: 100,
  },
  render: (args) => {
    const [progress, setProgress] = useState<number>(5);

    useEffect(() => {
      if (progress >= 100) return;

      const id = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 100);

      return () => clearInterval(id);
    }, [progress]);

    return <ProgressBar {...args} value={progress} />;
  },
};
