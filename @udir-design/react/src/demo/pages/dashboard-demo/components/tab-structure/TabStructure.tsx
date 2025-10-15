import { Card } from '../../../../../components/card/Card';
import { List } from '../../../../../components/list/List';
import { Tabs } from '../../../../../components/tabs/Tabs';
import { Heading } from '../../../../../components/typography/heading/Heading';
import { Paragraph } from '../../../../../components/typography/paragraph/Paragraph';
import classes from './TabStructure.module.css';

const dates = [
  { date: '12. april', event: 'Prøvestart' },
  { date: '5. mai', event: 'Prøvefrist' },
  { date: '28. mai', event: 'Svarfrist' },
];

type TabStructureProps = {
  tab: string;
  description?: string;
  children?: React.ReactNode;
};

export const TabStructure = ({
  tab,
  description,
  children,
}: TabStructureProps) => {
  return (
    <Tabs.Panel value={tab} className={classes.overview}>
      {description && <Paragraph>{description}</Paragraph>}
      <div className={classes.overviewContent}>
        <div className={classes.cards}>
          <Card className={classes.datesCard}>
            <Heading>Viktige datoer</Heading>
            <List.Unordered>
              {dates.map((item, index) => (
                <List.Item key={index}>
                  {item.event}: {item.date}
                </List.Item>
              ))}
            </List.Unordered>
          </Card>
        </div>
        {children}
      </div>
    </Tabs.Panel>
  );
};
