import type { ReactNode } from 'react';
import { Link } from 'src/components/link/Link';
import { List } from 'src/components/list/List';

interface HeadingMeta {
  size: 'xs' | 'sm' | 'md' | 'lg';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id?: string;
}

export interface SectionItem {
  heading?: HeadingMeta;
  paragraph: string | ReactNode;
}

export const sectionHeader: SectionItem[] = [
  {
    paragraph:
      'Skolen skal tilpasse opplæringen for alle elever, lærlinger, lærekandidater og voksne. Tilpasset opplæring innebærer at elevene skal få et tilfredsstillende utbytte av opplæringen uavhengig av forutsetninger, og at alle skal få utnyttet og utviklet evnene sine.',
  },
];

export const section0: SectionItem[] = [
  {
    paragraph:
      'Skolen må gi alle elever mulighet til læring og utvikling uavhengig av forutsetningene deres. Dere skal legge til rette for en opplæring som ivaretar både fellesskapet og hver enkelt elev, slik at elevene får best mulig utbytte av opplæringen.',
  },
];

export const section1: SectionItem[] = [
  {
    heading: {
      size: 'md',
      level: 2,
      text: 'Følg med på utviklingen',
      id: 'follow-development',
    },
    paragraph:
      'Dere som jobber på skolen må følge med på utviklingen til elevene, og melde fra til rektor hvis det er tvil om at en elev har tilfredsstillende utbytte av opplæringen. Hvis det må til, skal dere sette i gang egnede tiltak som kan bidra til at eleven får tilfredsstillende utbytte.',
  },
];

export const section1_2: SectionItem[] = [
  {
    paragraph:
      'For elever på 1. til 4. trinn som står i fare for ikke å ha forventet progresjon i lesing, skriving eller regning skal dere også sette i gang med intensiv opplæring.',
  },
];

export const section2: SectionItem[] = [
  {
    heading: {
      size: 'md',
      level: 2,
      text: 'Læreplanverket gir et stort handlingsrom til å tilpasse opplæringen',
      id: 'curriculum-framework',
    },
    paragraph:
      'Dere lærere har et stort handlingsrom til å prøve ut ulike tiltak for å tilpasse opplæringen for elevene deres. Deres kjennskap til elevene og profesjonsfaglige skjønn er avgjørende for å fange opp elevenes behov, og for å lykkes med tilpasningene.',
  },
];

export const section3: SectionItem[] = [
  {
    heading: {
      size: 'md',
      level: 2,
      text: 'Eksempler på virkemidler',
      id: 'examples-of-measures',
    },
    paragraph:
      'Nedenfor følger noen eksempler på tiltak og virkemidler som kan hjelpe dere å tilpasse opplæringen. Det er ikke en uttømmende liste, men ment som støtte for å komme i gang.',
  },
];

export const section4: SectionItem[] = [
  {
    heading: {
      size: 'md',
      level: 2,
      text: 'Intensiv opplæring',
      id: 'intensive-education',
    },
    paragraph:
      'Intensiv opplæring for 1.-4. trinn er en del av den tilpassede opplæringen. Det skal være en kortvarig og målrettet innsats fra skolen i lesing, skriving eller regning for elevene som har behov for det. Målet er at elevene raskt skal få egnet støtte og oppfølging, slik at problemene ikke får mulighet til å utvikle og forsterke seg videre i opplæringsløpet.',
  },
];

export const section4_2: SectionItem[] = [
  {
    paragraph:
      'Hvordan dere bør gjennomføre den intensive opplæringen, må dere vurdere ut ifra behovene til eleven og andre mulige tiltak i opplæringen. Intensiv opplæring kan skje i grupper og i noen tilfeller én-til-én. Det er dere som er nærmest til å vurdere hvordan intensiv opplæring best kan organiseres og gjennomføres. Vi vil likevel understreke at eleven skal bli hørt, at hensynet til elevens beste skal ivaretas og at inkludering er et grunnleggende prinsipp i norsk skole.',
  },
];

export const section5: SectionItem[] = [
  {
    heading: {
      size: 'md',
      level: 2,
      text: 'Nyttige lenker',
      id: 'useful-links',
    },
    paragraph: (
      <List.Unordered
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        <List.Item>
          <Link
            href="https://www.udir.no/regelverk-og-tilsyn/skole-og-opplaring/veileder-for-tilpasset-opplaring-og-individuell-tilrettelegging/"
            data-size="md"
          >
            Veileder for tilpasset opplæring og individuell tilrettelegging
          </Link>
        </List.Item>
        <List.Item>
          <Link
            href="https://www.udir.no/laring-og-trivsel/lareplanverket/stotte/tilpasset-opplaring/vurdere-om-eleven-har-tilfredsstillende-utbytte-av-opplaringen/"
            data-size="md"
          >
            Vurdere om eleven har tilfredsstillende utbytte av opplæringen
          </Link>
        </List.Item>
        <List.Item>
          <Link
            href="https://www.udir.no/laring-og-trivsel/spesialpedagogikk/tilrettelegging-for-barn-og-elever-med-behov-for-ekstra-stotte/"
            data-size="md"
          >
            Tilrettelegging for barn og elever med behov for ekstra støtte
          </Link>
        </List.Item>
      </List.Unordered>
    ),
  },
];
