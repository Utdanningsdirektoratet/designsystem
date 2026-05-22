'use client';

import {
  ArrowRightIcon,
  BellIcon,
  BriefcaseIcon,
  LeaveIcon,
} from '@udir-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Header,
  Heading,
  Link,
  List,
} from '@udir-design/react/alpha';

export function TestHeader() {
  const selfNotifications = 8;
  const schoolNotifications = 3;
  const notifications = selfNotifications + schoolNotifications;

  return (
    <Header applicationName="Demoapp">
      <Header.UserButton
        name="Stian Hansen"
        description="Admin"
        popoverTarget="usermenu2"
        data-show="md"
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
        aria-label={`Stian Hansen, Admin, ${notifications} varsler`}
      />
      <Dropdown id="usermenu2" placement="bottom-end" autoPlacement={false}>
        <Dropdown.List>
          <Dropdown.Item>
            <Button
              variant="tertiary"
              aria-label={`${selfNotifications} varsler`}
            >
              <BellIcon aria-hidden />
              Varsler
              <Badge
                data-color="danger"
                count={selfNotifications}
                maxCount={9}
                aria-hidden
              />
            </Button>
          </Dropdown.Item>
        </Dropdown.List>
        <Divider />
        <Dropdown.Heading>Bytt profil</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button
              aria-label={`Grålum skole, ${schoolNotifications} varsler`}
            >
              <Badge.Position overlap="circle">
                <Badge
                  aria-hidden
                  count={schoolNotifications}
                  maxCount={9}
                  data-color="danger"
                />
                <Avatar aria-hidden>
                  <BriefcaseIcon />
                </Avatar>
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
      <Header.MenuButton />
      <Header.Menu>
        <nav
          aria-labelledby="header-menu-theme1-navigation"
          style={{
            display: 'grid',
            gap: 'var(--ds-size-4)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
            justifyItems: 'center',
            margin: '0 auto',
            maxWidth: '800px',
            padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
            rowGap: 'var(--ds-size-10)',
          }}
        >
          <h2 className="ds-sr-only" id="header-menu-theme1-navigation">
            Demosider navigasjon
          </h2>
          <div>
            <Heading
              data-size="xs"
              level={3}
              style={{
                marginBottom: 'var(--ds-size-3)',
              }}
            >
              Demosider
            </Heading>
            <List.Unordered>
              <List.Item>
                <Link
                  href="/article"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Artikkel</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/dashboard"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Dashbord</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/page"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Page</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/form"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Form</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/table"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Table</span>
                </Link>
              </List.Item>
            </List.Unordered>
          </div>
        </nav>
      </Header.Menu>
    </Header>
  );
}
