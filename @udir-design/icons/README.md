# Ikonbibliotek for Utdanningsdirektoratet

Dette biblioteket inneholder ikoner som React-komponenter for Utdanningsdirektoratets designsystem.

For å ta i bruk biblioteket må du først installere det.

Udirs ikonbibliotek er basert på [navikt/aksel](https://aksel.nav.no/komponenter/ikoner).

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

SVG-filene er mulig å importere og bruke fra vanlig HTML dersom du bruker en bundler som kan resolve npm imports.

### Med Parcel som bundler

```css
/* css */

/* Nødvendig for riktig dimensjoner på ikon. */
@import 'npm:@udir-design/icons/dist/style.css';

/* Valgfritt: styr ikonets størrelse med font-size. Default er 1em x 1em. */
.my-icon {
  font-size: 2rem;
}
```

```html
<!-- html -->
<svg aria-hidden class="my-icon">
  <use href="npm:@udir-design/icons/dist/svg/Airplane.svg#root" />
</svg>
```

## Dokumentasjon

Oversikt over hvilke ikoner som finnes, og bruksdokumentasjon for disse, finner du [i vår Storybook](https://design.udir.no).
