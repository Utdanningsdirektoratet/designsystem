import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './stableAnnouncement.module.css';

export function StableAnnouncement() {
  return (
    <Card className={styles.card}>
      <Card.Block className={styles.imgContainer}>
        <img
          src={`${import.meta.env.BASE_URL}img/feiring.svg`}
          alt={'Feiring'}
          role="img"
        />
      </Card.Block>
      <Card.Block>
        <Heading level={2}>Udirs designsystem er lansert!</Heading>
        <Paragraph>
          Etter grundig kartlegging, pilotering, design og utvikling er vi glade
          for å lansere den første stabile versjonen av Udirs designsystem!
        </Paragraph>
        <Paragraph>
          Versjon 1.0.0 er resultatet av et solid samarbeid på tvers av
          avdelinger og leverandører. Tusen takk til alle dere som har testet
          betaversjonen, gitt tilbakemeldinger, stilt spørsmål, meldt inn behov
          og bidratt underveis. Vi har vært avhengig av dette for å sikre at
          designsystemet treffer behovene til dere som skal bruke det.
        </Paragraph>
      </Card.Block>
    </Card>
  );
}
