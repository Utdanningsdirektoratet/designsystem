# Ikonbibliotek for Utdanningsdirektoratet

Dette biblioteket inneholder ikoner som React-komponenter for Utdanningsdirektoratets designsystem.

Udirs ikonbibliotek er basert på [@navikt/aksel-icons](https://aksel.nav.no/komponenter/ikoner).

For å ta i bruk biblioteket må du først installere det.

## Installere biblioteket

```bash
npm add @udir-design/icons@beta
```

## Ta i bruk med React

Nå kan du importere og bruke ikoner, for eksempel slik:

```tsx
import { ChevronDownIcon, TrashIcon } from '@udir-design/icons';

function MyComponent() {
  return (
    <div>
      <TrashIcon aria-hidden />
      <ChevronDownIcon aria-label="Åpne panel" />
    </div>
  );
}
```

## Ta i bruk uten React

Ikonene er mulig å importere og bruke i vanlig HTML og CSS, så lenge du bruker en bundler som f.eks. Vite eller Parcel.

### Bruk i HTML

Du kan bruke ikonene fra HTML ved å referere de inn gjennom `<svg><use href="<sti-til-svg>#icon" /></svg>`.
For å få riktig dimensjoner må du også importere litt CSS fra biblioteket.

Nøyaktige import-stier vil avhenge av oppsettet ditt. Vi har med eksempler for Vite og Parcel.

#### Nødvendig CSS

Du trenger litt CSS for å få riktig dimensjoner på ikonene

```css
/* css */

/* Nødvendig for riktig dimensjoner på ikon. */
@import '@udir-design/icons/style.css'; // med Vite som bundler
@import 'npm:@udir-design/icons/dist/style.css'; // med Parcel som bundler

/* Valgfritt: styr ikonets størrelse. Default er height: 1em; width: auto; */
.my-icon {
  height: 2rem;
}
```

#### HTML

Dersom HTML-en blir generert dynamisk, kan du f.eks. gjøre slik:

```js
/* JavaScript */

// Med Vite som bundler
import ArrowRight from '@udir-design/icons/svg/ArrowRight.svg?no-inline';

// Med Parcel som bundler
const ArrowRight = new URL(
  'npm:@udir-design/icons/dist/svg/ArrowRight.svg',
  import.meta.url,
);

document.body.innerHTML += `
<a class="ds-link" href="#">
  <svg aria-hidden class="my-icon">
    <use href="${ArrowRight}#icon" />
  </svg>
  <span>Lenke lagt til dynamisk med JavaScript</span>
</a>`;
```

Med Parcel er det også mulig å referere til ikonene direkte i HTML-filer:

```html
<!-- html -->
<svg aria-hidden class="my-icon">
  <use href="npm:@udir-design/icons/dist/svg/Airplane.svg#icon" />
</svg>
```

### Bruk i CSS

Alle ikoner er tilgjengeliggjort som CSS-variabler.

For å ta i bruk ikoner på denne måten må du først importere CSS-filen for hvert ikon du skal bruke.
De kan importeres fra JavaScript / TypeScript eller fra CSS.

**Merk: dersom du bruker `@udir-design/css` er noen ikoner allerede tilgjengelig**. Det er lurt å ikke importere disse på nytt. [Se hvilke ikoner som kommer inkludert i @udir-design/css](../css/src/icons.css).

Variablene har navnekonvensjonen `--uds-icon-<ikonnavn>`, og css-filene ligger i `@udir-design/icons/css/<ikonnavn>.css`, der `<ikonnavn>` er navnet på ikonet slik det står i [ikonoversikten](https://design.udir.no/beta/?path=/docs/iconsandsymbols-ikoner--ikoner) men med liten forbokstav.

Nøyaktige import-stier vil avhenge av oppsettet ditt. Vi har med eksempler for Vite og Parcel.

```css
/* Med Vite som bundler  */
@import '@udir-design/icons/css/circleFill.css';
/* Med Parcel som bundler */
@import 'npm:@udir-design/icons/dist/css/circleFill.css';
```

Ved bruk direkte i CSS må du ta ansvar for en del styling selv, men du kan for eksempel automatisk legge til ikon på et element med en viss klasse.

```css
.myClass::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  background: currentColor;
  mask: center / 100% no-repeat var(--uds-icon-circleFill);
  vertical-align: middle;
}
```

## Dokumentasjon

Oversikt over hvilke ikoner som finnes, og bruksdokumentasjon for disse, finner du [i vår Storybook](https://design.udir.no).
