import cl from 'clsx';
import type { HTMLAttributes } from 'react';
import { useRef } from 'react';
import { PrinterSmallIcon } from '@udir-design/icons';
import { Alert } from 'src/components/alert';
import { Breadcrumbs } from 'src/components/breadcrumbs/Breadcrumbs';
import { Button } from 'src/components/button/Button';
import { Card } from 'src/components/card/Card';
import { Details } from 'src/components/details/Details';
import { Divider } from 'src/components/divider/Divider';
import { Footer } from 'src/components/footer';
import { Header } from 'src/components/header';
import { Link } from 'src/components/link/Link';
import { List } from 'src/components/list/List';
import { SkipLink } from 'src/components/skipLink/SkipLink';
import { TableOfContents } from 'src/components/tableOfContents/TableOfContents';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { useTableOfContents } from 'src/utilities/hooks/useTableOfContents/useTableOfContents';
import type { DemoProps } from '../../demoProps';
import classes from './ArticleDemo.module.css';
import { ContentSection } from './content-section/ContentSection';
import { changes } from './strings/changes';
import { section1, section2, section3 } from './strings/sections';

type ArticleDemoProps = DemoProps & HTMLAttributes<HTMLDivElement>;

export const ArticleDemo = ({ ...props }: ArticleDemoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div {...props} data-size="auto">
      <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
      <Header applicationName="Artikkeldemo">
        <Header.MenuButton />
        <Header.Menu style={{ padding: 'var(--udsc-header-padding)' }}>
          <nav aria-labelledby="header-menu-navigation">
            <h2 id="header-menu-navigation" className="ds-sr-only">
              Menynavigasjon
            </h2>
            <List.Unordered>
              <Header.Menu.Link href="#">Navigasjonslenke 1</Header.Menu.Link>
              <Header.Menu.Link href="#">Navigasjonslenke 2</Header.Menu.Link>
              <Header.Menu.Link href="#">Navigasjonslenke 3</Header.Menu.Link>
              <Header.Menu.Link href="#">Navigasjonslenke 4</Header.Menu.Link>
            </List.Unordered>
          </nav>
        </Header.Menu>
      </Header>
      <article className={cl(classes.article, classes.contentSpacing)}>
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
          ref={containerRef}
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
          <TableOfContents {...useTableOfContents({ containerRef })} />
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
