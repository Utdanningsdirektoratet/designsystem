import { Heading } from '@digdir/designsystemet-react';
import type { PageProps } from '../FormDemo';
import { RankingTable } from '../ranking-table/RankingTable';

export const DATA_RANKINGS = ['Uenig', 'Nøytral', 'Enig'];

export const DATA_ASSERTIONS = [
  'Jeg føler meg trygg på skolen',
  'Jeg har det bra på skolen',
  'Jeg har venner på skolen',
  'Jeg har en god relasjon til lærerne mine',
  'Jeg har en god relasjon til medelevene mine',
];

export const RankingPage = (pageProps: PageProps) => (
  <>
    <Heading level={2} data-size="sm">
      Rangering
    </Heading>
    <RankingTable
      assertions={DATA_ASSERTIONS}
      rankings={DATA_RANKINGS}
      {...pageProps}
    />
  </>
);
