import { Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '../FormDemo';
import { RankingTable } from '../ranking-table/RankingTable';
import { Heading } from '@digdir/designsystemet-react';

const DATA_RANKINGS = ['Uenig', 'Nøytral', 'Enig'];

const DATA_ASSERTIONS = [
  'Jeg føler meg trygg på skolen',
  'Jeg har det bra på skolen',
  'Jeg har venner på skolen',
  'Jeg har en god relasjon til lærerne mine',
  'Jeg har en god relasjon til medelevene mine',
];

type RankingPageProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export const RankingPage = ({ control, errors }: RankingPageProps) => {
  const rankingError = errors.rankings
    ? Object.values(errors.rankings)[0]
    : undefined;
  return (
    <>
      <Heading level={2} data-size="sm">
        Valgmuligheter
      </Heading>
      <RankingTable
        assertions={DATA_ASSERTIONS}
        rankings={DATA_RANKINGS}
        control={control}
        error={rankingError}
      />
    </>
  );
};
