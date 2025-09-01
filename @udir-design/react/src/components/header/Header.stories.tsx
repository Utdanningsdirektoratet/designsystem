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
  Heading,
  Header,
} from '@udir-design/react/alpha';
import { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  LeaveIcon,
} from '@navikt/aksel-icons';

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
  args: {
    applicationName: 'Tjenestenavn',
  },
  render: (args) => <Header {...args} />,
};

export const WithLinks: Story = {
  render: () => (
    <Header applicationName="Tjenestenavn">
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
      <Header applicationName="Tjenestenavn">
        <Header.UserButton
          username="Stian Hansen"
          userRole="Admin"
          popovertarget="usermenu"
          avatar={
            <Avatar aria-label="Stian Hansen">
              <img src={profileImage} alt="" />
            </Avatar>
          }
          data-color="accent"
        />
      </Header>
      <Dropdown id="usermenu" placement="bottom-end" autoPlacement={false}>
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

const menuLinks = [
  {
    heading: 'Designprofil',
    links: [
      {
        title: 'Identitet',
        href: 'https://www.udir.no/om-udir/designprofil/identitet/',
      },
      {
        title: 'Farger',
        href: 'https://www.udir.no/om-udir/designprofil/farger/',
      },
      {
        title: 'Typografi',
        href: 'https://www.udir.no/om-udir/designprofil/typografi/',
      },
    ],
  },
  {
    heading: 'Illustrasjoner',
    links: [
      {
        title: 'Illustrasjoner',
        href: 'https://www.figma.com/design/QeYBL9fzDCk87WNWcDSQi7/01-Illustrasjoner---barnehage?node-id=457-13863',
      },
      {
        title: 'Symboler',
        href: 'https://www.figma.com/design/SSdGSjSYPDSyX2IfHLfmEL/Symbolbibliotek?node-id=0-1&p=f&m=dev',
      },
      {
        title: 'Ikoner',
        href: 'https://www.figma.com/design/W4tl2t6G22muQfVF8jGeQX/Ikonbibliotek?node-id=9-2879&p=f&m=dev',
      },
    ],
  },
  {
    heading: 'Nyttige lenker',
    links: [
      { title: 'Komponenter', href: 'https://design.udir.no/' },
      {
        title: 'Figma',
        href: 'https://www.figma.com/files/1290654482467394866/team/1306917640909073413/Team?fuid=1464219835118877209',
      },
      {
        title: 'Github',
        href: 'https://github.com/Utdanningsdirektoratet/designsystem',
      },
    ],
  },
];

export const WithMegaMenu: Story = {
  render: () => (
    <Header applicationName="Tjenestenavn">
      <Header.MenuButton variant="primary" />
      <Header.Menu>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'var(--ds-size-10)',
            justifyItems: 'center',
            gap: 'var(--ds-size-4)',
            rowGap: 'var(--ds-size-10)',
          }}
        >
          {menuLinks.map((column) => (
            <div key={column.heading}>
              <Heading
                level={3}
                data-size="xs"
                style={{ marginBottom: 'var(--ds-size-3)' }}
              >
                {column.heading}
              </Heading>
              <ListUnordered>
                {column.links.map((link) => (
                  <ListItem key={link.title}>
                    <Link href={link.href} style={{ textDecoration: 'none' }}>
                      <ChevronRightIcon aria-hidden />
                      <span>{link.title}</span>
                    </Link>
                  </ListItem>
                ))}
              </ListUnordered>
            </div>
          ))}
        </div>
      </Header.Menu>
    </Header>
  ),
};

