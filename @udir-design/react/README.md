# React-komponenter for Utdanningsdirektoratets designsystem.

Dette biblioteket inneholder React-komponenter for Utdanningsdirektoratets designsystem.

For å ta i bruk biblioteket må du først installere det, og så gjøre litt oppsett.

## Installere biblioteket

```bash
npm add @udir-design/theme@beta @udir-design/react@beta
```

## Oppsett

### Last inn korrekt font

Komponentbiblioteket bruker fonten `Inter`. For at komponentene skal vises med riktig typografi, må fonten lastes inn i applikasjonen.

Legg følgende i `<head>` i `index.html`:

```html
<link
  rel="preload stylesheet"
  as="style"
  href="https://altinncdn.no/fonts/inter/v4/inter.css"
/>
```

### Importer stilsettet

For at komponentene skal vises korrekt, må du importere bibliotekets stilsett fra `@udir-design/react/style.css`.

Du kan for eksempel gjøre dette i JavaScript- eller TypeScript-entrypointet:

```ts
import '@udir-design/react/style.css';
```

Alternativt kan du importere stilsettet fra en CSS-fil:

```css
@import '@udir-design/react/style.css';
```

### Konfigurere standard typografi

Biblioteket setter ingen globale stiler. For å få konsistent typografi også på innhold som ikke bruker komponenter fra biblioteket, må du selv definere standard typografi for applikasjonen.

Dette kan gjøres slik:

```css
body {
  font-family: 'Inter', sans-serif;
  font-feature-settings: 'cv05' 1; /* Enable lowercase l with tail */
}
```

### Skru på typedefinisjoner for `data-color`

Hvis du bruker TypeScript, anbefaler vi å legge til typene for `@udir-design/theme` og `@udir-design/react/html` i `tsconfig.json`.

Da får du typesjekking og autoutfylling for Udirs farger og størrelser (`data-color` og `data-size`) både på komponenter fra biblioteket og vanlige HTML-elementer.

Et enkelt eksempel:

```jsonc
{
  "compilerOptions": {
    // ... andre compilerOptions
    "types": ["@udir-design/theme", "@udir-design/react/html"],
  },
  // ... andre innstillinger
}
```

Legg typene til i den eksisterende `tsconfig.json`-filen. Under er et eksempel fra en testapplikasjon:

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "types": [
      "node",
      "vite/client",
      "vitest/importMeta",
      "@udir-design/theme", //       <---- Legg til disse
      "@udir-design/react/html", //  <---- to linjene
    ],
  },
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx",
    "src/**/*.spec.js",
    "src/**/*.test.js",
    "src/**/*.spec.jsx",
    "src/**/*.test.jsx",
  ],
  "include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
}
```

## Ta i bruk

> [!NOTE]
> Legg merke til at eksempelet importerer fra `@udir-design/react/alpha`.
> Du finner en forklaring på dette i [Designsystemets overordnede README](https://github.com/Utdanningsdirektoratet/designsystem?tab=readme-ov-file#livsfaser-for-en-komponent)

Nå kan du importere og bruke komponenter, for eksempel slik:

```tsx
import { Details, Card } from '@udir-design/react/alpha';

export const MyComponent = () => (
  <Card>
    <Details>
      <Details.Summary>Første overskrift</Details.Summary>
      <Details.Content>Skjult innhold som kan åpnes</Details.Content>
    </Details>
    <Details>
      <Details.Summary>Andre overskrift</Details.Summary>
      <Details.Content>Mer skjult innhold her</Details.Content>
    </Details>
  </Card>
);
```

Oversikt over hvilke komponenter som finnes, og bruksdokumentasjon for disse, finner du [i vår Storybook](https://main--667e8f07bf467ff4403dfe77.chromatic.com).
