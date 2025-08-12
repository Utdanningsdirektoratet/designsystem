import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  Details,
  Divider,
  Heading,
  Link,
  Paragraph,
} from '@udir-design/react/alpha';
import { HTMLAttributes } from 'react';
import classes from './ArticleDemo.module.css';
import { ContentSection } from './content-section/ContentSection';
import { section1, section2, section3 } from './strings/sections';
import { changes } from './strings/changes';
import cl from 'clsx';
import { PrinterSmallIcon } from '@navikt/aksel-icons';

type ArticleDemoProps = HTMLAttributes<HTMLDivElement>;

export const ArticleDemo = ({ ...props }: ArticleDemoProps) => {
  return (
    <article {...props} className={cl(classes.article, classes.contentSpacing)}>
      <Breadcrumbs aria-label="Du er her:">
        <Breadcrumbs.Link aria-label="Tilbake til mer informasjon">
          Mer informasjon
        </Breadcrumbs.Link>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/">
              Generell informasjon
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/">
              Mer informasjon
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/stotte/planleggingsverktoy-i-lareplanvisning/">
              Læreplanverket
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
      <div className={cl(classes.contentWrapper, classes.contentSpacing)}>
        <Alert>Denne artikkelen er mer enn 2 år gammel</Alert>
        <div className={classes.headingWrapper}>
          <Heading data-size="md" level={1}>
            Læreplanverket
          </Heading>
          <Link
            href="#"
            data-size="md"
            onClick={(e) => {
              e.preventDefault();
              window.print();
            }}
          >
            <PrinterSmallIcon aria-hidden /> Skriv ut denne siden
          </Link>
        </div>
        <Card className={classes.card}>
          <Heading level={2} data-size="sm">
            Planleggingsverktøy
          </Heading>
          <Paragraph>
            Planleggingsverktøyet gir støtte til å ta i bruk læreplanene.
          </Paragraph>
        </Card>
        <ContentSection section={section1} />
        <ContentSection section={section2} />
        <ContentSection section={section3} />
        <Card>
          <Card.Block>
            <Heading level={2} data-size="sm">
              Endringer i verktøyet
            </Heading>
            <Paragraph>
              Vi går igjennom alle innspillene vi får, og med jevne mellomrom
              prioriterer vi hva vi gjør av endringer.
            </Paragraph>
          </Card.Block>
          {changes.map(({ summary, content }, i) => (
            <Details key={i}>
              <Details.Summary>{summary}</Details.Summary>
              <Details.Content>{content}</Details.Content>
            </Details>
          ))}
        </Card>
        <Divider />
        <Button
          variant="secondary"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
          className={classes.scrollButton}
        >
          Tilbake til toppen
        </Button>
      </div>
    </article>
  );
};
