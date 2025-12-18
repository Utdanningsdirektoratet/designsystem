import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef, useState } from 'react';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { DataControls } from '../../components/data-controls/DataControls';
import { TabStructure } from '../../components/tab-structure/TabStructure';
import classes from './TestAnswers.module.css';

const characterDistribution = [
  { name: '6', value: 450 },
  { name: '5', value: 1125 },
  { name: '4', value: 1305 },
  { name: '3', value: 1305 },
  { name: '2', value: 225 },
  { name: '1', value: 90 },
];

const options = {
  title: {
    text: 'Karakterfordeling',
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
      dataLabels: {
        enabled: true,
        format: 'Karakter {point.name}',
        style: {
          fontWeight: 500,
        },
      },
    },
  },
  series: [
    {
      name: 'Antall prøvesvar',
      data: characterDistribution.map((item) => ({
        name: item.name,
        y: item.value,
        selected: true,
      })),
    },
  ],
  accessibility: {
    description:
      'Sektordiagram som viser fordeling av prøvesvar med antall per karakter fra 1 til 6.',
  },
};

export const TestAnswers = (props: HighchartsReact.Props) => {
  const [dataVisualization, setDataVisualization] = useState('graph');
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const renderDataVisualization = (value: string) => {
    switch (value) {
      case 'table':
        return (
          <Table zebra className={classes.table}>
            <Table.Head>
              <Table.Row>
                <Table.Cell>Karakter</Table.Cell>
                <Table.Cell className={classes.rightAlign}>Antall</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {characterDistribution.map((item, index) => (
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
      tab="test-answers"
      description="Oversikt over prøvesvar for Schweigaardsgate skole."
    >
      <div className={classes.visualization}>
        <Heading>Karakterfordeling prøvesvar</Heading>
        <DataControls
          value={dataVisualization}
          setValue={setDataVisualization}
        />
        {renderDataVisualization(dataVisualization)}
      </div>
    </TabStructure>
  );
};
