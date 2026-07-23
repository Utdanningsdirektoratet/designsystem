import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './stableAnnouncement.module.css';

export function StableAnnouncement() {
  return (
    <Card className={styles.card}>
      <Card.Block className={styles.imgContainer}>
        {/* eslint-disable jsx-a11y/no-redundant-roles -- Without this, SVG src may cause VoiceOver to enumerate internal SVG elements in older Safari versions. See https://bugs.webkit.org/show_bug.cgi?id=216364 */}
        <img
          src={`${import.meta.env.BASE_URL}img/feiring.svg`}
          alt={'Feiring'}
          role="img"
        />
        {/* eslint-enable jsx-a11y/no-redundant-roles */}
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
