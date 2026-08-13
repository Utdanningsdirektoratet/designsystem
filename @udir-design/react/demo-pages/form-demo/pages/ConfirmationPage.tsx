import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import classes from '../FormDemo.module.css';

export const ConfirmationPage = () => (
  <div className={classes.confirmation}>
    <Heading level={2} data-size="sm">
      Kvittering
    </Heading>
    <Paragraph data-size="xl">Takk!</Paragraph>
    <Paragraph>
      Vi har mottatt din søknad. Du hører tilbake innen en måned.
    </Paragraph>
  </div>
);
