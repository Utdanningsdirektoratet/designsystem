import { HTMLAttributes } from 'react';
import { Heading, Tabs } from '../../alpha';
import cl from 'clsx/lite';
import classes from './DashboardDemo.module.css';
import { KeyNumbers } from './key-numbers/KeyNumbers';
import { Settings } from './settings/Settings';
import { Profile } from './profile/Profile';
import { Loading } from './loading/Loading';

type DashboardDemoProps = HTMLAttributes<HTMLDivElement>;

export const DashboardDemo = ({ ...props }: DashboardDemoProps) => {
  return (
    <div {...props} className={cl(classes.card, classes.container)}>
      <Heading level={1} data-size="md">
        Dashboard
      </Heading>
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Nøkkeltall</Tabs.Tab>
          <Tabs.Tab value="tab2">Innstillinger</Tabs.Tab>
          <Tabs.Tab value="tab3">Profil</Tabs.Tab>
          <Tabs.Tab value="tab4">Laster...</Tabs.Tab>
        </Tabs.List>
        <KeyNumbers />
        <Settings />
        <Profile />
        <Loading />
      </Tabs>
    </div>
  );
};
