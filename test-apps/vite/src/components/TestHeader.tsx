'use client';

import { ArrowRightIcon, BriefcaseIcon, LeaveIcon } from '@udir-design/icons';
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
  const notifications = 10;

  return (
    <Header applicationName="Demoapp">
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
