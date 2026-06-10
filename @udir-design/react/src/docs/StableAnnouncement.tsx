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
        <Heading level={2}>Udirs designsystem er stabilt!</Heading>
        <Paragraph>
          Etter to år med kartlegging, design og utvikling er vi glade for
          endelig å kunne tilby den første stabile versjonen av Udirs
          designsystem!
        </Paragraph>
        <Paragraph>
          Versjon 1.0.0 er resultatet av et solid kartleggingsarbeid, et godt
          samarbeid med Digdir og en grundig design- og utviklingsprosess. Takk
          til alle dere som har testet, gitt tilbakemeldinger og bidratt
          underveis. Vi er stolte av resultatet, og ser frem til å videreutvikle
          og forbedre designsystemet sammen med dere.
        </Paragraph>
      </Card.Block>
    </Card>
  );
}
