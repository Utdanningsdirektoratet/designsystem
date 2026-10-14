# Mal for Cookie Information

Denne mappen inneholder kildekoden til den felles malen "Felles cookie-mal med Udirs designsystem" i Cookie Information. Malen forvaltes sentralt. Tjenester skal ikke lage egne kopier av den.

Endringer synkroniseres ikke automatisk til Cookie Information. Ansvarlig for Cookie Information må kopiere endringene manuelt etter at de er testet.

## Teknisk maloppsett

| Kilde                                              | Felt i Cookie Information |
| -------------------------------------------------- | ------------------------- |
| `template/html-code.html`                          | "HTML Code"               |
| `template/javascript-code.js`                      | "JavaScript Code"         |
| `template/css-code.css`                            | "CSS Code"                |
| `showCookieBanner` i `template/javascript-code.js` | "Display function"        |
| `hideCookieBanner` i `template/javascript-code.js` | "Hide function"           |

Filene i `template/` skal bare inneholde koden som kopieres til de aktuelle feltene. Navnene i feltene "Display function" og "Hide function" må samsvare med funksjonene i `template/javascript-code.js`.

## Innhold og oversettelser

Tjenestespesifikt innhold konfigureres under "Copy and translations" i Cookie Information. Dette omfatter blant annet tekst i samtykkeboksen, cookie policy og kategorier.

Felles tekster som ikke varierer mellom tjenester, for eksempel knapper, tilgjengelige navn og etiketter, er definert i oversettelsesobjektet i `template/javascript-code.js`. Cookie Information har ikke egne felter for alle disse tekstene.

Tjenester som trenger et nytt språk, skal kontakte Designteamet. Designteamet samarbeider med tjenesten om å konfigurere innholdet under "Copy and translations" og legge de felles tekstene til i oversettelsesobjektet i `template/javascript-code.js`.

## Lokal forhåndsvisning

Kjør forhåndsvisningen mens du utvikler eller kontrollerer malen:

```sh
pnpm turbo run dev --filter=@internal/cookie-information-template
```

Gå til `http://localhost:3000`. Bruk `?culture=en` for å kontrollere den engelske versjonen og `?necessaryOnly=true` for å kontrollere visningen med bare nødvendige informasjonskapsler. Parameterne kan kombineres.

`server.js`, `data.js` og `preview/` brukes bare til lokal forhåndsvisning og skal ikke kopieres til Cookie Information. Forhåndsvisningen laster de tre filene fra `template/`, men bruker en lokal stub av Cookie Information-API-et og eksempeldata fra React-dokumentasjonen.

## Oppdateringsflyt

1. Endre én eller flere filer i `template/`.
2. Kontroller endringen i lokal forhåndsvisning.
3. Kopier innholdet til de tilsvarende feltene i den felles malen "Felles cookie-mal med Udirs designsystem" under "Consent popup" i Cookie Information.
4. Kontroller malen i Cookie Information før den tas i bruk av tjenester.

Malen bruker CSS-klasser og CSS-variabler fra Udirs designsystem. Pass på at disse er tilgjengelige i miljøet der Cookie Information viser malen.

## Data fra Cookie Information

Cookie Information publiserer konfigurasjonen for hvert domene som offentlige filer. Filene kan brukes til å feilsøke eller kontrollere oppsettet uten tilgang til administrasjonsgrensesnittet. `<domene>` er vertsnavnet uten `www.`, for eksempel `udir.no`. `<språk>` er verdien i `data-culture` med små bokstaver, for eksempel `nb`.

- `https://policy.app.cookieinformation.com/latest/<domene>/<språk>.js` er samtykkeboksen slik Cookie Information sender den til nettleseren: malen med CSS og JavaScript, kategoriene i oppsettet (`categories`), samtykkeversjonen (`consentVersionId`) og informasjonskapslene med leverandør, formål og utløpstid.
- `https://policy.app.cookieinformation.com/cookie-data/<domene>/cabl.json` er listen Cookie Information bruker til automatisk blokkering av førsteparts informasjonskapsler, med navn, domene og kategori for hver informasjonskapsel og tidspunktet for siste endring (`metadata.last_updated`).

Begge filene caches i opptil fem minutter (`max-age=300`). Endringer i Cookie Information kan derfor ta noen minutter før de når brukerne.

### Automatisk blokkering

Cookie Information blokkerer bare informasjonskapsler som står i `cabl.json`, og bare når navn og domene stemmer nøyaktig. Andre informasjonskapsler slippes gjennom. Blokkeringen gjelder informasjonskapsler som settes med JavaScript på siden, ikke informasjonskapsler fra serveren (`Set-Cookie`) eller fra tredjeparts iframes.

Når skanneren finner nye informasjonskapsler, legges de automatisk til i listen (se `cabl.json`). Om de finnes i Cookie Informations database, får de en kategori automatisk, mens ukjente informasjonskapsler havner i kategorien "unclassified".

### Samtykke og ny samtykkeversjon

Samtykket lagres i informasjonskapselen `CookieInformationConsent` som JSON. Feltet `website_uuid` inneholder samtykkeversjonen samtykket ble gitt for, og `consents_approved` og `consents_denied` inneholder kategoriene brukeren godtok og avviste.

"Reset consent" under "Settings" i Cookie Information gir alle domenene i samtykkeløsningen en ny samtykkeversjon. Når `website_uuid` ikke lenger stemmer med `consentVersionId`, sletter Cookie Information det lagrede samtykket ved neste sidevisning og viser samtykkeboksen på nytt. Dette er kontrollert med versjon 2.0.0 av Cookie Informations bibliotek.
