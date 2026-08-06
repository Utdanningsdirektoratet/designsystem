# Styling for Utdanningsdirektoratets designsystem

Dette biblioteket inneholder styling for Utdanningsdirektoratets designsystem.

## Installere biblioteket

```bash
npm add @udir-design/css@beta
```

## Ta i bruk med React

Dersom du bruker `@udir-design/react` trenger du ikke å bruke dette biblioteket direkte. Følg instruksene i `@udir-design/react` for å sette opp å ta i bruk designsystemet!

## Ta i bruk uten React

Hvordan du kommer i gang med biblioteket avhenger av om bundleren din støtter å importere CSS fra npm-biblioteker eller ikke. Vite støtter dette, mens f.eks. Parcel ikke gjør det.

### Med f.eks. Vite

Om du bruker en bundler som støtter `@import` av npm-avhengigheter i CSS, f.eks. Vite, er biblioteket veldig enkelt å ta i bruk.

#### Installer biblioteket

```sh
npm add @udir-design/css@beta
```

#### Importer fra JavaScript

```js
import '@udir-design/css';
```

#### Importer fra CSS

```css
@import '@udir-design/css';
```

### Bruke biblioteket

Det er foreløpig ingen dokumentasjon på hvordan man bruker komponentene uten React. Generelt sett er det ganske lett å få likt utseende som med React, men eventuell interaktivitet må implementeres selv.

Enn så lenge anbefaler vi å lese [React-dokumentasjonen](https://design.udir.no), inspisere DOM-en i eksemplene, og se hvilke klasser og data-attributter som settes i forskjellige tilstander.

## Grunnstiler for applikasjoner

Nye applikasjoner kan velge å bruke et lite sett med globale grunnstiler:

```js
import '@udir-design/css';
import '@udir-design/css/baseline.css';
```

Fra CSS:

```css
@import '@udir-design/css';
@import '@udir-design/css/baseline.css';
```

Grunnstilene er valgfrie og er ikke en del av standardimporten. De gir
forutsigbar boksstørrelse, fjerner nettleserens marg rundt `body`, bruker
designsystemets typografi, lar skjemakontroller arve typografi og hindrer store
bilder og videoer i å flyte ut av beholderen sin.

Stilene beholder nettleserens standarder for blant annet overskrifter, avsnitt,
lister, lenker, skjemakontroller og fokusmarkering. De fjerner heller ikke
animasjoner eller tilpasninger for høykontrastmodus.

Grunnstilene ligger i laget `ds.base`. Vanlig applikasjons-CSS som ikke ligger i
et lag, overstyrer derfor grunnstilene uten sterkere selektorer eller
`!important`.

Fonten `Inter` må fortsatt lastes inn av applikasjonen. Se oppsettet i
React-dokumentasjonen for anbefalt fontimport.

### Bruke et annet preflight-bibliotek

Importer Tailwind eller andre preflight-biblioteker etter Designsystemet og
Udirs grunnstiler. Da får det siste biblioteket kontroll over overlappende
grunnstiler:

```css
@import '@udir-design/css';
@import '@udir-design/css/baseline.css';
@import 'tailwindcss';
```
