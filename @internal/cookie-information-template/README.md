# Mal for Cookie Information

Denne mappen inneholder kildekoden til Udirs delte mal for informasjonskapsler i Cookie Information. Endringer synkroniseres ikke automatisk til Cookie Information. Den ansvarlige for Cookie Information må kopiere endringene manuelt etter at de er testet.

> [!WARNING]
> **Forvaltningsprosessen er ikke avklart.** Vi har ikke bekreftet om endringer i den delte malen blir overført til eksisterende tjenestekopier, eller hvordan slike endringer skal rulles ut.

## Teknisk maloppsett

| Kilde                                              | Felt i Cookie Information |
| -------------------------------------------------- | ------------------------- |
| `template/html-code.html`                          | "HTML Code"               |
| `template/javascript-code.js`                      | "JavaScript Code"         |
| `template/css-code.css`                            | "CSS Code"                |
| `showCookieBanner` i `template/javascript-code.js` | "Display function"        |
| `hideCookieBanner` i `template/javascript-code.js` | "Hide function"           |

Filene i `template/` skal bare inneholde koden som kopieres til de aktuelle feltene. Navnene i feltene "Display function" og "Hide function" må samsvare med funksjonene i `template/javascript-code.js`.

## Innhold og oversettelser per tjeneste

Tjenestene konfigurerer tjenestespesifikt innhold under "Copy and translations" i Cookie Information. Dette omfatter blant annet tekst i samtykkeboksen, cookie policy og kategorier.

Felles tekster som ikke varierer mellom tjenester, for eksempel knapper, tilgjengelige navn og etiketter, er definert i oversettelsesobjektet i `template/javascript-code.js`. Cookie Information har ikke egne felter for alle disse tekstene.

Støtte for et nytt språk krever derfor at tjenestespesifikt innhold konfigureres under "Copy and translations", og at de felles tekstene legges til i oversettelsesobjektet i `template/javascript-code.js`.

## Lokal forhåndsvisning

Kjør forhåndsvisningen mens du utvikler eller kontrollerer malen:

```sh
pnpm turbo run dev --filter=@internal/cookie-information-template
```

Gå til `http://localhost:3000`. Bruk `?culture=en` for å kontrollere den engelske versjonen.

`server.js`, `data.js` og `preview/` brukes bare til lokal forhåndsvisning og skal ikke kopieres til Cookie Information. Forhåndsvisningen laster de tre filene fra `template/`, men bruker en lokal stub av Cookie Information-API-et og eksempeldata fra React-dokumentasjonen.

## Oppdateringsflyt

1. Endre én eller flere filer i `template/`.
2. Kontroller endringen i lokal forhåndsvisning.
3. Avklar med ansvarlig for Cookie Information hvordan endringen skal rulles ut til eksisterende tjenestekopier.
4. Kopier innholdet til de tilsvarende feltene i malen "Udir Design mal (ikke endre - lag en kopi)" under "Consent popup" i Cookie Information.
5. Kontroller malen i Cookie Information før den tas i bruk av tjenester.

Malen bruker CSS-klasser og CSS-variabler fra Udirs designsystem. Pass på at disse er tilgjengelige i miljøet der Cookie Information viser malen.
