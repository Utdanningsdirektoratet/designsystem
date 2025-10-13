import { Do, Dont, Stack } from '.storybook/docs/components';
import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';
import { Details } from '../Details';
import { List } from 'src/components/list/List';
import { Link } from 'src/components/link/Link';

export const DetailsEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Ved å bryte opp innholdet i flere Details blir det enklere for brukerne å finne det de leter etter.">
        <Ex1Do />
      </Do>
      <Dont description="Unngå å ha mange overskrifter og mye innhold i én Details.">
        <Ex1Dont />
      </Dont>
    </Stack>
  );
};

const Ex1Do = () => {
  return (
    <Stack gap="var(--ds-size-2)">
      <Heading level={3}>Innlogging i Udirs tjenester</Heading>
      <p>
        De fleste av Udirs tjenester benytter Feide eller UIDP for innlogging.
        Noen få bruker fortsatt UBAS, men disse vil på sikt fases ut.
      </p>
      <Card style={{ width: '100%' }}>
        <Details>
          <Details.Summary>Hva er Feide?</Details.Summary>
          <Details.Content>
            <p>
              Feide er den nasjonale løsningen for trygg innlogging og
              datadeling i utdanning og forskning.
            </p>
            <p>
              Svært mange av de digitale læremidlene og tjenestene som er i bruk
              i norsk utdanning, har Feide som innloggingsløsning.
            </p>
            <p>
              Med en Feide-bruker bruker elever, studenter, forskere og
              undervisere ett og samme brukernavn og passord til å logge inn på
              alle tjenester som har Feide som innloggingsløsning. De slipper
              med andre ord å huske ulike brukernavn og passord for ulike
              tjenester.
            </p>
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>Hva er UIDP?</Details.Summary>
          <Details.Content>
            <p>
              UIDP er Udirs nye løsning for identitets- og tilgangskontroll.
            </p>
            <p>
              Løsningen har som formål å sørge for sikker og lettfattelig
              pålogging for brukere til Utdanningsdirektoratets tjenester og å
              sørge for sikker maskintilgang til Utdanningsdirektoratets API-er.
              UIDP benyttes av over 30 systemer i Utdanningsdirektoratet og en
              betydelig mengde brukere fra sektor er registrert i systemet. I
              2019 hadde UIDP over 3 millioner pålogginger.
            </p>
            <p>
              Brukere kan logge inn med tre forskjellige identitetsleverandører:
              Feide, ID-porten og en lokal løsning der brukerne bare ligger i
              UIDP. Den lokale løsningen benyttes av elever og kandidater som
              ikke bruker Feide.
            </p>
            <p>
              UIDP er også integrert med Udir sin gamle påloggingsløsning UBAS.
            </p>
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>Hva er UBAS?</Details.Summary>
          <Details.Content>
            <p>
              UBAS er Udirs gamle løsning for identitets- og tilgangskontroll.
              Fra 2022 blir UBAS gradvis faset ut og erstattet med nyere
              fellesløsninger (UIDP, Feide, ID-porten, Altinn Autorisasjon).
            </p>
            <p>
              Etter overgang til nye løsninger vil tildeling av roller og
              tjenestetilganger som hovedregel gjøres i Altinn, og ikke lenger i
              UBAS.
            </p>
          </Details.Content>
        </Details>
      </Card>
    </Stack>
  );
};

const Ex1Dont = () => {
  return (
    <Stack gap="var(--ds-size-2)">
      <Heading level={3}>Innlogging i Udirs tjenester</Heading>
      <p>
        De fleste av Udirs tjenester benytter Feide eller UIDP for innlogging.
        Noen få bruker fortsatt UBAS, men disse vil på sikt fases ut.
      </p>
      <Card style={{ width: '100%' }}>
        <Details>
          <Details.Summary>Om de ulike innloggingsløsningene</Details.Summary>
          <Details.Content>
            <Heading level={4}>Hva er Feide?</Heading>
            <p>
              Feide er den nasjonale løsningen for trygg innlogging og
              datadeling i utdanning og forskning.
            </p>
            <p>
              Svært mange av de digitale læremidlene og tjenestene som er i bruk
              i norsk utdanning, har Feide som innloggingsløsning.
            </p>
            <p>
              Med en Feide-bruker bruker elever, studenter, forskere og
              undervisere ett og samme brukernavn og passord til å logge inn på
              alle tjenester som har Feide som innloggingsløsning. De slipper
              med andre ord å huske ulike brukernavn og passord for ulike
              tjenester.
            </p>
            <Heading level={4}>Hva er UIDP?</Heading>
            <p>
              UIDP er Udirs nye løsning for identitets- og tilgangskontroll.
            </p>
            <p>
              Løsningen har som formål å sørge for sikker og lettfattelig
              pålogging for brukere til Utdanningsdirektoratets tjenester og å
              sørge for sikker maskintilgang til Utdanningsdirektoratets API-er.
              UIDP benyttes av over 30 systemer i Utdanningsdirektoratet og en
              betydelig mengde brukere fra sektor er registrert i systemet. I
              2019 hadde UIDP over 3 millioner pålogginger.
            </p>
            <p>
              Brukere kan logge inn med tre forskjellige identitetsleverandører:
              Feide, ID-porten og en lokal løsning der brukerne bare ligger i
              UIDP. Den lokale løsningen benyttes av elever og kandidater som
              ikke bruker Feide.
            </p>
            <p>
              UIDP er også integrert med Udir sin gamle påloggingsløsning UBAS.
            </p>
            <Heading level={4}>Hva er UBAS?</Heading>
            <p>
              UBAS er Udirs gamle løsning for identitets- og tilgangskontroll.
              Fra 2022 blir UBAS gradvis faset ut og erstattet med nyere
              fellesløsninger (UIDP, Feide, ID-porten, Altinn Autorisasjon).
            </p>
            <p>
              Etter overgang til nye løsninger vil tildeling av roller og
              tjenestetilganger som hovedregel gjøres i Altinn, og ikke lenger i
              UBAS.
            </p>
          </Details.Content>
        </Details>
      </Card>
    </Stack>
  );
};

export const DetailsEx2 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk ramme dersom du bare har ett element i Details. Da vil det være lettere å identifisere at elementet kan interageres med.">
        <Ex2Do />
      </Do>
      <Dont description="Uten ramme er det vanskeligere å skille Details fra resten av innholdet.">
        <Ex2Dont />
      </Dont>
    </Stack>
  );
};

const ex2Content = (
  <>
    <Details.Summary>Vedlegg</Details.Summary>
    <Details.Content>
      <List.Unordered>
        <List.Item>
          Vedlegg 1:{' '}
          <Link href="#" target="_blank">
            Regler og retningslinjer.pdf
          </Link>{' '}
        </List.Item>
        <List.Item>
          Vedlegg 2:{' '}
          <Link href="#" target="_blank">
            Brevmal.docx
          </Link>{' '}
        </List.Item>
        <List.Item>
          Vedlegg 3:{' '}
          <Link href="#" target="_blank">
            Illustrasjoner.zip
          </Link>
        </List.Item>
      </List.Unordered>
    </Details.Content>
  </>
);

const Ex2Do = () => {
  return (
    <Card style={{ width: '100%' }} data-color="neutral">
      <Details>{ex2Content}</Details>
    </Card>
  );
};

const Ex2Dont = () => {
  return <Details style={{ width: '100%' }}>{ex2Content}</Details>;
};
