import preview from '.storybook/preview';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';
import { List } from './List';

const meta = preview.meta({
  component: List.Unordered,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
  },
});

export const Preview = meta.story({
  render: (args) => (
    <List.Unordered {...args}>
      <List.Item>listepunkt 1</List.Item>
      <List.Item>listepunkt 2</List.Item>
      <List.Item>listepunkt 3</List.Item>
    </List.Unordered>
  ),
});

export const Ordered = meta.story({
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
        <List.Item>Presenter en problemstilling.</List.Item>
        <List.Item>Gå sammen to og to for å reflektere.</List.Item>
        <List.Item>Del innsikter og spørsmål i plenum.</List.Item>
        <List.Item>Noter ned viktige innspill og refleksjoner.</List.Item>
      </List.Ordered>
    </>
  ),
});

export const Unordered = meta.story({
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
});

export const Indented = meta.story({
  args: {
    style: { marginTop: 'var(--ds-size-2)' },
  },
  render: ({ ref: _ref, ...args }) => (
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
          </List.Unordered>
        </List.Item>
      </List.Ordered>
    </>
  ),
});

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

export const WithLinks = meta.story({
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
});

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

export const AsNav = meta.story({
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
});
