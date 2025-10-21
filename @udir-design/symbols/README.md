# Symbolbibliotek for Utdanningsdirektoratet

Dette biblioteket inneholder ~400 symboler for bruk i Udirs digitale tjenester. Symbolene er designet av Utdanningsdirektoratet. De kan eksporteres som React-komponenter eller SVG.

## Installere biblioteket

```bash
npm add @udir-design/symbols@beta
```

## Ta i bruk

### React

```tsx
import { BokerSymbol, FotballSymbol, HammerSymbol } from '@udir-design/symbols';

function MyComponent() {
  return (
    <div>
      <BokerSymbol />
      <FotballSymbol title="Fotballillustrasjon" />
      <HammerSymbol size="10rem" />
    </div>
  );
}
```

Tips: Bruk `title` prop for tilgjengelige symboler.

### SVG

```tsx
import FotballSymbol from '@udir-design/symbols/svg/Fotball.svg';

<!-- Bruk kan variere avhengig av ditt
  oppsett, men kan f.eks. være slik: -->
<img
  src={FotballSymbol}
  alt="En tittel for skjermleser"
/>
```

## Oppdatere symboler

### Nytt symbol i Figma

Nytt symbol legges til i [Symbolbiblioteket i Figma](https://www.figma.com/design/SSdGSjSYPDSyX2IfHLfmEL/Symbolbibliotek?node-id=0-1&p=f&m=dev).

### Oppdatere symboler i pakken

Nedlasting av oppdaterte symboler fra Figma gjøres i et lokalt repo av [Udirs Designsystem](https://github.com/Utdanningsdirektoratet/designsystem).

`.env.local` må inneholde en gyldig Figma-token: `FIGMA_TOKEN={token}`

Kjør følgende kommando i `designsystem/@udir-design/symbols`:

```bash
pnpm nx fetch-new:symbols
```

## Generere PNG

Biblioteket inneholder et byggeverktøy for å generere opp 500x500 PNG-er med en ramme rundt selve symbolet. Disse er ment for bruk av symboler utenfor digitale tjenester (f.eks. PowerPoint-presentasjoner).

Generering av PNG-er gjøres i et lokalt repo av [Udirs Designsystem](https://github.com/Utdanningsdirektoratet/designsystem).

Kjør følgende kommando i `designsystem/@udir-design/symbols`:

```bash
pnpm nx generate:pngs
```
