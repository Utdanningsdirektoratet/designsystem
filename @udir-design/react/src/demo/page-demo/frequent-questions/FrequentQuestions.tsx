import { Card, Heading, Paragraph } from '../../../alpha';
import styles from './FrequentQuestions.module.scss';

export const FrequentQuestions = () => {
  return (
    <div className={styles.wrapper}>
      <Heading>Hva kan vi hjelpe deg med?</Heading>
      <div className={styles.cards}>
        <Card variant="tinted" data-color="accent">
          <Heading>Sikkerhet og drift</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain.
          </Paragraph>
        </Card>
        <Card variant="tinted" data-color="support1">
          <Heading>Skole og utdanning</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain.
          </Paragraph>
        </Card>
        <Card variant="tinted" data-color="support2">
          <Heading>Mat og helse</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain.
          </Paragraph>
        </Card>
      </div>
    </div>
  );
};