export const WithSimpleMenu: Story = {
  render() {
    return (
      <Header applicationName="Tjenestenavn">
        <Header.MenuButton popovertarget="header-simple-menu" />
        <Dropdown
          id="header-simple-menu"
          placement="bottom-end"
          autoPlacement={false}
        >
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
      <Header applicationName="Tjenestenavn">
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

export const Responsive: Story = {
  render() {
    return (
      <Header applicationName="Tjenestenavn">
        <Link href="https://design.udir.no/" data-hide="lg">
          Komponenter
        </Link>
        <Link
          href="https://www.figma.com/files/1290654482467394866/team/1306917640909073413/Team?fuid=1464219835118877209"
          data-hide="lg"
        >
          Figma
        </Link>
        <Link
          href="https://github.com/Utdanningsdirektoratet/designsystem"
          data-hide="lg"
        >
          Github
        </Link>
        <Header.UserButton
          username="Stian Hansen"
          userRole="Admin"
          popovertarget="usermenu2"
          data-hide="md"
          avatar={<Avatar aria-label="Stian Hansen">SH</Avatar>}
        />
        <Dropdown id="usermenu2" placement="bottom-end" autoPlacement={false}>
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
        <Header.Menu>
          <Header.UserButton
            username="Stian Hansen"
            userRole="Admin"
            popovertarget="usermenuInMenu"
            avatar={<Avatar aria-label="Stian Hansen">SH</Avatar>}
            style={{ justifySelf: 'end' }}
            data-show="md"
          />
          <Dropdown
            id="usermenuInMenu"
            placement="bottom-end"
            autoPlacement={false}
          >
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              justifyItems: 'center',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            {menuLinks.map((column) => (
              <div
                key={column.heading}
                data-show={column.heading === 'Nyttige lenker' ? 'lg' : ''}
              >
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ChevronRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </div>
        </Header.Menu>
      </Header>
    );
  },
};

const educationLinks = [
  {
    heading: 'Velg nivå',
    links: [
      {
        title: 'Barnehage',
        href: 'https://www.udir.no/utdanningslopet/barnehage/',
      },
      {
        title: 'Grunnskole',
        href: 'https://www.udir.no/utdanningslopet/grunnskole/',
      },
      {
        title: 'Videregående',
        href: 'https://www.udir.no/utdanningslopet/videregaende-opplaring/',
      },
    ],
  },
  {
    heading: 'Spesielt for',
    links: [
      {
        title: 'Private barnehager',
        href: 'https://www.udir.no/utdanningslopet/private-barnehager/',
      },
      {
        title: 'Private skoler',
        href: 'https://www.udir.no/utdanningslopet/spesielt-for-private-skoler/',
      },
      {
        title: 'Voksenopplæring',
        href: 'https://www.udir.no/laring-og-trivsel/voksenopplaring/',
      },
    ],
  },
  {
    heading: 'Annen opplæring',
    links: [
      {
        title: 'SFO',
        href: 'https://www.udir.no/utdanningslopet/sfo/',
      },
      {
        title: 'Kulturskolen',
        href: 'https://www.udir.no/utdanningslopet/kulturskolen/',
      },
      {
        title: 'Folkehøgskoler',
        href: 'https://www.udir.no/om-udir/tilskudd-og-prosjektmidler/tilskudd-for-folkehogskoler/',
      },
    ],
  },
];

const learningLinks = [
  {
    heading: 'Barnehage',
    links: [
      {
        title: 'Barnehagemiljø',
        href: 'https://www.udir.no/laring-og-trivsel/barnehagemiljo/',
      },
      {
        title: 'Omsorg',
        href: 'https://www.udir.no/laring-og-trivsel/rammeplan-for-barnehagen/barnehagens-formal-og-innhold/omsorg/',
      },
      {
        title: 'Lek',
        href: 'https://www.udir.no/laring-og-trivsel/rammeplan-for-barnehagen/barnehagens-formal-og-innhold/lek/',
      },
    ],
  },
  {
    heading: 'Skole og fagopplæring',
    links: [
      {
        title: 'Læreplanverket',
        href: 'https://www.udir.no/laring-og-trivsel/lareplanverket/',
      },
      {
        title: 'Tilpasset opplæring',
        href: 'https://www.udir.no/laring-og-trivsel/lareplanverket/stotte/tilpasset-opplaring/',
      },
      {
        title: 'Vurderingspraksis',
        href: 'https://www.udir.no/laring-og-trivsel/vurdering/',
      },
    ],
  },
  {
    heading: 'Temasider',
    links: [
      {
        title: 'Overganger',
        href: 'https://www.udir.no/laring-og-trivsel/overganger-barn-elever-tilrettelegging/',
      },
      {
        title: 'Spesialpedagogikk',
        href: 'https://www.udir.no/laring-og-trivsel/spesialpedagogikk/',
      },
      {
        title: 'Samisk',
        href: 'https://www.udir.no/laring-og-trivsel/samisk/',
      },
    ],
  },
];

export const WithMegaMenus: Story = {
  render() {
    const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);
    const [isLearningMenuOpen, setLearningMenuOpen] = useState(false);
    return (
      <Header applicationName="Tjenestenavn">
        <Button
          popovertarget="header-education-menu"
          variant="tertiary"
          onClick={() => {
            setEducationMenuOpen(!isEducationMenuOpen);
          }}
        >
          Utdanningsløpet
          {isEducationMenuOpen ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Button>
        <Header.Menu
          id="header-education-menu"
          open={isEducationMenuOpen}
          onClose={() => setEducationMenuOpen(false)}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              justifyItems: 'center',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            {educationLinks.map((column) => (
              <div key={column.heading}>
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ChevronRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </div>
        </Header.Menu>
        <Button
          popovertarget="header-learning-menu"
          variant="tertiary"
          onClick={() => {
            setLearningMenuOpen(!isLearningMenuOpen);
          }}
        >
          Læring
          {isLearningMenuOpen ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Button>
        <Header.Menu
          id="header-learning-menu"
          open={isLearningMenuOpen}
          onClose={() => setLearningMenuOpen(false)}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              justifyItems: 'center',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            {learningLinks.map((column) => (
              <div key={column.heading}>
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ChevronRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </div>
        </Header.Menu>
        <Header.MenuButton variant="secondary" />
        <Dropdown
          id="uds-header-menu"
          placement="bottom-end"
          autoPlacement={false}
        >
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>
                <Avatar aria-label="Kai Nordmann" />
                Kai Nordmann
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item style={{ margin: 'var(--ds-size-2) 0' }}>
              <Dropdown.Button>
                Varsler <Badge count={8} />
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button variant="tertiary">
                <LeaveIcon aria-hidden />
                Logg ut
              </Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Header>
    );
  },
};

export const WithLinksAndMenu: Story = {
  render() {
    return (
      <Header applicationName="Tjenestenavn">
        <Link href="https://design.udir.no/">Komponenter</Link>
        <Link href="https://www.figma.com/files/1290654482467394866/team/1306917640909073413/Team?fuid=1464219835118877209">
          Figma
        </Link>
        <Link href="https://github.com/Utdanningsdirektoratet/designsystem">
          Github
        </Link>
        <Header.MenuButton variant="secondary" />
        <Header.Menu>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              justifyItems: 'center',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            {menuLinks.map((column) => (
              <div key={column.heading}>
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ChevronRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </div>
        </Header.Menu>
      </Header>
    );
  },
};

const linksUdirNo = [
  {
    heading: 'Utdanningsløpet',
    links: [
      { title: 'Barnehage', href: '#' },
      { title: 'Grunnskole', href: '#' },
      { title: 'Videregående', href: '#' },
      { title: 'Opplæring i bedrift', href: '#' },
      { title: 'Voksenopplæring', href: '#' },
      { title: 'SFO', href: '#' },
      { title: 'Kulturskolen', href: '#' },
      { title: 'Folkehøgskole', href: '#' },
    ],
  },
  {
    heading: 'Læring og trivsel',
    links: [
      { title: 'Rammeplaner', href: '#' },
      { title: 'Læreplaner', href: '#' },
      { title: 'Skolemiljø', href: '#' },
      { title: 'Tilpasset opplæring', href: '#' },
      { title: 'Spesialpedagogikk', href: '#' },
      { title: 'Fravær', href: '#' },
    ],
  },
  {
    heading: 'Prøver og vurdering',
    links: [
      { title: 'Eksamen', href: '#' },
      { title: 'Kartleggingsprøver', href: '#' },
      { title: 'Nasjonale prøver', href: '#' },
      { title: 'Vitnemål og kompetansebevis', href: '#' },
      { title: 'Realkompetansevurdering', href: '#' },
    ],
  },
  {
    heading: 'Kompetanse og tilskudd',
    links: [
      { title: 'Lede kvalitetsutvikling', href: '#' },
      { title: 'Videreutdanning', href: '#' },
      { title: 'Kompetansetilbud', href: '#' },
      { title: 'Sikkerhet og beredskap', href: '#' },
      { title: 'Kvalitet i læremidler', href: '#' },
      { title: 'Digital praksis', href: '#' },
      { title: 'Tilskudd', href: '#' },
    ],
  },
  {
    heading: 'Tall og forskning',
    links: [
      { title: 'Elevundersøkelsen', href: '#' },
      { title: 'Læringsundersøkelsen', href: '#' },
      { title: 'Foreldreundersøkelsen i barnehage', href: '#' },
      { title: 'Statistikk', href: '#' },
      { title: 'Forskning', href: '#' },
      { title: 'Internasjonale studier', href: '#' },
      { title: 'Kunnskapsoversikter', href: '#' },
      { title: 'Datainnsamling', href: '#' },
    ],
  },
  {
    heading: 'Regelverk og tilsyn',
    links: [
      { title: 'Regelverk for barnehage', href: '#' },
      { title: 'Regelverk for skole og opplæring', href: '#' },
      { title: 'Tilsyn', href: '#' },
      { title: 'Melde bekymring', href: '#' },
    ],
  },
];

export const UdirNo: Story = {
  render() {
    return (
      <Header applicationName="Utdanningsdirektoratet">
        <Search style={{ maxWidth: '280px' }}>
          <Search.Input aria-label="Søk" placeholder="Søk" />
          <Search.Clear />
        </Search>
        <Header.MenuButton variant="primary" />
        <Header.Menu>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(23rem, 1fr))',
              maxWidth: '1280px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            {linksUdirNo.map((column) => (
              <div key={column.heading}>
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ChevronRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </div>
        </Header.Menu>
      </Header>
    );
  },
};
