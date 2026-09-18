import { RefreshIcon } from '@storybook/icons';
import { useEffect, useState } from 'react';
import preview from '.storybook/preview';
import { Field } from 'src/components/field';
import { Textfield } from 'src/components/textfield/Textfield';
import { Label } from 'src/components/typography/label';
import { Alert } from '../../components/alert';
import { Button } from '../../components/button/Button';
import { Dialog } from '../../components/dialog/Dialog';
import { Header } from '../../components/header';
import { Link } from '../../components/link/Link';
import { List } from '../../components/list/List';
import { Search } from '../../components/search/Search';
import { Heading } from '../../components/typography/heading/Heading';
import { Paragraph } from '../../components/typography/paragraph/Paragraph';
import { Prose } from '../../components/typography/prose/Prose';

const meta = preview.meta({
  title: 'patterns/Systemvarsler',
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Tekst og eksempler er tilpasset Udir.',
    },
    layout: 'fullscreen',
  },
});

export const TekniskFeilside = meta.story({
  name: 'Teknisk feilside',
  render: () => (
    <>
      <style>{`
.systemvarsler-technical-error {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 32rem;
}

.systemvarsler-technical-error__main {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: var(--ds-size-6);
  width: min(100%, 48rem);
  margin-inline: auto;
  padding: var(--ds-size-3);
}

@media (min-width: 25.5rem) {
  .systemvarsler-technical-error__main {
    padding: var(--ds-size-4);
  }
}

@media (min-width: 48rem) {
  .systemvarsler-technical-error__main {
    padding: var(--ds-size-6);
  }
}

.systemvarsler-technical-error__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-size-3);
}
`}</style>
      <div className="systemvarsler-technical-error">
        <Header applicationName="Utdanningsdirektoratet" sticky={false} />
        <main className="systemvarsler-technical-error__main">
          <Prose>
            <Heading level={4} data-size="lg">
              Beklager, noe gikk galt
            </Heading>
            <Paragraph>
              Vi opplever tekniske problemer og jobber med å løse dem. Dette
              skyldes ikke noe du gjorde.
            </Paragraph>
            <Paragraph>
              Vent noen minutter og prøv på nytt, eller gå tilbake til forrige
              side. Du kan{' '}
              <Link href="https://www.udir.no/kontakt-oss/">
                kontakte brukerstøtte
              </Link>{' '}
              hvis problemet fortsetter.
            </Paragraph>
          </Prose>
          <div className="systemvarsler-technical-error__actions">
            <Button type="button">Prøv på nytt</Button>
            <Button type="button" variant="secondary">
              Gå tilbake
            </Button>
          </div>
        </main>
      </div>
    </>
  ),
});

export const SideIkkeFunnet = meta.story({
  name: 'Side ikke funnet',
  render: () => (
    <>
      <style>{`
.systemvarsler-not-found {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 32rem;
}

.systemvarsler-not-found__main {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: var(--ds-size-6);
  width: min(100%, 48rem);
  margin-inline: auto;
  padding: var(--ds-size-3);
}

@media (min-width: 25.5rem) {
  .systemvarsler-not-found__main {
    padding: var(--ds-size-4);
  }
}

@media (min-width: 48rem) {
  .systemvarsler-not-found__main {
    padding: var(--ds-size-6);
  }
}

.systemvarsler-not-found__search {
  max-width: 32rem;
}

.systemvarsler-not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-size-3);
}
`}</style>
      <div className="systemvarsler-not-found">
        <Header applicationName="Utdanningsdirektoratet" sticky={false} />
        <main className="systemvarsler-not-found__main">
          <Prose>
            <Heading level={5} data-size="lg">
              Beklager, vi fant ikke siden
            </Heading>
            <Paragraph>
              Siden kan være slettet eller flyttet, eller det kan være en feil i
              lenken.
            </Paragraph>

            <form
              className="systemvarsler-not-found__search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <Label>Du kan søke etter informasjonen du leter etter:</Label>
                <Search>
                  <Search.Input aria-label="Søk på udir.no" type="text" />
                  <Search.Clear />
                  <Search.Button />
                </Search>
              </Field>
            </form>
            <Heading data-size="xs" level={6}>
              Aktuelle sider
            </Heading>
            <List.Unordered>
              <List.Item>
                <Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/">
                  Læreplanverket
                </Link>
              </List.Item>
              <List.Item>
                <Link href="https://www.udir.no/eksamen-og-prover/eksamen/">
                  Eksamen
                </Link>
              </List.Item>
            </List.Unordered>
          </Prose>
          <div className="systemvarsler-not-found__actions">
            <Button type="button">Gå til forsiden</Button>
            <Button variant="secondary" type="button">
              Meld fra om ødelagt lenke
            </Button>
          </div>
        </main>
      </div>
    </>
  ),
});

