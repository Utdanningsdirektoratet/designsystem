import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, Heading, Link, Button } from '@udir-design/react/alpha';

const meta: Meta<typeof List.Unordered> = {
  component: List.Unordered,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof List.Unordered>;
type OrderedStory = StoryObj<typeof List.Ordered>;

export const Preview: Story = {
  render: (args) => (
    <List.Unordered {...args}>
      <List.Item>List Item 1</List.Item>
      <List.Item>List Item 2</List.Item>
      <List.Item>List Item 3</List.Item>
    </List.Unordered>
  ),
};

export const Ordered: Story = {
  render: () => (
    <>
      <Heading
        level={2}
        data-size="xs"
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Slik gjennomfører dere metoden:
      </Heading>
      <List.Ordered>
        <List.Item>Presentere en problemstilling</List.Item>
        <List.Item>
          Refleksjon og summing: deltakerne går sammen to og to
        </List.Item>
        <List.Item>Gjennomgang i plenum</List.Item>
        <List.Item>Noter ned viktig innspill og refleksjoner</List.Item>
      </List.Ordered>
    </>
  ),
};

export const Unordered: Story = {
  render: (args) => (
    <>
      <Heading
        level={2}
        data-size="xs"
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Gjennom arbeid med kommunikasjon, språk og tekst skal barnehagen bidra
        til at barna
      </Heading>
      <List.Unordered {...args}>
        <List.Item>
          uttrykker sine følelser, tanker, meninger og erfaringer på ulike måter
        </List.Item>
        <List.Item>
          bruker språk til å skape relasjoner, delta i lek og som redskap til å
          løse konflikter
        </List.Item>
        <List.Item>
          videreutvikler sin begrepsforståelse og bruker et variert ordforråd
        </List.Item>
      </List.Unordered>
    </>
  ),
};

export const Indented: OrderedStory = {
  args: {
    style: { marginTop: 'var(--ds-size-2)' },
  },
  render: (args) => (
    <>
      <Heading level={2} data-size="xs">
        Innhold
      </Heading>
      <List.Ordered {...args}>
        <List.Item>
          Barnehagens verdigrunnlag
          <List.Unordered>
            <List.Item>Barn og barndom</List.Item>
            <List.Item>Demokrati</List.Item>
            <List.Item>Mangfold og gjensidig respekt</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          Ansvar og roller
          <List.Unordered>
            <List.Item>Barnehageeier</List.Item>
            <List.Item>Styrer</List.Item>
            <List.Item>Pedagogisk leder</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          Barnehagens formål og innhold
          <List.Unordered>
            <List.Item>
              Barnehagen skal ivareta barnas behov for omsorg
            </List.Item>
            <List.Item>Barnehagen skal ivareta barnas behov for lek</List.Item>
            <List.Item>List Item 3.3</List.Item>
          </List.Unordered>
        </List.Item>
      </List.Ordered>
    </>
  ),
};

const designLinks = [
  {
    href: 'https://www.udir.no/om-udir/designprofil/identitet/',
    text: 'Identitet',
  },
  {
    href: 'https://www.udir.no/om-udir/designprofil/farger/',
    text: 'Farger',
  },
  {
    href: 'https://www.udir.no/om-udir/designprofil/typografi/',
    text: 'Typografi',
  },
];

export const WithLinks: Story = {
  args: {
    style: { listStyle: 'none', padding: 0 },
  },
  render: (args) => (
    <List.Unordered {...args}>
      {designLinks.map((link) => (
        <List.Item key={link.href}>
          <Link href={link.href} target="_blank">
            {link.text}
          </Link>
        </List.Item>
      ))}
    </List.Unordered>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <Heading
          level={2}
          data-size="2xs"
          style={{ marginBottom: 'var(--ds-size-2)' }}
        >
          List sm og Heading 2xs
        </Heading>
        <List.Unordered data-size="sm">
          {designLinks.map((link) => (
            <List.Item key={link.href}>
              <Link href={link.href} target="_blank">
                {link.text}
              </Link>
            </List.Item>
          ))}
        </List.Unordered>
      </div>
      <div>
        <Heading
          level={2}
          data-size="xs"
          style={{ marginBottom: 'var(--ds-size-2)' }}
        >
          List md og Heading xs
        </Heading>
        <List.Unordered data-size="md">
          {designLinks.map((link) => (
            <List.Item key={link.href}>
              <Link href={link.href} target="_blank">
                {link.text}
              </Link>
            </List.Item>
          ))}
        </List.Unordered>
      </div>
      <div>
        <Heading
          level={2}
          data-size="sm"
          style={{ marginBottom: 'var(--ds-size-2)' }}
        >
          List lg og Heading sm
        </Heading>
        <List.Unordered data-size="lg">
          {designLinks.map((link) => (
            <List.Item key={link.href}>
              <Link href={link.href} target="_blank">
                {link.text}
              </Link>
            </List.Item>
          ))}
        </List.Unordered>
      </div>
    </div>
  ),
};

const navLinks = [
  {
    href: 'https://www.udir.no/utdanningslopet/barnehage/',
    text: 'Barnehage',
  },
  {
    href: 'https://www.udir.no/utdanningslopet/grunnskole/',
    text: 'Grunnskole',
  },
  {
    href: 'https://www.udir.no/utdanningslopet/videregaende-opplaring/',
    text: 'Videregående',
  },
];

export const AsNav: Story = {
  args: {
    style: { listStyle: 'none', padding: 0 },
  },
  render: (args) => (
    <nav aria-label="Snarveier">
      <List.Unordered {...args}>
        {navLinks.map((link) => (
          <List.Item key={link.href}>
            <Link href={link.href} target="_blank">
              {link.text}
            </Link>
          </List.Item>
        ))}
      </List.Unordered>
    </nav>
  ),
};

export const AsMenu: Story = {
  args: {
    style: {
      listStyle: 'none',
      padding: 0,
    },
  },
  render: (args) => (
    <List.Unordered asChild>
      <menu {...args}>
        <List.Item>
          <Button variant="secondary">Kopier</Button>
        </List.Item>
        <List.Item>
          <Button variant="secondary">Klipp ut</Button>
        </List.Item>
        <List.Item>
          <Button variant="secondary">Lim inn</Button>
        </List.Item>
      </menu>
    </List.Unordered>
  ),
};
