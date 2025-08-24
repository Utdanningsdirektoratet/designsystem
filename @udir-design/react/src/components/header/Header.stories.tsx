import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Link,
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Search,
  ListUnordered,
  ListItem,
} from '@udir-design/react/alpha';
import { Header } from './Index';
import { useState } from 'react';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['beta'],
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Preview: Story = {
  render: () => <Header applicationName="Utdanningsdirektoratet" />,
};

export const Application: Story = {
  args: {
    applicationName: ' Designsystem',
  },
  render: (args) => <Header {...args} />,
};

export const WithLinks: Story = {
  render: () => (
    <Header applicationName="Designsystem">
      <Link href="#">Komponenter</Link>
      <Link href="#">Figma</Link>
      <Link href="#">Github</Link>
    </Header>
  ),
};

const profileImage =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const WithUserButton: Story = {
  render: () => (
    <>
      <Header applicationName="Designsystem" data-color="accent">
        <Header.UserButton
          username="Stian Hansen"
          userRole="Admin"
          popoverTarget="usermenu"
          avatar={
            <Avatar aria-label="Stian Hansen">
              <img alt="Stian Hansen" src={profileImage} />
            </Avatar>
          }
        />
      </Header>
      <Dropdown id="usermenu">
        <Dropdown.Heading>Rolle</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Superadmin</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Admin</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>Hovedbruker</Dropdown.Button>
          </Dropdown.Item>

          <Divider />
          <Dropdown.Item style={{ margin: 'var(--ds-size-2) 0' }}>
            <Dropdown.Button>
              Varsler <Badge count={8} />
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button variant="secondary">Logg ut</Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </>
  ),
};

export const WithMenuButton: Story = {
  render: () => (
    <Header applicationName="Designsystem">
      <Header.MenuButton variant="primary" />
      <Header.Menu>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'var(--ds-size-10)',
            justifyItems: 'center',
          }}
        >
          <ListUnordered
            style={{
              listStyle: 'none',
              padding: 0,
            }}
          >
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/identitet/"
                target="_blank"
              >
                Identitet
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/farger/"
                target="_blank"
              >
                Farger
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/typografi/"
                target="_blank"
              >
                Typografi
              </Link>
            </ListItem>
          </ListUnordered>
          <ListUnordered
            style={{
              listStyle: 'none',
              padding: 0,
            }}
          >
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/identitet/"
                target="_blank"
              >
                Identitet
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/farger/"
                target="_blank"
              >
                Farger
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/typografi/"
                target="_blank"
              >
                Typografi
              </Link>
            </ListItem>
          </ListUnordered>
          <ListUnordered
            style={{
              listStyle: 'none',
              padding: 0,
            }}
          >
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/identitet/"
                target="_blank"
              >
                Identitet
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/farger/"
                target="_blank"
              >
                Farger
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.udir.no/om-udir/designprofil/typografi/"
                target="_blank"
              >
                Typografi
              </Link>
            </ListItem>
          </ListUnordered>
        </div>
      </Header.Menu>
    </Header>
  ),
};

export const WithLinksAndMenu: Story = {
  render() {
    return (
      <Header applicationName="Designsystem">
        <Link href="#">Komponenter</Link>
        <Link href="#">Figma</Link>
        <Link href="#">Github</Link>
        <Header.MenuButton />
        <Header.Menu>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              justifyItems: 'center',
            }}
          >
            <ListUnordered
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/identitet/"
                  target="_blank"
                >
                  Identitet
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/farger/"
                  target="_blank"
                >
                  Farger
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/typografi/"
                  target="_blank"
                >
                  Typografi
                </Link>
              </ListItem>
            </ListUnordered>
            <ListUnordered
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/identitet/"
                  target="_blank"
                >
                  Identitet
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/farger/"
                  target="_blank"
                >
                  Farger
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/typografi/"
                  target="_blank"
                >
                  Typografi
                </Link>
              </ListItem>
            </ListUnordered>
            <ListUnordered
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/identitet/"
                  target="_blank"
                >
                  Identitet
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/farger/"
                  target="_blank"
                >
                  Farger
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/typografi/"
                  target="_blank"
                >
                  Typografi
                </Link>
              </ListItem>
            </ListUnordered>
          </div>
        </Header.Menu>
      </Header>
    );
  },
};

