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
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
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
          <Header.UserButton
            name="Stian Hansen"
            description="Admin"
            popoverTarget="usermenu2"
            data-show="sm"
            avatar={
              <Badge.Position overlap="circle">
                <Badge
                  count={notifications}
                  maxCount={9}
                  aria-hidden
                  data-color="danger"
                />
                <Avatar aria-hidden>SH</Avatar>
              </Badge.Position>
            }
            aria-label={`Stian Hansen Admin - ${notifications} varsler`}
          />
          <Dropdown id="usermenu2" placement="bottom-end" autoPlacement={false}>
            <Dropdown.Heading>Bytt profil</Dropdown.Heading>
            <Dropdown.List>
              <Dropdown.Item>
                <Dropdown.Button aria-label="Grålum skole, 10 varsler">
                  <Badge.Position overlap="circle">
                    <Avatar aria-hidden>
                      <BriefcaseIcon />
                    </Avatar>
                    <Badge
                      count={10}
                      maxCount={9}
                      aria-hidden
                      data-color="danger"
                    />
                  </Badge.Position>
                  Grålum skole
                </Dropdown.Button>
              </Dropdown.Item>
            </Dropdown.List>
            <Divider />
            <Dropdown.List>
              <Dropdown.Item>
                <Button variant="tertiary">
                  <LeaveIcon aria-hidden />
                  Logg ut
                </Button>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
          <Button
            data-hide="sm"
            popoverTarget="usermenuSmall"
            variant="tertiary"
          >
            <Badge.Position overlap="circle">
              <Badge
                count={notifications}
                maxCount={9}
                aria-hidden
                data-color="danger"
              />
              <Avatar aria-label="Stian Hansen">SH</Avatar>
            </Badge.Position>
          </Button>
          <Dropdown id="usermenuSmall" placement="bottom-end">
            <Dropdown.List>
              <Dropdown.Item>
                <Dropdown.Heading>Detaljer</Dropdown.Heading>
              </Dropdown.Item>
              <Dropdown.Item
                style={{
                  marginLeft: 'var(--ds-size-4)',
                }}
              >
                <Paragraph>Stian Hansen</Paragraph>
              </Dropdown.Item>
              <Dropdown.Item
                style={{
                  marginBottom: 'var(--ds-size-4)',
                  marginLeft: 'var(--ds-size-4)',
                }}
              >
                <Paragraph>Admin</Paragraph>
              </Dropdown.Item>
              <Divider />
              <Dropdown.Item>
                <Dropdown.Heading>Bytt profil</Dropdown.Heading>
              </Dropdown.Item>
              <Dropdown.Item>
                <Dropdown.Button>
                  <Avatar aria-hidden>
                    <BriefcaseIcon />
                  </Avatar>
                  Grålum skole <Badge count={10} maxCount={9} />
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