export const VarselOmUtlogging = meta.story({
  name: 'Varsel om utlogging',
  render: () => {
    const [secondsLeft, setSecondsLeft] = useState(60);

    useEffect(() => {
      const interval = window.setInterval(() => {
        setSecondsLeft((current) => (current === 0 ? 60 : current - 1));
      }, 1000);

      return () => window.clearInterval(interval);
    }, []);

    return (
      <>
        <style>{`
.systemvarsler-session-expiry {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 48rem;
  min-height: 12rem;
  margin-inline: auto;
  padding: var(--ds-size-3);
  background: var(--ds-color-surface-default);
}

@media (min-width: 25.5rem) {
  .systemvarsler-session-expiry {
    padding: var(--ds-size-4);
  }
}

@media (min-width: 48rem) {
  .systemvarsler-session-expiry {
    padding: var(--ds-size-6);
  }
}

.systemvarsler-session-expiry__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-size-3);
}
`}</style>
        <div className="systemvarsler-session-expiry">
          <Dialog.TriggerContext>
            <Dialog
              id="systemvarsler-session-expiry-dialog"
              closeButton={false}
              closedby="none"
              open
            >
              <Prose>
                <Heading level={2}>Er du her fortsatt?</Heading>
                <Paragraph>
                  Du har vært stille en stund. Hvis du ikke gjør noe på denne
                  siden blir du snart logget ut.
                </Paragraph>
                <Paragraph>
                  Du blir logget ut om{' '}
                  <time dateTime={`PT${secondsLeft}S`}>{secondsLeft}</time>{' '}
                  sekunder.
                </Paragraph>
              </Prose>
              <div className="systemvarsler-session-expiry__actions">
                <Button>Forbli innlogget</Button>
                <Button variant="secondary">Logg ut</Button>
              </div>
            </Dialog>
          </Dialog.TriggerContext>
        </div>
      </>
    );
  },
});

export const GlobaltSystemvarsel = meta.story({
  name: 'Globalt systemvarsel',
  render: () => (
    <>
      <style>{`
.systemvarsler-global-alert {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 32rem;
  background: var(--ds-color-surface-default);
}

.systemvarsler-global-alert__main {
  box-sizing: border-box;
  display: grid;
  gap: var(--ds-size-5);
  width: min(100%, 48rem);
  margin-inline: auto;
  padding: var(--ds-size-3);
}

@media (min-width: 25.5rem) {
  .systemvarsler-global-alert__main {
    padding: var(--ds-size-4);
  }
}

@media (min-width: 48rem) {
  .systemvarsler-global-alert__main {
    padding: var(--ds-size-6);
  }
}
`}</style>
      <div className="systemvarsler-global-alert">
        <Header applicationName="Utdanningsdirektoratet" sticky={false} />
        <main className="systemvarsler-global-alert__main">
          <Alert data-color="warning">
            <Alert.Heading level={4}>
              Deler av tjenesten er utilgjengelig
            </Alert.Heading>
            Du kan fortsatt finne og lese læreplaner, men søket kan være
            ustabilt. Vi jobber med å rette feilen.
          </Alert>
          <Prose>
            <Heading level={4} data-size="lg">
              Læreplaner
            </Heading>
            <Paragraph>
              Finn læreplaner for fag i grunnskolen og videregående opplæring.
            </Paragraph>
            <Heading level={5} data-size="sm">
              Ofte besøkte sider
            </Heading>
            <List.Unordered>
              <List.Item>
                <Link href="https://www.udir.no/lk20/">Læreplanverket</Link>
              </List.Item>
              <List.Item>
                <Link href="https://www.udir.no/laring-og-trivsel/lareplanverket/fagfornyelsen/">
                  Fagfornyelsen
                </Link>
              </List.Item>
            </List.Unordered>
          </Prose>
        </main>
      </div>
    </>
  ),
});

export const LokaltSystemvarsel = meta.story({
  name: 'Lokalt systemvarsel',
  render: () => (
    <>
      <style>{`
.systemvarsler-local-alert {
  box-sizing: border-box;
  display: grid;
  gap: var(--ds-size-5);
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
  padding: var(--ds-size-3);
  background: var(--ds-color-surface-default);
}

.systemvarsler-local-textfield {
  width: 10rem;
}

@media (min-width: 25.5rem) {
  .systemvarsler-local-alert {
    padding: var(--ds-size-4);
  }
}

@media (min-width: 48rem) {
  .systemvarsler-local-alert {
    padding: var(--ds-size-6);
  }
}

.systemvarsler-try-again-button {
  margin-top: var(--ds-size-3);
}
`}</style>
      <section className="systemvarsler-local-alert">
        <Prose>
          <Heading level={4}>Eksamensresultater</Heading>
          <Textfield
            className="systemvarsler-local-textfield"
            label="Kandidatnummer"
            value={4012}
          />
        </Prose>
        <Alert data-color="danger">
          <Alert.Heading level={5}>
            Kunne ikke hente eksamensresultatene
          </Alert.Heading>
          <Paragraph>
            Resultatene er midlertidig utilgjengelige. Prøv igjen eller kom
            tilbake senere.
          </Paragraph>
          <Button
            className="systemvarsler-try-again-button"
            variant="secondary"
            data-size="sm"
          >
            Prøv igjen <RefreshIcon />
          </Button>
        </Alert>
      </section>
    </>
  ),
});
