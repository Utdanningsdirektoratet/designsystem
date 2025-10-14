import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { DataControls } from '../../components/data-controls/DataControls';
import { Loading } from '../../components/loading/Loading';
import { TabStructure } from '../../components/tab-structure/TabStructure';
import classes from './Overview.module.css';

const testOverview = [
  { year: '2022', sent: 3500, received: 2000 },
  { year: '2023', sent: 2000, received: 1500 },
  { year: '2024', sent: 3000, received: 2000 },
];

const categories = testOverview.map((item) => item.year);
const sentData = testOverview.map((item) => item.sent);
const receivedData = testOverview.map((item) => item.received);
const differenceData = testOverview.map((item) => item.sent - item.received);

const options: Highcharts.Options = {
  title: {
    text: '',
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
    type: 'column',
    style: { fontFamily: 'Inter, sans-serif' },
  },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Antall',
    },
  },
  series: [
    {
      name: 'Utsendte prøver',
      type: 'column',
      data: sentData,
    },
    {
      name: 'Prøvesvar',
      type: 'column',
      data: receivedData,
    },
    {
      name: 'Ikke svart',
      type: 'line',
      data: differenceData,
    },
  ],
  tooltip: {
    pointFormat: '{series.name}: <b>{point.y}</b>',
  },
};

export const Overview = (props: HighchartsReact.Props) => {
  const [dataVisualization, setDataVisualization] = useState('graph');
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderDataVisualization = (value: string) => {
    switch (value) {
      case 'table':
        return (
          <Table zebra className={classes.table}>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>År</Table.HeaderCell>
                <Table.HeaderCell className={classes.rightAlign}>
                  Utsendte prøver
                </Table.HeaderCell>
                <Table.HeaderCell className={classes.rightAlign}>
                  Prøvesvar
                </Table.HeaderCell>
                <Table.HeaderCell className={classes.rightAlign}>
                  Ikke svart
                </Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {testOverview.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.year}</Table.Cell>
                  <Table.Cell className={classes.rightAlign}>
                    {item.sent}
                  </Table.Cell>
                  <Table.Cell className={classes.rightAlign}>
                    {item.received}
                  </Table.Cell>
                  <Table.Cell className={classes.rightAlign}>
                    {item.sent - item.received}
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
      tab="overview"
      description="Her får du en oversikt over all den overordnede informasjonen."
    >
      <div className={classes.visualization}>
        <Heading>Prøveoversikt</Heading>
        {loading && <Loading />}
        {!loading && (
          <>
            <DataControls
              value={dataVisualization}
              setValue={setDataVisualization}
            />
            {renderDataVisualization(dataVisualization)}
          </>
        )}
      </div>
    </TabStructure>
  );
};
