import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from './Prose';
import { Paragraph, Heading } from '../index';
import { Alert, Details, Divider, Link, List, Table } from '../../beta';

const meta: Meta<typeof Prose> = {
  component: Prose,
  tags: ['alpha', '!autodocs', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  title: 'Components/Typography/Prose',
};

export default meta;
type Story = StoryObj<typeof Prose>;

export const Preview: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Prose style={{ width: '800px' }}>
          <Alert>Denne artikkelen er mer enn 2 år gammel</Alert>
          <Heading data-size="xl" level={1}>
            Tilskudd til skolebibliotek
          </Heading>
          <Paragraph data-size="lg">
            Kommuner kan søke om tilskudd for å styrke skolebibliotekene i
            grunnskolen. Tilskuddet skal bidra til bedre leseferdigheter, økt
            leselyst hos elevene og til å fremme kritisk tenkning. Tiltak i
            levekårsutsatte områder vil prioriteres.
          </Paragraph>
          <div>
            <Divider />
            Tilskuddsordning | Sist endret: 29.05.2024
            <Divider />
          </div>
          <Heading data-size="lg" level={2}>
            Resultat fra årets behandling
          </Heading>
          <Paragraph>
            Søknadsbehandlingen for tilskudd til skolebibliotek for 2024 er
            ferdigstilt.
          </Paragraph>
          <Paragraph>
            Årets søkere vil snart få svar fra Utdanningsdirektoratet om
            utfallet av søknadsbehandlingen.
          </Paragraph>
          <Table id="myTable">
            <caption>Tildeling skolebibliotek 2024</caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Kommune</Table.HeaderCell>
                <Table.HeaderCell>Tildeling (kr)</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {dummyDataKommune.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.kommune}</Table.Cell>
                  <Table.Cell
                    style={{
                      fontFeatureSettings: "'tnum' 1",
                    }}
                  >
                    {item.tildeling}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Paragraph>
            Formålet med tilskuddsordningen er å styrke skolebibliotek i
            grunnskolen. Styrkingen av skolebibliotekene skal bidra til å
            utvikle språkferdighetene og leseferdighetene, øke leselyst hos
            elevene og til å fremme kritisk tenkning.
          </Paragraph>
          <Paragraph>
            Ordningen skal også bidra til sosial utjevning. Skolebiblioteket
            skal være en inkluderende arena for læring og leseglede for alle
            elevgrupper og i alle fag. Tiltak som gjelder skolebibliotek i
            levekårsutsatte områder, skal prioriteres.
          </Paragraph>
          <Heading data-size="lg" level={2}>
            Kriterier for å få tilskudd
          </Heading>
          <Paragraph>
            Det er kommunen som søker om tilskudd. Enkeltskoler kan ikke søke om
            midler.
          </Paragraph>
          <Paragraph>
            Søknaden må gjelde tilskudd til personalressurser eller utvikling av
            kompetanse for å legge til rette for lesing, leselyst og
            kildekritikk i regi av skolebibliotekene. Midler kan ikke gå til
            innkjøp av utstyr og bøker.
          </Paragraph>
          <Paragraph>Krav til innhold i søknaden:</Paragraph>
          <List.Unordered>
            <List.Item>
              en prosjektbeskrivelse som viser hvordan prosjektet skal bidra til
              å styrke skolebibliotekenes arbeid med lesing, leselyst og
              kildekritikk, og hvordan prosjektet kan kobles til årets
            </List.Item>
            <List.Item>
              en plan for bruk av skolebibliotek som en del av opplæringen i
              kommunen (se på ressurssiden skolebibliotek.no)
            </List.Item>
            <List.Item>
              en plan for videreføring etter endt prosjektperiode
            </List.Item>
            <List.Item>en egenfinansiering på minst 30 %</List.Item>
            <List.Item>
              informasjon om kvalitet og tilgjengelighet i skolebibliotekene
              (jf. opplæringsforskriften § 11-2)
            </List.Item>
            <List.Item>
              en beskrivelse av hvordan elevmedvirkning blir ivaretatt
            </List.Item>
          </List.Unordered>
          <Heading data-size="md" level={3}>
            Hvordan vurderer vi søknaden?
          </Heading>
          <Paragraph>
            Utdanningsdirektoratet gjør en skjønnsmessig vurdering av søknaden
            basert på hvordan prosjektbeskrivelsen svarer på kriterier for
            ordningen og eventuelle prioriteringer.
          </Paragraph>
          <Paragraph>
            Søknader som er ufullstendige med hensyn til kriteriene ovenfor, kan
            bli avslått. Vi behandler ikke søknader som kommer til oss etter
            søknadsfristen.
          </Paragraph>
          <div>
            <Details>
              <Details.Summary>Tildeling skolebibliotek 2023</Details.Summary>
              <Details.Content>
                Du kan{' '}
                <Link href="https://www.udir.no/om-udir/tilskudd-og-prosjektmidler/midler-kommuner/sok-om-tilskudd-til-skolebibliotek/">
                  lese om tidligere tildeling her.
                </Link>
              </Details.Content>
            </Details>
            <Details>
              <Details.Summary>Tildeling skolebibliotek 2022</Details.Summary>
              <Details.Content>
                Du kan{' '}
                <Link href="https://www.udir.no/om-udir/tilskudd-og-prosjektmidler/midler-kommuner/sok-om-tilskudd-til-skolebibliotek/">
                  lese om tidligere tildeling her.
                </Link>
              </Details.Content>
            </Details>
          </div>
        </Prose>
      </div>
    );
  },
};

const dummyDataKommune = [
  {
    id: 1,
    kommune: 'Bjerkreim kommune',
    tildeling: '330 000',
  },
  {
    id: 2,
    kommune: 'Færder kommune',
    tildeling: '750 000',
  },
  {
    id: 3,
    kommune: 'Gjøvik kommune',
    tildeling: '150 000',
  },
  {
    id: 4,
    kommune: 'Hurdal kommune',
    tildeling: '550 000',
  },
  {
    id: 5,
    kommune: 'Marker kommune',
    tildeling: '900 000',
  },
  {
    id: 6,
    kommune: 'Nordreisa kommune',
    tildeling: '304 000',
  },
];

export const Headings: Story = {
  render: () => {
    return (
      <Prose>
        <Heading level={1} data-size="2xl">
          Heading xxl
        </Heading>
        <Paragraph data-size="xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={2} data-size="xl">
          Heading xl
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={3} data-size="lg">
          Heading lg
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={4} data-size="md">
          Heading md
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={5} data-size="sm">
          Heading sm
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={6} data-size="xs">
          Heading xs
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={6} data-size="2xs">
          Heading xxs
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
      </Prose>
    );
  },
};
