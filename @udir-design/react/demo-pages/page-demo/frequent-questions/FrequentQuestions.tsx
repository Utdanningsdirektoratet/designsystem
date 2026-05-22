import {
  KokkehattFillSymbol,
  SikkerhetFillSymbol,
  SkoleFillSymbol,
} from '@udir-design/symbols';
import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './FrequentQuestions.module.scss';

export const FrequentQuestions = () => {
  return (
    <div className={styles.wrapper}>
      <Heading>Hva kan vi hjelpe deg med?</Heading>
      <div className={styles.cards}>
        <Card variant="tinted" data-color="accent">
          <SikkerhetFillSymbol aria-label="Sikkerhet" size="5rem" />
          <Heading>Sikkerhet og drift</Heading>
          <Paragraph>
            Finn informasjon om personvern, tilgangsstyring og sikker håndtering
            av data i skole og barnehage.
          </Paragraph>
        </Card>
        <Card variant="tinted" data-color="support1">
          <div className={styles.symbolWrapper}>
            <SkoleFillSymbol aria-label="Skole" size="5rem" />
          </div>
          <Heading>Skole og utdanning</Heading>
          <Paragraph>
            Les om regelverket for grunnskole og videregående opplæring, og finn
            veiledning for lærere og skoleledere.
          </Paragraph>
        </Card>
        <Card variant="tinted" data-color="support2">
          <KokkehattFillSymbol aria-label="Kokkehatt" size="5rem" />
          <Heading>Mat og helse</Heading>
          <Paragraph>
            Krav og retningslinjer for måltider i barnehage og skole, inkludert
            allergihåndtering og ernæringsveiledning.
          </Paragraph>
        </Card>
      </div>
    </div>
  );
};
