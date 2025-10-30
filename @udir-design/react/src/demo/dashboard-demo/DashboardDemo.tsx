import type { Size } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { Tabs } from 'src/components/tabs/Tabs';
import { Heading } from 'src/components/typography/heading/Heading';
import classes from './DashboardDemo.module.css';
import { Overview } from './tabs/overview/Overview';
import { Settings } from './tabs/settings/Settings';
import { TestAnswers } from './tabs/test-answers/TestAnswers';
import { Tests } from './tabs/tests/Tests';

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
      <Tabs defaultValue={page} className={classes.tabs}>
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
