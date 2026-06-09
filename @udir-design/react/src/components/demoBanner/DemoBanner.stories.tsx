import preview from '.storybook/preview';
import { Card } from 'src/components/card';
import { Link } from 'src/components/link';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import { Laering3 } from 'src/patterns/DemoVersion.stories';
import { Footer } from '../footer';
import { Header } from '../header';
import { DemoBanner } from './DemoBanner';

const meta = preview.meta({
  component: DemoBanner,
  tags: ['udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      height: 'auto',
      overflow: 'visible',
      padding: 0,
    },
  },
  render: (args) => (
    <>
      <style>
        {`
          .demo-banner-page {
            background: var(--ds-color-accent-background-tinted);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .demo-banner-main-content {
            padding-block-start: var(--ds-size-10);
            padding-block-end: var(--ds-size-18);
            padding-inline: var(--ds-size-18);
            margin: 0 auto;
            max-width: 1200px;
            display: flex;
            justify-content: space-between;
            gap: var(--ds-size-4);
            flex: 1;
          }
            
          .demo-banner-section {
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: var(--ds-size-6);
          }

          .demo-banner-paragraph {
            margin-top: var(--ds-size-3);
          }

          .demo-banner-card {
            max-width: 300px;
          }

          .demo-banner-link {
            width: fit-content;
          }

          .demo-banner-aside {
             width: 400px;
          }
        `}
      </style>

      <DemoBanner data-testid="banner" className="demo-banner-page" {...args}>
        <Header applicationName="Tjenestenavn" />
        <main className="demo-banner-main-content">
          <section className="demo-banner-section">
            <Heading level={1} data-size="lg">
              Lorem ipsum dolor sit amet consectetur
            </Heading>
            <Paragraph className="demo-banner-paragraph">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu.
            </Paragraph>
            <Card className="demo-banner-card">
              <Heading level={2}>
                <a href="/">Logg inn</a>
              </Heading>
            </Card>
            <Link className="demo-banner-link" href="#">
              Lorem ipsum dolor sit amet consectetur.
            </Link>
          </section>
          <aside className="demo-banner-aside">
            <Laering3 style={{ width: '100%', height: 'fit-content' }} />
          </aside>
        </main>
        <Footer>
          <Footer.List>
            <Footer.Item href="#">Tilgjengelighet</Footer.Item>
            <Footer.Item href="#">Informasjonskapsler</Footer.Item>
          </Footer.List>
        </Footer>
      </DemoBanner>
    </>
  ),
});

export const WithScroll = meta.story({
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      height: 'auto',
      overflow: 'visible',
      padding: 0,
    },
  },
  render: (args) => (
    <>
      <style>
        {`
          .demo-banner-main-content {
            padding: var(--ds-size-18);
            display: flex;
            flex-direction: column;
            gap: var(--ds-size-4);
            max-width: 800px;
            margin: 0 auto;
          }

          .demo-banner-paragraph {
            margin-top: var(--ds-size-3);
          }

          .demo-banner-heading {
            margin-top: var(--ds-size-5);
          }
        `}
      </style>

      <DemoBanner data-testid="banner" {...args}>
        <Header applicationName="Tjenestenavn" />
        <main className="demo-banner-main-content">
          <Heading level={1} data-size="lg">
            Samisk i skolen
          </Heading>
          <Paragraph className="demo-banner-paragraph">
            Alle elever skal lære om samer og samiske forhold i skolen. Retten
            til også å få undervisning i samiske språk og undervisning på samisk
            i andre fag, er ulik innenfor og utenfor samiske distrikt. I de
            samiske distriktene er norsk og samisk sidestilte i opplæringen.
          </Paragraph>
          <Heading level={2} className="demo-banner-heading">
            Rett til opplæring i samisk i videregående opplæring
          </Heading>
          <Paragraph>
            Det er innført en rett til opplæring i samisk i videregående
            opplæring for alle elever som har hatt opplæring i eller på samisk i
            grunnskolen. Dette gjelder uavhengig av om eleven har samisk
            bakgrunn eller ikke.
          </Paragraph>
          <Paragraph>
            Bakgrunnen for rettigheten er at elever som har hatt opplæring i
            samisk som første- eller andrespråk i grunnskolen får mulighet til å
            fortsette med opplæringen i samisk, og sikre eleven et helhetlig
            opplæringsløp. Det er ikke stilt krav om lengden på eller innholdet
            i opplæringen i grunnskolen, eks. om eleven har hatt samisk som
            første- eller andrespråk. Elevene har ikke rett til å velge et annet
            samisk språk i videregående opplæring enn det elevene hadde på
            grunnskolen.
          </Paragraph>
          <Paragraph>
            Retten til opplæring i samisk for samiske elever i videregående
            opplæring er videreført.
          </Paragraph>
          <Heading level={2} className="demo-banner-heading">
            Tilbud om del av opplæringen i et samiskspråklig miljø
          </Heading>
          <Paragraph>
            Det er tatt inn i loven at kommunen og fylkeskommunen skal gi eleven
            tilbud om del av opplæringen i et samiskspråklig miljø dersom det er
            nødvendig for at opplæringen skal være pedagogisk forsvarlig. Dette
            står i § 3-2 for grunnskolen og § 6-2 for videregående opplæring.
            Denne regelen tar i hovedsak sikte på tilfeller der opplæringen i
            samisk blir gitt som fjernundervisning.
          </Paragraph>
        </main>
        <Footer>
          <Footer.List>
            <Footer.Item href="#">Tilgjengelighet</Footer.Item>
          </Footer.List>
        </Footer>
      </DemoBanner>
    </>
  ),
});
