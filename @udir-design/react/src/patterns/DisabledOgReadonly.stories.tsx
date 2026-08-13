import { useState } from 'react';
import { fn } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Checkbox } from 'src/components/checkbox';
import { Fieldset } from 'src/components/fieldset';
import { Radio } from 'src/components/radio';
import { Textfield } from 'src/components/textfield';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';

const meta = preview.meta({
  title: 'patterns/Disabled og ReadOnly',
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: { originator: 'self' },
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-4)',
      maxWidth: '400px',
    },
  },
});

/**
 * Merk feltet med tekst som forklarer hvorfor det ikke kan endres.
 * Dette gjør det tydelig for brukeren hvorfor feltet ikke er redigerbart.
 */
export const MerkFeltetMedTekst = meta.story({
  name: 'Merk feltet med tekst',
  render: () => {
    return (
      <Fieldset>
        <Fieldset.Legend>
          Velg hvilke informasjonskapsler du godtar
        </Fieldset.Legend>
        <Checkbox label="Nødvendige (kan ikke velges bort)" checked />
        <Checkbox label="Funksjonelle" />
        <Checkbox label="Statistiske" />
      </Fieldset>
    );
  },
});

/**
 * Fjern feltet når det ikke er relevant. Et deaktivert felt tar fortsatt
 * visuell plass og kan forvirre, mens et felt som ikke vises ikke skaper støy.
 */
export const FjernFeltet = meta.story({
  name: 'Fjern feltet',
  render: () => {
    const [erBedrift, setErBedrift] = useState(false);

    return (
      <>
        <Textfield id="navn" label="Fullt navn" />
        <Fieldset>
          <Fieldset.Legend>Skal du registrere en bedrift?</Fieldset.Legend>
          <Radio
            name="bedrift"
            label="Nei"
            value="nei"
            checked={!erBedrift}
            onChange={() => setErBedrift(false)}
          />
          <Radio
            name="bedrift"
            label="Ja"
            value="ja"
            checked={erBedrift}
            onChange={() => setErBedrift(true)}
          />
        </Fieldset>
        {erBedrift && (
          <Textfield
            id="organisasjonsnummer-fjern"
            label="Organisasjonsnummer"
          />
        )}
      </>
    );
  },
});

/**
 * Vis informasjon som ren tekst når en verdi bare skal presenteres og ikke endres.
 */
export const VisInformasjonSomRenTekst = meta.story({
  name: 'Vis informasjon som ren tekst',
  render: () => {
    return (
      <>
        <div>
          <Heading level={3} data-size="2xs">
            Organisasjonsnummer
          </Heading>
          <Paragraph>123 456 789</Paragraph>
        </div>
        <div>
          <Heading level={3} data-size="2xs">
            E-postadresse
          </Heading>
          <Paragraph>bruker@example.com</Paragraph>
        </div>
        <Textfield id="telefon" label="Telefonnummer" />
      </>
    );
  },
});

/**
 * Vis feilmeldinger i stedet for å deaktivere send- eller lagre-knappen.
 * La brukeren trykke, og vis tydelige feilmeldinger som forklarer hva som mangler.
 */
export const VisFeilmeldinger = meta.story({
  name: 'Vis feilmeldinger',
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [navn, setNavn] = useState('');
    const [epost, setEpost] = useState('');

    const navnError = submitted && !navn ? 'Du må fylle inn navn' : undefined;
    const epostError =
      submitted && !epost ? 'Du må fylle inn e-postadresse' : undefined;

    return (
      <>
        <Textfield
          id="navn-feil"
          label="Fullt navn"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          error={navnError}
        />
        <Textfield
          id="epost-feil"
          label="E-postadresse"
          type="email"
          value={epost}
          onChange={(e) => setEpost(e.target.value)}
          error={epostError}
        />
        <Button variant="primary" onClick={() => setSubmitted(true)}>
          Send inn
        </Button>
      </>
    );
  },
});

/**
 * For knapper: bruk `loading` med `aria-disabled` i stedet for `disabled`
 * mens noe lastes eller lagres. Da beholder knappen fokus og er synlig for hjelpemidler.
 */
export const BrukLoadingForKnapper = meta.story({
  name: 'Bruk loading for knapper',
  args: {
    onClick: fn(),
  },
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      args.onClick?.();
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
        <Button variant="primary" loading={isLoading} onClick={handleClick}>
          {isLoading ? 'Lagrer' : 'Lagre'}
        </Button>
        <Button variant="secondary">Avbryt</Button>
      </div>
    );
  },
});
