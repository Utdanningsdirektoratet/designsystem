# React-komponenter for Utdanningsdirektoratets designsystem.

Dette biblioteket inneholder React-komponenter for Utdanningsdirektoratets designsystem.

For å ta i bruk biblioteket må du først installere det, og så gjøre litt oppsett.

## Installere biblioteket

```bash
npm add @udir-design/theme@alpha @udir-design/react@alpha
```

## Oppsett

### Laste inn riktig font

Last inn fonten Inter, f.eks. ved å plassere følgende i din `index.html` `<head>`

```html
<link
  rel="preload stylesheet"
  as="style"
  href="https://altinncdn.no/fonts/inter/v4/inter.css"
/>
```

### Laste inn stilsettet

Du må laste inn bibliotekets stilsett enten, som ligger i `@udir-design/react/style.css`.

Eksempel: importer stilsettet fra ditt JavaScript- eller TypeScript-entrypoint

```ts
import '@udir-design/react/style.css';
```

Alternativt eksempel: importer stilsettet fra din primære css-fil

```css
@import '@udir-design/react/style.css';
```

### Skru på typedefinisjoner for `data-color`

Dersom du bryker TypeScript, bør du legge til typene for `@udir-design/theme` og `@udir-design/react` i din `tsconfig.json`. Dette gir typesjekking og autocomplete for Udirs farger og størrelser (`data-color` og `data-size` properties), både i bibliotekets komponenter og vanlige HTML-tags.

Et enkelt eksempel:

```jsonc
{
  "compilerOptions": {
    // ... andre compilerOptions
    "types": ["@udir-design/theme", "@udir-design/react"]
  }
  // ... andre innstillinger
}
```

Dette må passes inn med din eksisterende tsconfig, her er et eksempel på en ekte tsconfig fra en testapplikasjon:

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "types": [
      "node",
      "vite/client",
      "vitest/importMeta",
      "@udir-design/theme", // <---- Legg til disse
      "@udir-design/react" //  <---- to linjene
    ]
  },
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx",
    "src/**/*.spec.js",
    "src/**/*.test.js",
    "src/**/*.spec.jsx",
    "src/**/*.test.jsx"
  ],
  "include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"]
}
```

### Konfigurere standard typografi

Biblioteket setter ingen globale stiler. For å få en konsistent typografi på nettsiden må du derfor selv sette en standard typografistil for HTML som ikke bruker komponenter fra biblioteket.

Dette gjøres slik:

```css
body {
  font-family: 'Inter', sans-serif;
  font-feature-settings: 'cv05' 1; /* Enable lowercase l with tail */
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
