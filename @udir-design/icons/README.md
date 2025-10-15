# Ikonbibliotek for Utdanningsdirektoratet

Dette biblioteket inneholder ikoner som React-komponenter for Utdanningsdirektoratets designsystem.

For å ta i bruk biblioteket må du først installere det.

Udirs ikonbibliotek er basert på [navikt/aksel](https://aksel.nav.no/komponenter/ikoner).

## Installere biblioteket

```bash
npm add @udir-design/icons@beta
```

## Ta i bruk

Nå kan du importere og bruke ikoner, for eksempel slik:

```tsx
import { ChevronDownIcon, TrashIcon, FilterIcon } from '@udir-design/icons';

function MyComponent() {
  return (
    <div>
      <FilterIcon />
      <TrashIcon aria-hidden />
      <ChevronDownIcon title="Åpne panel" />
    </div>
  );
}
```

Oversikt over hvilke ikoner som finnes, og bruksdokumentasjon for disse, finner du [i vår Storybook](https://design.udir.no).
