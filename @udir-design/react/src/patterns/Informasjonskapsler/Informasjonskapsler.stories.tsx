import {
  Button,
  Checkbox,
  Link,
  Paragraph,
} from '@digdir/designsystemet-react';
import { InformationSquareFillIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Details } from 'src/components/details';
import { Dialog } from 'src/components/dialog';
import { Fieldset } from 'src/components/fieldset';
import { Heading } from 'src/components/typography/heading';
import { Prose } from 'src/components/typography/prose';

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [
    withResponsiveDataSize,
    (Story, context) => {
      // Hacky way to detect docs mode in iframe-rendered story
      const isInDocsPage =
        window.parent.location.search.includes('viewMode=docs');
      if (isInDocsPage) {
        // Set viewMode since Storybook doesn't detect it properly when rendered with "inline: false" (iframe mode)
        context.viewMode = 'docs';
      }
      return <Story />;
    },
  ],
});

const cookieDescriptions: Record<string, string> = {
  nødvendige:
    'Nødvendige informasjonskapsler hjelper med å gjøre tjenesten brukbar ved å aktivere grunnleggende funksjoner knyttet til for eksempel navigasjon, sikkerhet og ytelse. Tjenesten kan ikke fungere optimalt uten disse informasjonskapslene.',
  funksjonelle:
    'Funksjonelle informasjonskapsler lagrer opplysninger som endrer måten tjenesten ser ut eller oppfører seg på slik at den blir bedre tilpasset deg, for eksempel ditt foretrukne språk eller den regionen du befinner deg i.',
  statistiske:
    'Statistiske informasjonskapsler samler anonyme opplysninger om hvordan tjenesten blir brukt, slik at vi kan bruke dem til å gjøre tjenesten mest mulig tilpasset brukernes behov.',
};

const cookieData = {
  nødvendige: [
    {
      leverandør: 'Cookie Information',
      formål: 'Støtter nettstedets tekniske funksjoner.',
      navn: 'CookieConsent',
      utløpstid: '1 år',
      personvernerklæring: 'https://example.com/cookie-information/privacy',
    },
    {
      leverandør: 'Cloudflare',
      formål:
        'Beskytter mot ondsinnede besøkende og begrenser risikoen for serveroverbelastning.',
      navn: '__cfruid',
      utløpstid: 'Sesjon',
      personvernerklæring: 'https://example.com/cloudflare/privacy',
    },
    {
      leverandør: 'Cloudflare',
      formål: 'Bekrefter at besøkende har bestått sikkerhetsutfordringen.',
      navn: 'cf_clearance',
      utløpstid: '30 minutter',
      personvernerklæring: 'https://example.com/cloudflare/privacy',
    },
  ],
  funksjonelle: [
    {
      leverandør: 'Optimizely',
      formål: 'Brukes til A/B-testing og personalisering av innhold.',
      navn: 'optimizelyEndUserId',
      utløpstid: '6 måneder',
      personvernerklæring: 'https://example.com/optimizely/privacy',
    },
  ],
  statistiske: [
    {
      leverandør: 'Google Analytics',
      formål:
        'Samler inn anonym statistikk om hvordan besøkende bruker nettstedet.',
      navn: '_ga',
      utløpstid: '2 år',
      personvernerklæring: 'https://example.com/google/privacy',
    },
    {
      leverandør: 'Google Analytics',
      formål: 'Brukes til å skille brukere.',
      navn: '_gid',
      utløpstid: '24 timer',
      personvernerklæring: 'https://example.com/google/privacy',
    },
    {
      leverandør: 'Google Analytics',
      formål: 'Brukes til å begrense forespørsler.',
      navn: '_gat',
      utløpstid: '1 minutt',
      personvernerklæring: 'https://example.com/google/privacy',
    },
    {
      leverandør: 'Siteimprove',
      formål: 'Måler trafikk og brukeratferd for å forbedre nettstedet.',
      navn: 'nmstat, siteimproveses',
      utløpstid: '1000 dager / Sesjon',
      personvernerklæring: 'https://example.com/siteimprove/privacy',
    },
    {
      leverandør: 'Microsoft Azure',
      formål: 'Samler inn diagnose- og ytelsesdata for applikasjonsovervåking.',
      navn: 'ai_session, ai_user',
      utløpstid: '30 minutter / 1 år',
      personvernerklæring: 'https://example.com/microsoft/privacy',
    },
  ],
};

