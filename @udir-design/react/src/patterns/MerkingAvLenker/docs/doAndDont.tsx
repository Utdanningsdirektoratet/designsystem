import { Do, Dont, Stack } from '.storybook/docs/components';
import { Link } from 'src/components/link';
import { List } from 'src/components/list';

/** Udir-eksempler erstatter Digdirs skjermbilder av lenkelister i en skjermleser. */
export const LenkelisteISkjermleser = () => {
  return (
    <Stack>
      <Do description="Skriv lenketekster som gir mening uten ekstra kontekst.">
        <List.Unordered>
          <List.Item>
            <Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/">
              Læreplanverket på udir.no
            </Link>
          </List.Item>
          <List.Item>
            <Link href="https://www.udir.no/eksamen-og-prover/eksamen/">
              Forberede og gjennomføre eksamen
            </Link>
          </List.Item>
          <List.Item>
            <Link href="https://www.udir.no/regelverk-og-tilsyn/">
              Regelverk og tilsyn
            </Link>
          </List.Item>
        </List.Unordered>
      </Do>
      <Dont description="Unngå generiske eller gjentatte lenketekster.">
        <List.Unordered>
          <List.Item>
            <Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/">
              Vis mer
            </Link>
          </List.Item>
          <List.Item>
            <Link href="https://www.udir.no/eksamen-og-prover/eksamen/">
              Lenke til dokument
            </Link>
          </List.Item>
          <List.Item>
            <Link href="https://www.udir.no/regelverk-og-tilsyn/">Les mer</Link>
          </List.Item>
        </List.Unordered>
      </Dont>
    </Stack>
  );
};
