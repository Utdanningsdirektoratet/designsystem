import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  ArrowRightIcon,
  BellIcon,
  BriefcaseIcon,
  LeaveIcon,
} from '@udir-design/icons';
import { Avatar } from 'src/components/avatar/Avatar';
import { Badge } from 'src/components/badge/Badge';
import { Button } from 'src/components/button/Button';
import { Divider } from 'src/components/divider/Divider';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Header } from 'src/components/header';
import { Link } from 'src/components/link/Link';
import { List } from 'src/components/list/List';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';

type Profile = {
  name: string;
  description?: string;
  avatar: ReactNode;
  notifications: number;
};
const profiles: Record<'stian' | 'gralum', Profile> = {
  stian: {
    name: 'Stian Hansen',
    description: 'Admin',
    avatar: 'SH',
    notifications: 8,
  },
  gralum: {
    name: 'Grålum skole',
    notifications: 3,
    avatar: <BriefcaseIcon aria-hidden />,
  },
};

const profileAriaLabel = (profile: Profile) => {
  const nameAndDescription = [profile.name, profile.description]
    .filter((x) => !!x)
    .join(', ');
  return `${nameAndDescription}, ${profile.notifications} varsler`;
};

export function TestHeader() {
  const notifications = Object.values(profiles).reduce(
    (acc, profile) => acc + profile.notifications,
    0,
  );
  const [currentProfile, setCurrentProfile] =
    useState<keyof typeof profiles>('stian');
  const profile = profiles[currentProfile];
  const otherProfile =
    profiles[currentProfile === 'stian' ? 'gralum' : 'stian'];

  return (
    <Header applicationName="Demoapp">
      <Header.UserButton
        name={profile.name}
        description={profile.description}
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
            <Avatar aria-hidden>{profile.avatar}</Avatar>
          </Badge.Position>
        }
        aria-label={profileAriaLabel(profile)}
      />
      <Dropdown id="usermenu2" placement="bottom-end" autoPlacement={false}>
        <Dropdown.List>
          <Dropdown.Item>
            <Button
              variant="tertiary"
              aria-label={`${profile.notifications} varsler`}
            >
              <BellIcon aria-hidden />
              Varsler
              <Badge
                data-color="danger"
                count={profile.notifications}
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
              aria-label={profileAriaLabel(otherProfile)}
              onClick={() => {
                setCurrentProfile((prev) =>
                  prev === 'stian' ? 'gralum' : 'stian',
                );
              }}
            >
              <Badge.Position overlap="circle">
                <Badge
                  aria-hidden
                  count={otherProfile.notifications}
                  maxCount={9}
                  data-color="danger"
                />
                <Avatar aria-hidden>{otherProfile.avatar}</Avatar>
              </Badge.Position>
              <div>
                <div>{otherProfile.name}</div>
                {otherProfile.description && (
                  <Paragraph data-size="xs">
                    {otherProfile.description}
                  </Paragraph>
                )}
              </div>
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