export const Preview = meta.story({
  args: {},
  render: (args, context) => {
    return (
      <>
        <style>
          {`
            /* Styles defined in application-specific css */
            .cookies-buttons {
              display: flex;
              gap: var(--ds-size-4);
              flex-wrap: wrap;
            }
            .cookies-details ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .cookies-details li > strong {
              font-weight: 600;
            }
            @media (max-width: 40rem) {
              .cookies-buttons > button {
          flex: 1 1 auto;
              }
            }
          `}
        </style>
        <Dialog
          open={true}
          modal={false}
          {...args}
          {...(context.viewMode === 'docs' && { inert: true })}
        >
          <Prose>
            <Heading>[Tjenestenavn] bruker informasjonskapsler</Heading>
            <Paragraph>
              Nødvendige informasjonskapsler sørger for at tjenesten fungerer og
              er sikker, og kan ikke velges bort. Andre brukes til statistikk,
              analyse, og å forbedre brukeropplevelsen. Godkjenner du alle,
              hjelper du oss å lage bedre tjenester.
            </Paragraph>
            <Paragraph>
              Du kan når som helst endre samtykket ditt via lenken i bunnmenyen.
            </Paragraph>
            <Fieldset>
              <Fieldset.Legend>
                Velg hvilke informasjonskapsler du godtar
              </Fieldset.Legend>
              <Checkbox label="Nødvendige (kan ikke velges bort)" checked />
              <Checkbox label="Funksjonelle" />
              <Checkbox label="Statistiske" />
            </Fieldset>
            <Dialog.TriggerContext>
              <Dialog.Trigger variant="tertiary">
                <InformationSquareFillIcon aria-hidden />
                Se hvilke informasjonskapsler vi bruker
              </Dialog.Trigger>
              <Dialog>
                <Prose>
                  <Heading level={2}>Informasjonskapsler</Heading>
                  {Object.entries(cookieData).map(([kategori, cookies]) => (
                    <div key={kategori} className="cookies-container">
                      <Prose>
                        <Heading data-size="xs" level={3}>
                          {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                        </Heading>
                        <Paragraph>{cookieDescriptions[kategori]}</Paragraph>
                        <Details>
                          <Details.Summary>
                            {cookies.length} {kategori}
                          </Details.Summary>
                          <Details.Content className="cookies-details">
                            <Prose>
                              {cookies.map((cookie, index) => (
                                <Prose key={cookie.navn}>
                                  <Heading data-size="2xs" level={4}>
                                    {index + 1}
                                  </Heading>
                                  <ul>
                                    <li>
                                      <strong>Leverandør: </strong>
                                      {cookie.leverandør}
                                    </li>
                                    <li>
                                      <strong>Formål: </strong>
                                      {cookie.formål}
                                    </li>
                                    <li>
                                      <strong>Navn: </strong>
                                      {cookie.navn}
                                    </li>
                                    <li>
                                      <strong>Utløpstid: </strong>
                                      {cookie.utløpstid}
                                    </li>
                                    <li>
                                      <strong>Personvernerklæring: </strong>
                                      <Link href={cookie.personvernerklæring}>
                                        Se personvernerklæring
                                      </Link>
                                    </li>
                                  </ul>
                                </Prose>
                              ))}
                            </Prose>
                          </Details.Content>
                        </Details>
                      </Prose>
                    </div>
                  ))}
                </Prose>
              </Dialog>
            </Dialog.TriggerContext>
          </Prose>

          <div className="cookies-buttons">
            <Button variant="secondary">Godta alle</Button>
            <Button variant="secondary">Godta valgte</Button>
            <Button variant="secondary">Avvis valgfrie</Button>
          </div>
        </Dialog>
      </>
    );
  },
});
