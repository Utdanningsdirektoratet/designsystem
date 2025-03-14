import {
  BarChartFillIcon,
  BarChartIcon,
  DonutChartFillIcon,
  DonutChartIcon,
  LineGraphIcon,
  LineGraphStackedIcon,
} from '@navikt/aksel-icons';
import {
  Card,
  Heading,
  List,
  Paragraph,
  Table,
  Tabs,
  ToggleGroup,
} from '../../../alpha';
import { useState } from 'react';
import classes from './KeyNumbers.module.css';

const dates = [
  { date: '1. januar', event: 'Første skoledag' },
  { date: '1. mai', event: 'Fri' },
  { date: '17. mai', event: 'Nasjonaldag' },
  { date: '25. desember', event: '1. juledag' },
  { date: '26. desember', event: '2. juledag' },
  { date: '31. desember', event: 'Nyttårsaften' },
  { date: '6. februar', event: 'Samefolkets dag' },
  { date: '14. februar', event: 'Valentinsdag' },
  { date: '8. mars', event: 'Kvinnedagen' },
  { date: '1. april', event: 'Aprilsnarr' },
  { date: '24. juni', event: 'St. Hans' },
  { date: '31. oktober', event: 'Halloween' },
];

export const KeyNumbers = () => {
  const [dataVisualization, setDataVisualization] = useState('bar');
  const renderDataVisualization = (value: string) => {
    switch (value) {
      case 'bar':
        return (
          <>
            <BarChartFillIcon />
            <BarChartIcon />
          </>
        );
      case 'cake':
        return (
          <>
            <DonutChartFillIcon />
            <DonutChartIcon />
          </>
        );
      case 'graph':
        return (
          <>
            <LineGraphIcon />
            <LineGraphStackedIcon />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Tabs.Panel value="tab1" className={classes.keyNumbers}>
      <Card variant="tinted" data-color="accent" className={classes.card1}>
        <Card.Block className={classes.cardBlock}>
          <ToggleGroup
            className={classes.chartControls}
            defaultValue="bar"
            onChange={setDataVisualization}
          >
            <ToggleGroup.Item value="bar">Søyle</ToggleGroup.Item>
            <ToggleGroup.Item value="cake">Kake</ToggleGroup.Item>
            <ToggleGroup.Item value="graph">Graf</ToggleGroup.Item>
          </ToggleGroup>
          <Heading>Nøkkeltall</Heading>
          <div className={classes.chart}>
            {renderDataVisualization(dataVisualization)}
          </div>
        </Card.Block>
      </Card>
      <Card variant="tinted" className={classes.table}>
        <Card.Block>
          <Heading>Viktige datoer</Heading>
        </Card.Block>
        <Card.Block>
          <div className={classes.overflow}>
            <Table stickyHeader zebra>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Dato</Table.HeaderCell>
                  <Table.HeaderCell>Hendelse</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {dates.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.date}</Table.Cell>
                    <Table.Cell>{item.event}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card.Block>
      </Card>
      <Card variant="tinted" data-color="support1">
        <Card.Block>
          <Heading>Kontakt oss</Heading>
        </Card.Block>
        <Card.Block className={classes.cardBlock}>
          <Paragraph>
            Har du spørsmål eller trenger hjelp? Ta kontakt med oss på telefon
            eller e-post.
          </Paragraph>
          <List.Unordered>
            <List.Item>
              <b>Telefon:</b> 123 45 678
            </List.Item>
            <List.Item>
              <b>E-post:</b>{' '}
              <a
                href="mailto: design@udir.no"
                target="_blank"
                rel="noopener noreferrer"
              >
                design@udir.no
              </a>
            </List.Item>
          </List.Unordered>
        </Card.Block>
      </Card>
    </Tabs.Panel>
  );
};
