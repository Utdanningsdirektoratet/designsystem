import { Avatar, Card, Heading, Paragraph, Tabs } from '../../../alpha';
import classes from './Profile.module.css';
import {
  BriefcaseClockFillIcon,
  BriefcaseFillIcon,
  Buildings3FillIcon,
  CalendarFillIcon,
  EnvelopeClosedFillIcon,
  HouseFillIcon,
  LocationPinIcon,
  PhoneFillIcon,
} from '@navikt/aksel-icons';

export const Profile = () => {
  return (
    <Tabs.Panel value="tab3" className={classes.profile}>
      <Card variant="tinted">
        <Card.Block className={classes.cardHeader} />
        <Card.Block>
          <div className={classes.flex}>
            <Avatar aria-label="Stian Nordmann" />
            <Heading level={2}>Stian Nordmann</Heading>
          </div>
          <div className={classes.flex}>
            <PhoneFillIcon />
            <Paragraph>123 45 678</Paragraph>
          </div>
          <div className={classes.flex}>
            <EnvelopeClosedFillIcon />

            <a
              href="mailto: design@udir.no"
              target="_blank"
              rel="noopener noreferrer"
            >
              stian.nordmann@udir.no
            </a>
          </div>
        </Card.Block>
      </Card>
      <Card variant="tinted">
        <Card.Block>
          <Heading level={2}>Detaljer</Heading>
          <div className={classes.flex}>
            <CalendarFillIcon />
            <Paragraph>Fødselsdato: 15.01.1996</Paragraph>
          </div>
          <div className={classes.flex}>
            <BriefcaseFillIcon />
            <Paragraph>Stilling: Designer</Paragraph>
          </div>
          <div className={classes.flex}>
            <BriefcaseClockFillIcon />
            <Paragraph>Ansettelsesdato: 01.01.2025</Paragraph>
          </div>
        </Card.Block>
      </Card>
      <Card variant="tinted">
        <Card.Block>
          <Heading level={2}>Adresse</Heading>
          <div className={classes.flex}>
            <HouseFillIcon />
            <Paragraph>Adresse: Storgata 15</Paragraph>
          </div>
          <div className={classes.flex}>
            <LocationPinIcon />
            <Paragraph>Postkode: 0123</Paragraph>
          </div>
          <div className={classes.flex}>
            <Buildings3FillIcon />
            <Paragraph>By: Oslo</Paragraph>
          </div>
        </Card.Block>
      </Card>
    </Tabs.Panel>
  );
};
