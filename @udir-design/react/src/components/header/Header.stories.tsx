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
  Paragraph,
} from '@udir-design/react/alpha';
import { useState } from 'react';
import { ArrowRightIcon, BriefcaseIcon, LeaveIcon } from '@udir-design/icons';
import styles from './header.stories.module.css';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
  },
  args: {
    applicationName: 'Tjenestenavn',
  },
  decorators: [withResponsiveDataSize],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Preview: Story = {
  args: {
    sticky: false,
  },
  render: (args) => <Header {...args} />,
};

const profileImage =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const WithUserButton: Story = {
  render: (args) => (
    <Header {...args}>
      <Header.UserButton
        username="Stian Hansen"
        userRole="Admin"
        popovertarget="usermenu"
        avatar={
          <Avatar aria-hidden>
            <img src={profileImage} alt="Stian Hansen" />
          </Avatar>
        }
        data-color="accent"
        data-show="sm"
      />
      <Dropdown id="usermenu" placement="bottom-end" autoPlacement={false}>
        <Dropdown.List>
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

      {/* Small screen: swap UserButton with avatar button on "sm" */}
      <Button popovertarget="usermenuSmall" variant="tertiary" data-hide="sm">
        <Avatar aria-label="Stian Hansen">
          <img src={profileImage} alt="" />
        </Avatar>
      </Button>
      <Dropdown id="usermenuSmall" placement="bottom-end" autoPlacement={false}>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Heading>Detaljer</Dropdown.Heading>
          </Dropdown.Item>
          <Dropdown.Item style={{ marginLeft: 'var(--ds-size-4)' }}>
            <Paragraph>Stian Hansen</Paragraph>
          </Dropdown.Item>
          <Dropdown.Item
            style={{
              marginLeft: 'var(--ds-size-4)',
              marginBottom: 'var(--ds-size-4)',
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
  ),
};

export const WithSearch: Story = {
  render(args) {
    const [value, setValue] = useState('');
    return (
      <Header {...args}>
        <Header.Search>
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

export const WithNavigationLinks: Story = {
  render: (args) => (
    <Header {...args}>
      <Header.Navigation data-show="sm">
        <Header.Navigation.Item href="#">Navlink 1</Header.Navigation.Item>
        <Header.Navigation.Item href="#" active>
          Navlink 2
        </Header.Navigation.Item>
        <Header.Navigation.Item href="#">Navlink 3</Header.Navigation.Item>
      </Header.Navigation>
      <Header.MenuButton data-hide="sm" />
      <Header.Menu>
        <nav
          aria-label="header-menu-navigation"
          style={{
            maxWidth: '800px',
            display: 'flex',
            padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
            gap: 'var(--ds-size-4)',
            rowGap: 'var(--ds-size-10)',
          }}
          className={styles.headerMenuSmall}
        >
          <ListUnordered>
            <ListItem>
              <Link href="#">
                <ArrowRightIcon aria-hidden />
                <span>Navlink 1</span>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#">
                <ArrowRightIcon aria-hidden />
                <span>Navlink 2</span>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#">
                <ArrowRightIcon aria-hidden />
                <span>Navlink 3</span>
              </Link>
            </ListItem>
          </ListUnordered>
        </nav>
      </Header.Menu>
    </Header>
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
        href: '#',
      },
    ],
  },
];

export const WithMenu: Story = {
  render: (args) => (
    <Header {...args}>
      <Header.MenuButton />
      <Header.Menu>
        <nav
          aria-labelledby="header-menu-navigation"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
            gap: 'var(--ds-size-4)',
            rowGap: 'var(--ds-size-10)',
          }}
          className={styles.headerMenuSmall}
        >
          <h2 id="header-menu-navigation" className="ds-sr-only">
            Menynavigasjon
          </h2>
          {menuLinks.map((column) => (
            <div key={column.heading}>
              <Heading
                level={3}
                data-size="xs"
                style={{ marginBottom: 'var(--ds-size-3)' }}
              >
                <Link href="#">{column.heading}</Link>
              </Heading>
              <ListUnordered>
                {column.links.map((link) => (
                  <ListItem key={link.title}>
                    <Link href={link.href} style={{ textDecoration: 'none' }}>
                      <ArrowRightIcon aria-hidden />
                      <span>{link.title}</span>
                    </Link>
                  </ListItem>
                ))}
              </ListUnordered>
            </div>
          ))}
        </nav>
      </Header.Menu>
    </Header>
  ),
};

const themeMenu1 = Array.from({ length: 3 }, (_, i) => ({
  heading: `Overskrift ${i + 1}`,
  links: Array.from({ length: i === 1 ? 4 : 3 }, (_, linkIndex) => ({
    title: `Link ${linkIndex + 1}`,
    href: '#',
  })),
}));

const themeMenu2 = Array.from({ length: 2 }, (_, i) => ({
  heading: `Overskrift ${i + 4}`,
  links: Array.from({ length: i === 1 ? 4 : 3 }, (_, linkIndex) => ({
    title: `Link ${linkIndex + 1}`,
    href: '#',
  })),
}));

export const WithThemeMenus: Story = {
  render(args) {
    return (
      <Header {...args}>
        <Header.ThemeMenuButton
          popovertarget="header-education-menu"
          data-show="md"
        >
          Temameny 1
        </Header.ThemeMenuButton>
        <Header.Menu id="header-education-menu">
          <nav
            aria-labelledby="header-menu-theme1-navigation"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
              justifyItems: 'center',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            <h2 id="header-menu-theme1-navigation" className="ds-sr-only">
              Temameny 1 navigasjon
            </h2>
            {themeMenu1.map((column) => (
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
                    <ListItem key={column.heading + link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ArrowRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </nav>
        </Header.Menu>
        <Header.ThemeMenuButton
          popovertarget="header-learning-menu"
          data-show="md"
        >
          Temameny 2
        </Header.ThemeMenuButton>
        <Header.Menu id="header-learning-menu">
          <nav
            aria-labelledby="header-menu-theme2-navigation"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              maxWidth: '500px',
              margin: '0 auto',
              padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
              justifyItems: 'center',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            <h2 id="header-menu-theme2-navigation" className="ds-sr-only">
              Temameny 2 navigasjon
            </h2>
            {themeMenu2.map((column) => (
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
                    <ListItem key={column.heading + link.title}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ArrowRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </nav>
        </Header.Menu>
        <Header.MenuButton data-hide="md" />
        <Header.Menu>
          <nav
            aria-labelledby="header-menu-navigation"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            <h2 id="header-menu-navigation" className="ds-sr-only">
              Menynavigasjon
            </h2>
            {themeMenu1.map((column) => (
              <div key={column.heading + 'mobile'}>
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={column.heading + link.title + 'mobile'}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ArrowRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
            {themeMenu2.map((column) => (
              <div key={column.heading + 'mobile'}>
                <Heading
                  level={3}
                  data-size="xs"
                  style={{ marginBottom: 'var(--ds-size-3)' }}
                >
                  {column.heading}
                </Heading>
                <ListUnordered>
                  {column.links.map((link) => (
                    <ListItem key={column.heading + link.title + 'mobile'}>
                      <Link href={link.href} style={{ textDecoration: 'none' }}>
                        <ArrowRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </nav>
        </Header.Menu>
      </Header>
    );
  },
};

const navAndMenuLinks = Array.from({ length: 3 }, (_, i) => ({
  heading: `Overskrift ${i + 1}`,
  links: Array.from({ length: i === 1 ? 4 : 3 }, (_, linkIndex) => ({
    title: `Link ${linkIndex + 1}`,
    href: '#',
  })),
}));

export const WithNavigationLinksAndMenu: Story = {
  render: (args) => (
    <Header {...args}>
      <Header.Navigation data-show="sm">
        <Header.Navigation.Item href="#" active>
          Navlink 1
        </Header.Navigation.Item>
        <Header.Navigation.Item href="#">Navlink 2</Header.Navigation.Item>
      </Header.Navigation>
      <Header.MenuButton />
      <Header.Menu>
        <nav
          aria-labelledby="header-menu-navigation"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))',
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'var(--ds-size-5) var(--ds-size-10) var(--ds-size-10)',
            gap: 'var(--ds-size-4)',
            rowGap: 'var(--ds-size-10)',
          }}
          className={styles.headerMenuSmall}
        >
          <h2 id="header-menu-navigation" className="ds-sr-only">
            Menynavigasjon
          </h2>
          <div data-hide="sm">
            <Heading
              level={3}
              data-size="xs"
              style={{ marginBottom: 'var(--ds-size-3)' }}
            >
              Navlinker
            </Heading>
            <ListUnordered>
              <ListItem>
                <Link href="#" style={{ textDecoration: 'none' }}>
                  <ArrowRightIcon aria-hidden />
                  <span>Navlink 1</span>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="#" style={{ textDecoration: 'none' }}>
                  <ArrowRightIcon aria-hidden />
                  <span>Navlink 2</span>
                </Link>
              </ListItem>
            </ListUnordered>
          </div>
          {navAndMenuLinks.map((column) => (
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
                      <ArrowRightIcon aria-hidden />
                      <span>{link.title}</span>
                    </Link>
                  </ListItem>
                ))}
              </ListUnordered>
            </div>
          ))}
        </nav>
      </Header.Menu>
    </Header>
  ),
};

const responsiveLinks = ['Navlinker', 'Overskrift 1', 'Overskrift 2'].map(
  (heading, index) => ({
    heading,
    links: Array.from(
      { length: index === 1 ? 5 : index === 2 ? 4 : 3 },
      (_, i) => ({
        title: heading === 'Navlinker' ? `Navlink ${i + 1}` : `Link ${i + 1}`,
        href: '',
      }),
    ),
  }),
);

export const Responsive: Story = {
  render(args) {
    return (
      <Header {...args}>
        <Header.Navigation data-show="lg">
          <Header.Navigation.Item href="#">Navlink 1</Header.Navigation.Item>
          <Header.Navigation.Item href="#" active>
            Navlink 2
          </Header.Navigation.Item>
          <Header.Navigation.Item href="#">Navlink 3</Header.Navigation.Item>
        </Header.Navigation>
        <Header.UserButton
          username="Stian Hansen"
          userRole="Admin"
          popovertarget="usermenu2"
          data-show="md"
          avatar={<Avatar aria-hidden>SH</Avatar>}
        />
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
        <Header.MenuButton />
        <Header.Menu>
          <Header.UserButton
            username="Stian Hansen"
            userRole="Admin"
            popovertarget="usermenuInMenu"
            avatar={<Avatar aria-hidden>SH</Avatar>}
            data-hide="md"
            style={{ width: 'stretch', margin: '0 var(--ds-size-5)' }}
          />
          <Dropdown
            id="usermenuInMenu"
            placement="bottom-end"
            autoPlacement={false}
          >
            <Dropdown.List>
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
          <nav
            aria-labelledby="header-menu-navigation"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--ds-size-10)',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
            className={styles.headerMenuSmall}
          >
            <h2 id="header-menu-navigation" className="ds-sr-only">
              Menynavigasjon
            </h2>
            {responsiveLinks.map((column) => (
              <div
                key={column.heading}
                data-hide={column.heading === 'Navlinker' ? 'lg' : ''}
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
                        <ArrowRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </nav>
        </Header.Menu>
      </Header>
    );
  },
};

export const AutoHideSticky: Story = {
  parameters: {
    customStyles: {
      height: '1200px',
      overflow: 'visible',
    },
  },
  render(args) {
    return (
      <>
        <Header {...args}>
          <Header.Navigation data-show="md">
            <Header.Navigation.Item href="#">Navlink 1</Header.Navigation.Item>
            <Header.Navigation.Item href="#" active>
              Navlink 2
            </Header.Navigation.Item>
            <Header.Navigation.Item href="#">Navlink 3</Header.Navigation.Item>
          </Header.Navigation>
          <Header.MenuButton variant="secondary" />
          <Header.Menu>
            <nav
              aria-labelledby="header-menu-navigation"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
                maxWidth: '800px',
                margin: '0 auto',
                padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
                gap: 'var(--ds-size-4)',
                rowGap: 'var(--ds-size-10)',
              }}
              className={styles.headerMenuSmall}
            >
              <h2 id="header-menu-navigation" className="ds-sr-only">
                Menynavigasjon
              </h2>
              {responsiveLinks.map((column) => (
                <div
                  key={column.heading}
                  data-hide={column.heading === 'Navlinker' ? 'md' : ''}
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
                        <Link
                          href={link.href}
                          style={{ textDecoration: 'none' }}
                        >
                          <ArrowRightIcon aria-hidden />
                          <span>{link.title}</span>
                        </Link>
                      </ListItem>
                    ))}
                  </ListUnordered>
                </div>
              ))}
            </nav>
          </Header.Menu>
        </Header>
        <div
          style={{
            padding: 'var(--ds-size-18)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-4)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <Heading level={1} data-size="lg">
            Samisk i skolen
          </Heading>
          <Paragraph style={{ marginTop: 'var(--ds-size-3)' }}>
            Alle elever skal lære om samer og samiske forhold i skolen. Retten
            til også å få undervisning i samiske språk og undervisning på samisk
            i andre fag, er ulik innenfor og utenfor samiske distrikt. I de
            samiske distriktene er norsk og samisk sidestilte i opplæringen.
          </Paragraph>
          <Heading level={2} style={{ marginTop: 'var(--ds-size-5)' }}>
            Rett til opplæring i samisk i videregående opplæring
          </Heading>
          <Paragraph>
            Det er innført en rett til opplæring i samisk i videregående
            opplæring for alle elever som har hatt opplæring i eller på samisk i
            grunnskolen. Dette gjelder uavhengig av om eleven har samisk
            bakgrunn eller ikke.
          </Paragraph>
          <Paragraph>
            Bakgrunnen for rettigheten er at elever som har hatt opplæring i
            samisk som første- eller andrespråk i grunnskolen får mulighet til å
            fortsette med opplæringen i samisk, og sikre eleven et helhetlig
            opplæringsløp. Det er ikke stilt krav om lengden på eller innholdet
            i opplæringen i grunnskolen, eks. om eleven har hatt samisk som
            første- eller andrespråk. Elevene har ikke rett til å velge et annet
            samisk språk i videregående opplæring enn det elevene hadde på
            grunnskolen.
          </Paragraph>
          <Paragraph>
            Retten til opplæring i samisk for samiske elever i videregående
            opplæring er videreført.
          </Paragraph>
          <Heading level={2} style={{ marginTop: 'var(--ds-size-5)' }}>
            Tilbud om del av opplæringen i et samiskspråklig miljø
          </Heading>
          <Paragraph>
            Det er tatt inn i loven at kommunen og fylkeskommunen skal gi eleven
            tilbud om del av opplæringen i et samiskspråklig miljø dersom det er
            nødvendig for at opplæringen skal være pedagogisk forsvarlig. Dette
            står i § 3-2 for grunnskolen og § 6-2 for videregående opplæring.
            Denne regelen tar i hovedsak sikte på tilfeller der opplæringen i
            samisk blir gitt som fjernundervisning.
          </Paragraph>
          <Paragraph>
            Vurderingen av om det er «nødvendig for at opplæringen skal være
            pedagogisk forsvarlig», handler om hvorvidt eleven skal kunne nå
            kompetansemålene i læreplanen. Det kan ikke knyttes til ytre rammer
            for eksempel hvor mange andre som snakker det samiskspråket i
            området, økonomi og ressurser.
          </Paragraph>
          <Paragraph>
            Hvor store deler av opplæringen i samisk det eventuelt er nødvendig
            å gi i et samiskspråklig miljø, kommer an på en konkret vurdering av
            om opplæringen gir eleven grunnlag for å nå kompetansemålene i
            læreplanen eller ikke.
          </Paragraph>
          <Divider style={{ marginTop: 'var(--ds-size-30)' }} />
          <Paragraph
            style={{
              marginTop: 'calc(var(--ds-size-30) * 2)',
              marginBottom: 'calc(var(--ds-size-30) * 2)',
            }}
          >
            (Annet innhold)
          </Paragraph>
          <Divider />
        </div>
      </>
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
  args: {
    applicationName: 'Utdanningsdirektoratet',
    href: 'https://www.udir.no/',
  },
  render() {
    return (
      <Header
        applicationName="Utdanningsdirektoratet"
        href="https://www.udir.no/"
      >
        <Search style={{ maxWidth: '280px' }} data-show="sm">
          <Search.Input aria-label="Søk" placeholder="Søk" />
          <Search.Clear />
        </Search>
        <Header.MenuButton variant="primary" />
        <Header.Menu>
          <Search
            style={{
              width: 'stretch',
              margin: 'var(--ds-size-5) var(--ds-size-5) 0',
            }}
            data-hide="sm"
          >
            <Search.Input aria-label="Søk" placeholder="Søk" />
            <Search.Clear />
          </Search>
          <nav
            aria-labelledby="header-menu-navigation"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
              maxWidth: '1280px',
              margin: '0 auto',
              padding: 'var(--ds-size-10) var(--ds-size-15)',
              gap: 'var(--ds-size-4)',
              rowGap: 'var(--ds-size-10)',
            }}
          >
            <h2 id="header-menu-navigation" className="ds-sr-only">
              Menynavigasjon
            </h2>
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
                        <ArrowRightIcon aria-hidden />
                        <span>{link.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </ListUnordered>
              </div>
            ))}
          </nav>
        </Header.Menu>
      </Header>
    );
  },
};
