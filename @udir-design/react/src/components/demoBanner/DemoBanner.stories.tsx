import { expect, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Footer } from '../footer';
import { Header } from '../header';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { DemoBanner } from './DemoBanner';
import { Card } from '../card/Card';
import { Link } from '../link/Link';
import { Laering3 } from 'src/patterns/DemoVersion.stories';

const meta = preview.meta({
  component: DemoBanner,
  tags: ['alpha', 'udir'],
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
    <DemoBanner
      data-testid="banner"
      {...args}
      style={{
        background: 'var(--ds-color-accent-background-tinted)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header applicationName="Demoheader" />
      <div
        style={{
          paddingBlockStart: 'var(--ds-size-10)',
          paddingBlockEnd: 'var(--ds-size-18)',
          paddingInline: 'var(--ds-size-18)',
          margin: '0 auto',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--ds-size-4)',
          flex: 1,
        }}
      >
        <div
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-6)',
          }}
        >
          <Heading level={1} data-size="lg">
            Velkommen til "Tjenestenavn"
          </Heading>
          <Paragraph style={{ marginTop: 'var(--ds-size-3)' }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu.
          </Paragraph>
          <Card style={{ maxWidth: '300px' }}>
            <Heading level={2}>
              <a href="#">Logg inn</a>
            </Heading>
          </Card>
          <Link href="#" style={{ width: 'fit-content' }}>
            Lorem ipsum dolor sit amet consectetur.
          </Link>
        </div>
        <div style={{ width: '400px' }}>
          <Laering3 style={{ width: '100%', height: 'fit-content' }} />
        </div>
      </div>
      <Footer>
        <Footer.List>
          <Footer.Item href="#">Tilgjengelighet</Footer.Item>
          <Footer.Item href="#">Informasjonskapsler</Footer.Item>
        </Footer.List>
      </Footer>
    </DemoBanner>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const banner = canvas.getByTestId('banner');

    await step('Banner is rendered', async () => {
      await expect(banner).toBeTruthy();
    });
  },
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
    <DemoBanner data-testid="banner" {...args}>
      <Header applicationName="Demoheader" />
      <div
        style={{
          padding: 'var(--ds-size-18)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Heading level={1} data-size="lg">
          Samisk i skolen
        </Heading>
        <Paragraph style={{ marginTop: 'var(--ds-size-3)' }}>
          Alle elever skal lære om samer og samiske forhold i skolen. Retten til
          også å få undervisning i samiske språk og undervisning på samisk i
          andre fag, er ulik innenfor og utenfor samiske distrikt. I de samiske
          distriktene er norsk og samisk sidestilte i opplæringen.
        </Paragraph>
        <Heading level={2} style={{ marginTop: 'var(--ds-size-5)' }}>
          Rett til opplæring i samisk i videregående opplæring
        </Heading>
        <Paragraph>
          Det er innført en rett til opplæring i samisk i videregående opplæring
          for alle elever som har hatt opplæring i eller på samisk i
          grunnskolen. Dette gjelder uavhengig av om eleven har samisk bakgrunn
          eller ikke.
        </Paragraph>
        <Paragraph>
          Bakgrunnen for rettigheten er at elever som har hatt opplæring i
          samisk som første- eller andrespråk i grunnskolen får mulighet til å
          fortsette med opplæringen i samisk, og sikre eleven et helhetlig
          opplæringsløp. Det er ikke stilt krav om lengden på eller innholdet i
          opplæringen i grunnskolen, eks. om eleven har hatt samisk som første-
          eller andrespråk. Elevene har ikke rett til å velge et annet samisk
          språk i videregående opplæring enn det elevene hadde på grunnskolen.
        </Paragraph>
        <Paragraph>
          Retten til opplæring i samisk for samiske elever i videregående
          opplæring er videreført.
        </Paragraph>
        <Heading level={2} style={{ marginTop: 'var(--ds-size-5)' }}>
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
      </div>
      <Footer>
        <Footer.List>
          <Footer.Item href="#">Tilgjengelighet</Footer.Item>
        </Footer.List>
      </Footer>
    </DemoBanner>
  ),
});
