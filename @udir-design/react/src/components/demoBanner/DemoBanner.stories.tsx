import { expect, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Divider } from '../divider/Divider';
import { Footer } from '../footer';
import { Header } from '../header';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { DemoBanner } from './DemoBanner';

const meta = preview.meta({
  component: DemoBanner,
  tags: ['alpha', 'digdir'],
  parameters: {
    componentOrigin: { originator: 'digdir' },
  },
});

export const Preview = meta.story({
  args: {},
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      height: '1200px',
      overflow: 'visible',
      padding: 0,
    },
  },
  render: () => (
    <DemoBanner data-testid="banner">
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
        <Paragraph>
          Vurderingen av om det er «nødvendig for at opplæringen skal være
          pedagogisk forsvarlig», handler om hvorvidt eleven skal kunne nå
          kompetansemålene i læreplanen. Det kan ikke knyttes til ytre rammer
          for eksempel hvor mange andre som snakker det samiskspråket i området,
          økonomi og ressurser.
        </Paragraph>
        <Paragraph>
          Hvor store deler av opplæringen i samisk det eventuelt er nødvendig å
          gi i et samiskspråklig miljø, kommer an på en konkret vurdering av om
          opplæringen gir eleven grunnlag for å nå kompetansemålene i læreplanen
          eller ikke.
        </Paragraph>
        <Divider style={{ marginTop: 'var(--ds-size-30)' }} />
        <Paragraph
          style={{
            marginTop: 'calc(var(--ds-size-30) * 2)',
            marginBottom: 'calc(var(--ds-size-30) * 2)',
          }}
        >
          (Annet innhold)
        </Paragraph>
      </div>
      <Footer>
        <Footer.List>
          <Footer.Item href="#">Tilgjengelighet</Footer.Item>
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