export const WithSimpleMenu: Story = {
  render() {
    return (
      <Header applicationName="Designsystem">
        <Header.MenuButton popoverTarget="header-simple-menu" />
        <Dropdown id="header-simple-menu">
          <Dropdown.List>
            <Dropdown.Heading>Utdanning</Dropdown.Heading>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-size-1)',
                marginBottom: 'var(--ds-size-4)',
              }}
            >
              <Dropdown.Item>
                <Link href="https://www.udir.no/utdanningslopet/barnehage/">
                  Barnehage
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://www.udir.no/utdanningslopet/grunnskole/">
                  Grunnskole
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://www.udir.no/utdanningslopet/videregaende-opplaring/">
                  Videregående
                </Link>
              </Dropdown.Item>
            </div>
            <Dropdown.Heading>Annen opplæring</Dropdown.Heading>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-size-1)',
                marginBottom: 'var(--ds-size-4)',
              }}
            >
              <Dropdown.Item>
                <Link href="https://www.udir.no/utdanningslopet/sfo/">SFO</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://www.udir.no/utdanningslopet/kulturskolen/">
                  Kulturskolen
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="https://www.udir.no/om-udir/tilskudd-og-prosjektmidler/tilskudd-for-folkehogskoler/">
                  Folkehøgskoler
                </Link>
              </Dropdown.Item>
            </div>
          </Dropdown.List>
        </Dropdown>
      </Header>
    );
  },
};

export const WithSearch: Story = {
  render() {
    const [value, setValue] = useState('');
    return (
      <Header applicationName="Designsystem">
        <Header.Search data-size="md">
          <Search.Input
            aria-label="Søk"
            placeholder="Søk"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Search.Clear onClick={() => setValue('')} />
        </Header.Search>
      </Header>
    );
  },
};

export const UdirNo: Story = {
  render() {
    return (
      <Header applicationName="Utdanningsdirektoratet">
        <Search style={{ maxWidth: '250px' }}>
          <Search.Input aria-label="Søk" placeholder="Søk" />
          <Search.Clear />
        </Search>
        <Header.MenuButton variant="primary" />
        <Header.Menu
          style={{ backgroundColor: 'var(--ds-color-background-tinted)' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              justifyItems: 'center',
            }}
          >
            <ListUnordered
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/identitet/"
                  target="_blank"
                >
                  Identitet
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/farger/"
                  target="_blank"
                >
                  Farger
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/typografi/"
                  target="_blank"
                >
                  Typografi
                </Link>
              </ListItem>
            </ListUnordered>
            <ListUnordered
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/identitet/"
                  target="_blank"
                >
                  Identitet
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/farger/"
                  target="_blank"
                >
                  Farger
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/typografi/"
                  target="_blank"
                >
                  Typografi
                </Link>
              </ListItem>
            </ListUnordered>
            <ListUnordered
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/identitet/"
                  target="_blank"
                >
                  Identitet
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/farger/"
                  target="_blank"
                >
                  Farger
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.udir.no/om-udir/designprofil/typografi/"
                  target="_blank"
                >
                  Typografi
                </Link>
              </ListItem>
            </ListUnordered>
          </div>
        </Header.Menu>
      </Header>
    );
  },
};

export const FullHeader: Story = {
  render() {
    const [value, setValue] = useState('');
    return (
      <Header applicationName="Designsystem">
        <Link href="#" data-hide="lg">
          Komponenter
        </Link>
        <Link href="#" data-hide="lg">
          Github
        </Link>
        <Header.Search data-hide="sm">
          <Search.Input
            aria-label="Søk"
            placeholder="Søk"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Search.Clear onClick={() => setValue('')} />
        </Header.Search>
        <Header.UserButton
          username="Stian Hansen"
          userRole="Admin"
          popoverTarget="usermenu2"
          data-hide="md"
        >
          <Avatar aria-label={''}>JD</Avatar>
        </Header.UserButton>
        <Dropdown id="usermenu2">
          <Dropdown.Heading>Rolle</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Superadmin</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Admin</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Hovedbruker</Dropdown.Button>
            </Dropdown.Item>

            <Divider />
            <Dropdown.Item style={{ margin: 'var(--ds-size-2) 0' }}>
              <Dropdown.Button>
                Varsler <Badge count={8} />
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button variant="secondary">Logg ut</Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
        <Header.MenuButton />
      </Header>
    );
  },
};
