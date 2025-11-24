# Symbolbibliotek for Utdanningsdirektoratet

Dette biblioteket inneholder ~400 symboler for bruk i Udirs digitale tjenester. Symbolene er designet av Utdanningsdirektoratet. De kan eksporteres som React-komponenter eller SVG.

## Installere biblioteket

```bash
npm add @udir-design/symbols@alpha
```

## Ta i bruk

### React

```tsx
import {
  BøkerOutlineSymbol,
  FotballFillSymbol,
  LovbokGrønnSymbol,
} from '@udir-design/symbols';

function MyComponent() {
  return (
    <div>
      <BøkerGrønnSymbol />
      <FotballFillSymbol aria-label="Fotballillustrasjon" />
      <HammerOutlineSymbol size="10rem" />
    </div>
  );
}
```

## Ta i bruk uten React

SVG-filene er mulig å importere og bruke fra vanlig HTML og CSS dersom du bruker en bundler som kan resolve npm imports.

### Med Parcel som bundler

#### Bruk i HTML

```css
/* Valgfritt: styr symbolets størrelse med height og/eller width */
.my-symbol {
  width: 10rem;
}
```

```html
<!-- html -->
<svg aria-label="En tittel for skjermleser" class="my-symbol">
  <use href="npm:@udir-design/symbols/dist/svg/DatamaskinFill.svg#symbol" />
</svg>
```

Dersom HTML-en blir generert dynamisk, kan du f.eks. gjøre slik:

```js
const Datamaskin = new URL(
  'npm:@udir-design/symbols/dist/svg/DatamaskinFill.svg',
  import.meta.url,
);

document.body.innerHTML += `
<div>
  <svg aria-label="En tittel for skjermleser">
    <use href="${Datamaskin}#symbol" />
  </svg>
</div>`;
```

#### Bruk i CSS

Du kan bruke SVG-filene direkte i CSS, men må da ta ansvar for en del styling selv.

Et eksempel er å automatisk legge til symbol på et element med en viss klasse.

```css
/* css */

.myClass::before {
  content: url('npm:@udir-design/symbols/dist/svg/DatamaskinFill.svg');
  display: inline-block;
  width: 10rem;
}
```
