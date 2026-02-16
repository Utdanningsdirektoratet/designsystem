import * as Highcharts from 'highcharts';
import 'highcharts/i18n/nb-NO';
import HighchartsReact from 'highcharts-react-official';
import { useRef, useState } from 'react';
import { Card } from 'src/components/card/Card';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { getHighchartsTheme } from 'src/utilities/dataVisualization';
import { DataControls } from '../../components/data-controls/DataControls';
import { LoadChart } from '../../components/loading/LoadChart';
import { TabStructure } from '../../components/tab-structure/TabStructure';
import classes from './Tests.module.css';

const tests = [
  { name: 'Utsendte', value: 3500 },
  { name: 'Påbegynte', value: 2000 },
];
const total = tests.map((x) => x.value).reduce((x, y) => x + y);

Highcharts.setOptions(getHighchartsTheme());

const options: Highcharts.Options = {
  title: {
    text: 'Prøver',
    // hide title but keep for accessibility
    style: { display: 'none' },
  },
  chart: {
    type: 'pie',
  },
  series: [
    {
      name: 'Antall',
      type: 'pie',
      innerSize: '75%',
      cursor: 'pointer',
      dataLabels: [
        {
          enabled: true,
          distance: 10,
          format: '{point.name}: {point.y}',
          style: {
            fontWeight: '500',
          },
        },
        {
          enabled: true,
          distance: -22,
          format: '{point.percentage:.0f}%',
          style: {
            fontSize: '0.9em',
            color: '#fff',
          },
        },
      ],

      data: tests.map(
        (item): Highcharts.PointOptionsObject => ({
          name: item.name,
          y: item.value,
          selected: true,
          accessibility: {
            // Adds percentage readout for screen readers, since we have it visually
            description: `${Math.round((item.value / total) * 100)}%`,
          },
        }),
      ),
    },
  ],
  accessibility: {
    typeDescription: 'Sektordiagram',
    description:
      'Diagrammet viser fordeling av prøver med antall utsendte og påbegynte prøver.',
  },
};

export const Tests = (props: HighchartsReact.Props) => {
  const [dataVisualization, setDataVisualization] = useState('graph');
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const renderDataVisualization = (value: string) => {
    switch (value) {
      case 'table':
        return (
          <Table zebra className={classes.table}>
            <Table.Head>
              <Table.Row>
                <Table.Cell>Prøver</Table.Cell>
                <Table.Cell className={classes.rightAlign}>Antall</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {tests.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell className={classes.rightAlign}>
                    {item.value}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        );
      default:
        return (
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            {...props}
          />
        );
    }
  };

  return (
    <TabStructure
      tab="tests"
      description="Oversikt over prøver for Schweigaardsgate skole."
    >
      <div className={classes.visualization}>
        <Heading>Prøver</Heading>
        <div className={classes.cards}>
          <Card asChild data-color="neutral">
            <a href="/">
              <Heading>Administrer prøve X</Heading>
            </a>
          </Card>
          <Card asChild data-color="neutral">
            <a href="/">
              <Heading>Administrer prøve Y</Heading>
            </a>
          </Card>
        </div>
        <LoadChart>
          <DataControls
            value={dataVisualization}
            setValue={setDataVisualization}
          />
          {renderDataVisualization(dataVisualization)}
        </LoadChart>
      </div>
    </TabStructure>
  );
};
