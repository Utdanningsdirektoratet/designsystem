import { type ComponentProps, useState } from 'react';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Fieldset } from 'src/components/fieldset';
import { Textfield } from 'src/components/textfield';
import { ValidationMessage } from 'src/components/typography/validationMessage';

const meta = preview.meta({
  title: 'patterns/Feilmeldinger',
  tags: ['alpha', 'udir'],
  parameters: {
    layout: 'centered',
    componentOrigin: {
      originator: 'digdir',
      details: 'Tekst og eksempler er tilpasset Udir.',
    },
  },
});

type SubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const Enkeltfelt = meta.story({
  name: 'Feilmelding på enkeltfelt',
  parameters: {
    customStyles: {
      width: 'min(25rem, calc(100vw - var(--ds-size-8)))',
      maxWidth: '100%',
    },
  },
  render: () => (
    <Textfield
      id="organisasjonsnummer"
      label="Organisasjonsnummer"
      description="Skriv inn organisasjonsnummeret til den som søker om tilskudd."
      inputMode="numeric"
      defaultValue="12345"
      error="Organisasjonsnummer må ha 9 siffer"
    />
  ),
});

export const Kryssvalidering = meta.story({
  name: 'Feilmelding som gjelder flere felt',
  parameters: {
    customStyles: {
      width: 'min(25rem, calc(100vw - var(--ds-size-8)))',
      maxWidth: '100%',
    },
  },
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const hasContactMethod = !!email.trim() || !!phone.trim();
    const groupError = submitted && !hasContactMethod;
    const emailError =
      submitted && email.trim() && !email.includes('@')
        ? 'E-postadresse må inneholde krøllalfa'
        : undefined;
    const phoneError =
      submitted && phone.trim() && !/^\d{8}$/.test(phone.replaceAll(' ', ''))
        ? 'Telefonnummer må ha 8 siffer'
        : undefined;

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      setSubmitted(true);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: 'grid', gap: 'var(--ds-size-4)' }}
      >
        <Fieldset>
          <Fieldset.Legend>Kontaktperson for søknaden</Fieldset.Legend>
          <Fieldset.Description>
            Fyll ut minst én kontaktmåte.
          </Fieldset.Description>
          <Textfield
            id="kontakt-epost"
            label="E-postadresse"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={groupError || !!emailError}
            aria-describedby={groupError ? 'kontaktmetode-feil' : undefined}
            error={emailError}
          />
          <Textfield
            id="kontakt-telefon"
            label="Telefonnummer"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-invalid={groupError || !!phoneError}
            aria-describedby={groupError ? 'kontaktmetode-feil' : undefined}
            error={phoneError}
          />
          {groupError ? (
            <ValidationMessage id="kontaktmetode-feil">
              E-postadresse eller telefonnummer må fylles ut
            </ValidationMessage>
          ) : null}
        </Fieldset>

        <Button type="submit">Gå videre</Button>
      </form>
    );
  },
});
