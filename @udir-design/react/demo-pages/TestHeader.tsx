import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  ArrowRightIcon,
  BellIcon,
  HatSchoolIcon,
  LeaveIcon,
} from '@udir-design/icons';
import { Avatar } from 'src/components/avatar';
import { Badge } from 'src/components/badge';
import { Button } from 'src/components/button';
import { Divider } from 'src/components/divider';
import { Dropdown } from 'src/components/dropdown';
import { Header } from 'src/components/header';
import { Link } from 'src/components/link';
import { List } from 'src/components/list';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import classes from './TestHeader.module.css';

type Profile = {
  name: string;
  description?: string;
  avatar: ReactNode;
  notifications: number;
};
const _profiles = {
  stian: {
    name: 'Stian Hansen',
    description: 'Admin',
    avatar: 'SH',
    notifications: 8,
  },
  gralum: {
    name: 'Grålum skole',
    notifications: 3,
    avatar: <HatSchoolIcon aria-hidden />,
  },
} satisfies Record<string, Profile>;

const profiles: Record<keyof typeof _profiles, Profile> = _profiles;

type Props = {
  basePath?: string;
};

export function TestHeader({ basePath = '' }: Props) {
  const [currentProfile, setCurrentProfile] =
    useState<keyof typeof profiles>('stian');

  return (
    <Header applicationName="Demoapp" href={`${basePath}/`}>
      <UserMenu
        currentProfile={currentProfile}
        onProfileSwitch={setCurrentProfile}
        id="usermenu-desktop"
        data-show="sm"
      />
      <Header.MenuButton />
      <Header.Menu>
        <UserMenu
          currentProfile={currentProfile}
          onProfileSwitch={setCurrentProfile}
          id="usermenu-mobile"
          data-hide="sm"
          className={classes.userMenu}
        />
        <nav
          aria-labelledby="header-menu-theme1-navigation"
          className={classes.navigation}
        >
          <h2 className="ds-sr-only" id="header-menu-theme1-navigation">
            Demosider navigasjon
          </h2>
          <div>
            <Heading
              data-size="xs"
              level={3}
              className={classes.navigationHeading}
            >
              Demosider
            </Heading>
            <List.Unordered>
              <List.Item>
                <Link
                  href={`${basePath}/article`}
                  className={classes.navigationLink}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Artikkel</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href={`${basePath}/dashboard`}
                  className={classes.navigationLink}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Dashbord</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href={`${basePath}/page`}
                  className={classes.navigationLink}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Page</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href={`${basePath}/form`}
                  className={classes.navigationLink}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Form</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href={`${basePath}/table`}
                  className={classes.navigationLink}
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

const profileAriaLabel = (profile: Profile) => {
  const nameAndDescription = [profile.name, profile.description]
    .filter((x) => !!x)
    .join(', ');
  return `${nameAndDescription}, ${profile.notifications} varsler`;
};

function UserMenu({
  currentProfile,
  onProfileSwitch,
  id,
  className,
  ...rest
}: {
  currentProfile: keyof typeof profiles;
  onProfileSwitch: (profile: keyof typeof profiles) => void;
  id: string;
  className?: string;
  'data-show'?: string;
  'data-hide'?: string;
}) {
  const notifications = Object.values(profiles).reduce(
    (acc, profile) => acc + profile.notifications,
    0,
  );
  const profile = profiles[currentProfile];
  const otherProfiles = Object.entries(profiles)
    .filter(([key]) => key !== currentProfile)
    .map(([key, val]) => ({
      key: key as keyof typeof profiles,
      ...val,
    }));

  return (
    <>
      <Header.UserButton
        {...rest}
        className={className}
        name={profile.name}
        description={profile.description}
        popoverTarget={id}
        avatar={
          <Badge.Position overlap="circle">
            <Badge
              count={notifications}
              maxCount={9}
              aria-hidden
              data-color="danger"
              hidden={notifications === 0}
            />
            <Avatar aria-hidden>{profile.avatar}</Avatar>
          </Badge.Position>
        }
        aria-label={profileAriaLabel(profile)}
      />
      <Dropdown {...rest} id={id} placement="bottom-end" autoPlacement={false}>
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
                hidden={profile.notifications === 0}
              />
            </Button>
          </Dropdown.Item>
        </Dropdown.List>
        <Divider />
        <Dropdown.Heading>Bytt profil</Dropdown.Heading>
        <Dropdown.List>
          {otherProfiles.map((otherProfile) => (
            <Dropdown.Item key={otherProfile.key}>
              <Dropdown.Button
                aria-label={profileAriaLabel(otherProfile)}
                onClick={() => onProfileSwitch(otherProfile.key)}
              >
                <Badge.Position overlap="circle">
                  <Badge
                    aria-hidden
                    count={otherProfile.notifications}
                    maxCount={9}
                    data-color="danger"
                    hidden={otherProfile.notifications === 0}
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
          ))}
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
    </>
  );
}
