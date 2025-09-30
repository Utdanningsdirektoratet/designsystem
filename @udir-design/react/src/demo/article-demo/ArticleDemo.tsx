import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  Details,
  Divider,
  Footer,
  Heading,
  Link,
  Paragraph,
  SkipLink,
} from '@udir-design/react/alpha';
import { HTMLAttributes } from 'react';
import classes from './ArticleDemo.module.css';
import { ContentSection } from './content-section/ContentSection';
import { section1, section2, section3 } from './strings/sections';
import { changes } from './strings/changes';
import cl from 'clsx';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { DemoProps } from '../demoProps';

type ArticleDemoProps = DemoProps & HTMLAttributes<HTMLDivElement>;

export const ArticleDemo = ({ ...props }: ArticleDemoProps) => {
  return (
    <div {...props}>
      <article className={cl(classes.article, classes.contentSpacing)}>
        <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
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
        <div
          className={cl(classes.contentWrapper, classes.contentSpacing)}
          id="main-content"
          tabIndex={-1}
        >
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
              <PrinterSmallIcon aria-hidden />
              <span>Skriv ut denne siden</span>
            </Link>
          </div>
          <Card data-color="support2" variant="tinted">
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
      <Footer>
        <Footer.List>
          <Footer.Item href="https://www.udir.no/om-udir/personvernerklaring-udir/">
            Om Udir
          </Footer.Item>
          <Footer.Item href="https://www.udir.no/">Kontakt oss</Footer.Item>
        </Footer.List>
        <Footer.List>
          <Footer.Item href="https://www.udir.no/om-udir/personvernerklaring-udir/">
            Personvern
          </Footer.Item>
          <Footer.Item href="https://www.udir.no/">
            Informasjonskapsler
          </Footer.Item>
          <Footer.Item href="https://uustatus.no/nb/erklaringer/publisert/ce43e104-3893-45ac-90c8-45deb6f17624">
            Tilgjengelighetserklæring
          </Footer.Item>
        </Footer.List>
      </Footer>
    </div>
  );
};
