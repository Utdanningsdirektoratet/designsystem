import { useRef, useState } from 'react';
import { TabStructure } from '../../components/tab-structure/TabStructure';
import classes from './Tests.module.css';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import { DataControls } from '../../components/data-controls/DataControls';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { Card } from 'src/components/card/Card';

const tests = [
  { name: 'Utsendte', value: 3500 },
  { name: 'Påbegynte', value: 2000 },
];

const options = {
  title: {
    text: 'Prøver',
    // hide title but keep for accessibility
    style: { display: 'none' },
  },
  colors: [
    '#5BA27E',
    '#6C7C94',
    '#BB893E',
    '#353535',
    '#30A1BB',
    '#255F41',
    '#9D5F32',
    '#949494',
  ],
  chart: {
    type: 'pie',
    style: { fontFamily: 'Inter, sans-serif' },
  },
  plotOptions: {
    pie: {
      cursor: 'pointer',
    },
    series: {
      dataLabels: [
        {
          enabled: true,
          distance: 10,
          format: '{point.name}: {point.y}',
          style: {
            fontWeight: 500,
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
    },
  },
  series: [
    {
      innerSize: '75%',
      name: 'Antall',
      data: tests.map((item) => ({
        name: item.name,
        y: item.value,
        selected: true,
      })),
    },
  ],
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
        <DataControls
          value={dataVisualization}
          setValue={setDataVisualization}
        />
        {renderDataVisualization(dataVisualization)}
      </div>
    </TabStructure>
  );
};
