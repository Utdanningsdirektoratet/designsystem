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

### Med f.eks. Parcel

For bundlere som **ikke** støtter `@import` av npm-avhengigheter i CSS på standard måte, må du gjøre noe ekstra selv.

#### Installer biblioteket og avhengigheter

Først, om du bruker `pnpm`, moderne `yarn` en annen fornuftig package manager som ikke tillater å importere transitive avhengigheter, må du sørge for å eksplisitt installere CSS-bibliotekets avhengigheter i tillegg til biblioteket.

```sh
pnpm add @udir-design/css@beta @udir-design/theme@beta @digdir/designsystemet-css
```

#### Import fra JavaScript

```js
import '@udir-design/theme/dist/index.css';
import '@digdir/designsystemet-css/dist/src/index.css';
import '@udir-design/css/components.css';
```

> [!NOTE]
> Legg merke til at vi importerer CSS-filer fra `dist/`-undermappen. Dette er fordi
> Parcel ikke respekterer `package.json`-feltet `"exports"` når den resolver CSS imports.
> Hvilken konkrete fil du faktisk må importere her kan i teorien endre seg, og fasiten
> ligger i bibliotekenes `package.json`-fil.

#### Import fra CSS

> [!NOTE]
> I tillegg til merknaden over om `dist/`, legg merke til `npm:`-prefix, som er
> spesifikt for Parcel

```css
@import 'npm:@udir-design/theme/dist/index.css';
@import 'npm:@digdir/designsystemet-css/dist/src/index.css';
@import 'npm:@udir-design/css/dist/components.css';
```

### Bruke biblioteket

Det er foreløpig ingen dokumentasjon på hvordan man bruker komponentene uten React. Generelt sett er det ganske lett å få likt utseende som med React, men eventuell interaktivitet må implementeres selv.

Enn så lenge anbefaler vi å lese [React-dokumentasjonen](https://design.udir.no), inspisere DOM-en i eksemplene, og se hvilke klasser og data-attributter som settes i forskjellige tilstander.
