import cl from 'clsx';
import { useRef } from 'react';
import { ArrowUpIcon, DownloadIcon } from '@udir-design/icons';
import { Breadcrumbs } from 'src/components/breadcrumbs/Breadcrumbs';
import { Button } from 'src/components/button/Button';
import { Card } from 'src/components/card/Card';
import { Details } from 'src/components/details/Details';
import { Divider } from 'src/components/divider/Divider';
import { Link } from 'src/components/link/Link';
import { TableOfContents } from 'src/components/tableOfContents/TableOfContents';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { Prose } from 'src/components/typography/prose/Prose';
import { useTableOfContents } from 'src/utilities/hooks/useTableOfContents/useTableOfContents';
import classes from './ArticleDemo.module.css';
import { ContentSection } from './content-section/ContentSection';
import { measures } from './strings/measures';
import {
  section0,
  section1,
  section1_2,
  section2,
  section3,
  section4,
  section4_2,
  section5,
  sectionHeader,
} from './strings/sections';

export const ArticleDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <article
      aria-label="Tilpasset opplæring"
      className={cl(classes.article, classes.contentSpacing)}
    >
      <Breadcrumbs aria-label="Du er her:">
        <Breadcrumbs.Link
          href="https://www.udir.no/laring-og-trivsel/lareplanverket/stotte/"
          aria-label="Tilbake til Støtte til arbeid med læreplanverket"
        >
          Støtte til arbeid med læreplanverket
        </Breadcrumbs.Link>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/">
              Forside
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/">
              Læreplanverket
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/stotte/">
              Støtte til arbeid med læreplanverket
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/stotte/tilpasset-opplaring/">
              Tilpasset opplæring
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
      <div
        className={classes.contentWrapper}
        id="main"
        tabIndex={-1}
        ref={containerRef}
      >
        <Prose>
          <div className={classes.headingWrapper}>
            <Heading data-size="lg" level={1}>
              Tilpasset opplæring
            </Heading>
            <ContentSection section={sectionHeader} />

            <Divider style={{ margin: 'var(--ds-size-4) 0' }} />
            <div className={classes.dividerWrapper}>
              <Paragraph data-size="sm">
                ARTIKKEL | Sist endret: 01.01.2024
              </Paragraph>
              <Link
                href=""
                data-size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  window.print();
                }}
              >
                <DownloadIcon aria-hidden />
                <span data-size="sm">Last ned siden som PDF</span>
              </Link>
            </div>

            <Divider style={{ margin: 'var(--ds-size-4) 0' }} />
          </div>
          <TableOfContents
            data-color="accent"
            variant="tinted"
            {...useTableOfContents({ containerRef, headingSelector: 'h2' })}
          />
          <ContentSection section={section0} />
          <ContentSection section={section1} />
          <ContentSection section={section1_2} />
          <Card data-color="accent" variant="tinted">
            <Paragraph>
              Tilpasset opplæring gjelder alle elever, og skal i størst mulig
              grad skje gjennom variasjon og tilpasninger til mangfoldet i
              elevgruppen innenfor fellesskapet.{' '}
              <Link
                href="https://www.udir.no/lk20/overordnet-del/3.-prinsipper-for-skolens-praksis/3.2-undervisning-og-tilpasset-opplaring"
                data-size="sm"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Overordnet del 3.2
              </Link>
            </Paragraph>
          </Card>
          <ContentSection section={section2} />
          <ContentSection section={section3} />
          <Card data-color="neutral" variant="tinted">
            {measures.map(({ summary, content }, i) => (
              <Details key={i}>
                <Details.Summary>{summary}</Details.Summary>
                <Details.Content>{content}</Details.Content>
              </Details>
            ))}
          </Card>
          <ContentSection section={section4} />
          <ContentSection section={section4_2} />
          <ContentSection section={section5} />
          <Button
            variant="tertiary"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
            className={classes.scrollButton}
          >
            Til toppen
            <ArrowUpIcon aria-hidden />
          </Button>
        </Prose>
      </div>
    </article>
  );
};
