import { HTMLAttributes } from 'react';
import { Heading, Tabs } from '@udir-design/react/alpha';
import cl from 'clsx/lite';
import classes from './DashboardDemo.module.css';
import { Overview } from './tabs/overview/Overview';
import { Tests } from './tabs/tests/Tests';
import { TestAnswers } from './tabs/test-answers/TestAnswers';
import { Settings } from './tabs/settings/Settings';
import { Size } from '@digdir/designsystemet-react';

type DashboardDemoProps = {
  'data-size': Size;
  setColorMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  page?: string;
} & HTMLAttributes<HTMLDivElement>;

export const DashboardDemo = ({
  page = 'overview',
  ...props
}: DashboardDemoProps) => {
  return (
    <div {...props} className={cl(classes.card, classes.container)}>
      <Heading level={1} data-size="md">
        Schweigaardsgate skole
      </Heading>
      <Tabs defaultValue={page}>
        <Tabs.List>
          <Tabs.Tab value="overview">Oversikt</Tabs.Tab>
          <Tabs.Tab value="tests">Prøver</Tabs.Tab>
          <Tabs.Tab value="test-answers">Prøvesvar</Tabs.Tab>
          <Tabs.Tab value="settings">Innstillinger</Tabs.Tab>
        </Tabs.List>
        <Overview />
        <Tests />
        <TestAnswers />
        <Settings setColorMode={props.setColorMode} />
      </Tabs>
    </div>
  );
};
