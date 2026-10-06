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
