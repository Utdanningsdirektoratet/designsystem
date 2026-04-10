import './demoSizing.css';
import type { ComponentProps, FunctionComponent } from 'react';
import { useState } from 'react';
import { BriefcaseIcon, LeaveIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { Avatar } from 'src/components/avatar/Avatar';
import { Badge } from 'src/components/badge/Badge';
import { Button } from 'src/components/button/Button';
import { Divider } from 'src/components/divider/Divider';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Header } from 'src/components/header';
import { DashboardDemo } from '../../demo-pages/dashboard-demo/DashboardDemo';
import { demoParameters } from './demoParameters';

const meta = preview.meta({
  title: 'demo/Dashboard Demo',
  component: DashboardDemo as FunctionComponent<
    Omit<ComponentProps<typeof DashboardDemo>, 'setColorMode'>
  >,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const DashboardStory = meta.story({
  render: (args) => {
    const notifications = 10;
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
    return (
      <>
        <Header applicationName="Dashboard demo">
          <Badge.Position data-size="lg">
            <Header.UserButton
              name="Stian Hansen"
              description="Admin"
              popoverTarget="usermenu2"
              data-show="md"
              avatar={<Avatar aria-hidden>SH</Avatar>}
              aria-label={`Stian Hansen Admin - ${notifications} varsler`}
            />
            <Badge
              count={notifications}
              maxCount={9}
              data-color="danger"
              style={
                {
                  '--dsc-badge-right': '20%',
                  '--dsc-badge-top': '13%',
                } as React.CSSProperties
              }
            />
          </Badge.Position>
          <Dropdown id="usermenu2" placement="bottom-end" autoPlacement={false}>
            <Dropdown.List>
              <Dropdown.Item>
                <Dropdown.Heading>Bytt profil</Dropdown.Heading>
              </Dropdown.Item>
              <Dropdown.Item>
                <Dropdown.Button>
                  <Avatar aria-hidden>
                    <BriefcaseIcon />
                  </Avatar>
                  Grålum skole
                  <Badge count={notifications} maxCount={9} />
                </Dropdown.Button>
              </Dropdown.Item>
              <Divider />
              <Dropdown.Item>
                <Button variant="tertiary">
                  <LeaveIcon aria-hidden />
                  Logg ut
                </Button>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </Header>
        <DashboardDemo
          {...args}
          data-color-scheme={colorMode}
          setColorMode={setColorMode}
        />
      </>
    );
  },
});

export const DashboardPage2 = DashboardStory.extend({
  args: {
    page: 'tests',
  },
});

export const DashboardPage3 = DashboardStory.extend({
  args: {
    page: 'test-answers',
  },
});

export const DashboardPage4 = DashboardStory.extend({
  args: {
    page: 'settings',
  },
});
