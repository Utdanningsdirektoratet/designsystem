# Designsystem for Utdanningsdirektoratet <!-- omit from toc -->

Udirs designsystem er et initiativ for å skape og opprettholde helhetlig design slik at Udir har:

- tydelig identitet
- brukervennlige løsninger
- effektiv utvikling

Udirs designsystem tar utgangspunkt i [Digdirs felles designsystem](https://www.designsystemet.no/). Designsystemet skal brukes for å oppnå helhetlig design i Udirs digitale tjenester og i andre kommunikasjonsflater i tråd med Udirs [designprofil](https://www.udir.no/om-udir/designprofil/).

I dette repositoriet lever den delen av designsystemet som implementeres i kode:

- design tokens
- komponentbibliotek
- dokumentasjon

## Innholdsfortegnelse <!-- omit from toc -->

<!--
  Innholdsfortegnelsen er generert av extension "Markdown All in One" for VS Code.
  Om du har extensionen installert vil innholdsfortegnelsen automatisk oppdateres.
  https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
-->

- [Hvordan ta i bruk Udirs designsystem](#hvordan-ta-i-bruk-udirs-designsystem)
- [Versjonering og publisering](#versjonering-og-publisering)
- [Informasjon for utviklere som skal bidra](#informasjon-for-utviklere-som-skal-bidra)
  - [Oppsett lokalt](#oppsett-lokalt)
  - [Monorepo - enkelt forklart](#monorepo---enkelt-forklart)
  - [Hvordan jobbe med kodebasen](#hvordan-jobbe-med-kodebasen)
  - [Hvordan publisere en ny versjon](#hvordan-publisere-en-ny-versjon)
  - [Oversikt over verktøy](#oversikt-over-verktøy)

# Hvordan ta i bruk Udirs designsystem

> [!IMPORTANT]
> For å bruke designsystemet i et React-prosjekt, trenger du kun å forholde deg til komponentbiblioteket `@udir-design/react`.
>
> Instrukser for å komme i gang finnes i [komponentbibliotekets README](./@udir-design/react/README.md).

# Versjonering og publisering

Bibliotekene våre følger [semantisk versjonering](https://semver.org/) og [semantisk publisering](https://semantic-release.gitbook.io).

Det vil si, gitt et versjonsnummer MAJOR.MINOR.PATCH, vil

- en økning i MAJOR-versjon indikere en endring som **ikke** er bakoverkompatibel
- en økning i MINOR-versjon indikere ny, bakoverkompatibel funksjonalitet
- en økning i PATCH-versjon indikere en bakoverkompativel bugfiks

Koden som tilhører siste stabile, publiserte versjon vil alltid finnes på branchen [release/latest](https://github.com/Utdanningsdirektoratet/designsystem/tree/release/latest), mens koden for en spesifikk versjon kan finnes via [git tags](https://github.com/Utdanningsdirektoratet/designsystem/tags).

> [!WARNING]
> Foreløpig finnes ikke branchen `release/latest`, fordi vi ikke har publisert en stabil versjon ennå.

# Informasjon for utviklere som skal bidra

Før du kan bidra med kode i designsystemet trenger du å gjøre noe oppsett lokalt. I tillegg trenger du å forstå hvordan kodebasen er strukturert på et overordnet nivå. Deretter får du vite hvordan du jobber med kodebasen. Til slutt får du en oversikt over verktøy som er i bruk i kodebasen.

> [!NOTE]
> Den påfølgende dokumentasjonen vil bruke følgende begreper, hentet fra Nx:
>
> <dl>
> <dt><strong>arbeidsområde</strong></dt><dd>hele kodebasen, på engelsk <em>workspace</em></dd>
> <dt><strong>prosjekt</strong></dt><dd>en enkelt del eller modul i arbeidsområdet, på engelsk <em>project</em></dd>
> <dt><strong>target</strong></dt><dd>definisjonen av en automatisert oppgave (eng: <em>task</em>) som kan kjøres av Nx</dd>
> </dl>

## Oppsett lokalt

Du trenger å sette opp Node.js og pnpm dersom du ikke har dette fra før. Du kan også gjøre byggestegene raskere ved å benytte vår felles Nx cache.

### Node.js

pnpm sørger for at vi alltid bruker riktig versjon av Node.js i arbeidsområdet, som definert i `.npmrc`, men for å installere pnpm trenger du minst Node.js versjon 18.12.

Om du ikke har Node.js fra før, er det enkleste å installere nyeste LTS-versjon ved å følge [de offisielle instruksene](https://nodejs.org/en/download/).

### pnpm

For å installere pnpm, kjør følgende kommandoer fra en kommandolinje i rot av repoet.

```
corepack enable pnpm
corepack prepare
```

> [!TIP]
> corepack er en del av Node.js, og sørger for at vi til enhver tid bruker samme versjon av pnpm hos alle utviklere.
> Versjonsnummeret er spesifisert i feltet `"packageManager"` i filen `package.json`.

### Felles Nx cache

> [!NOTE]
> Dette steget er ikke nødvendig for at prosjektene skal bygge, men uten dette vil Nx kun bruke din lokale cache.

Vi bruker en felles Nx cache for å gjøre bygg raskere på tvers av ulike utviklermaskiner og CI-kjøringer. Cachen er lagret i en Azure storage account, gjennom pluginen [nx-remotecache-azure](https://www.npmjs.com/package/nx-remotecache-azure).

Azure-infrastrukturen som er nødvendig for felles caching er dokumentert i [.azure/README.md](.azure/README.md).

For å kunne bruke den felles cachen, må hver utvikler legge til følgende i den git-ignorerte filen `.env.local`

```
NXCACHE_AZURE_ACCOUNT_KEY=<secret key>
```

`<secret key>` må erstattes med den faktiske nøkkelen. Spør en utvikler på designteamet om hvor du kan finne denne.

> [!WARNING]
> For øyeblikket får vi følgende beskjeder, som må tas tak i, men som foreløpig kan ignoreres:
>
> - Custom task runners will no longer be supported in Nx 21.  
>   Use Nx Cloud or the Nx Powerpack caches instead.
> - Nx is configured to use the legacy cache. This cache will be removed in Nx 21.  
>   Read more at https://nx.dev/deprecated/legacy-cache#tasksrunneroptions.

### Sjekke at oppsettet funker

Kjør `pnpm i && pnpm nx storybook`. Dersom dette kjører uten problemer, og du får opp Storybook i nettleseren, er alt som det skal.

## Monorepo - enkelt forklart

Kodebasen er strukturert i et [monorepo](https://monorepo.tools/#what-is-a-monorepo) — et repository som inneholder flere distinkte programmer og biblioteker, med veldefinerte avhengighetsforhold.

For å hjelpe oss med struktur og avhengigheter i monorepoet benytter vi verktøyene [Nx](https://nx.dev) og [pnpm](https://pnpm.io/). Mer om disse senere.

Monorepoet vårt består av

- [`design-tokens`](./design-tokens/): Én kilde til sannhet for design-avgjørelser på tvers av design og kode. Figma-biblioteket vårt refererer også til disse.
- [`@udir-design/theme`](./@udir-design/theme/): CSS-bibliotek som definerer vårt tema — altså farger, størrelser, typografi osv.
- [`@udir-design/react`](./@udir-design/react/): Komponentbibliotek for bruk med React, inkludert dokumentasjon.
- [`test-apps/*`](./test-apps/): Ulike demo-applikasjoner for å teste at bibliotekene fungerer i forskjellige kontekster.

Avhengighetsforholdene kan illustreres slik:

```mermaid
flowchart-elk BT
  %% nodes
  tokens(design-tokens)
  subgraph public [publiserte biblioteker]
    theme(@udir-design/theme)
    react(@udir-design/react)
  end
  subgraph apps [demo-applikasjoner]
    vite(test-apps/vite):::app
    nextjs(test-apps/nextjs):::app
  end

  %% dependencies
  theme --> tokens
  react --> theme
  vite --> react
  nextjs --> react

  %% styling
  classDef default fill:#303030,stroke:#7e7e7e,color:#fff
  classDef app fill:#dedede,color:#434343
  style apps fill:#f9f3eb,color:#2f2b24,stroke:#8a7c69,stroke-dasharray: 5 5
  style public fill:#76c69d,color:#000,stroke:#528a6d
```

## Hvordan jobbe med kodebasen

> [!CAUTION]
> Denne dokumentasjonen inneholder foreløpig ingen informasjon om hvordan vi gjør testing.
> Dette vil komme etter hvert som vi definerer teststrategien i designsystemet.

### Git branching og commit-stil

Før du begynner å utvikle må du lage en ny branch ut fra `main`. Vi har ingen spesifikk navngiving på brancher,
men for å lettere ha oversikt kan du gjerne følge dette mønsteret:

- `feat/...` for nye features
- `fix/...` for bugfikser
- `docs/...` for oppdatering av dokumentasjon
- `ci/...` for endringer i GitHub Actions
- `build/...` for endringer i byggeskriptet
- og så videre.

Vi bruker [Conventional Commits-standarden for commitmeldinger](https://www.conventionalcommits.org/en/v1.0.0/), og skriver commitmeldinger på engelsk. Dette gir oss mulighet til å automatisk oppdatere versjonsnummer og generere endringslogg når vi slipper en ny versjon.

Når vi skriver commitmeldinger er det derfor viktig at både format og innhold er riktig. Formatet sjekkes av [commitlint](https://commitlint.js.org/), men innholdet må vi stå inne for selv.

En typisk commitmelding har dette formatet:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

> [!TIP]
> branch-prefiksene og `<type>` i commitmelding er hentet fra `@commitlint/config-conventional`, [se gjerne den fulle oversikten](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index).

> [!IMPORTANT]
> Automatisk versjonering og endringslogg følger semantisk versjonering på formatet `<MAJOR>.<MINOR>.<PATCH>`:
>
> - `fix:` commits øker `<PATCH>`-nummeret
> - `feat:` commits øker `<MINOR>`-nummeret
> - `BREAKING CHANGE` i footer øker `<MAJOR>`-nummeret.
>
> Alle andre commit-typer påvirker hverken endringslogg eller versjonsummer.

Noen eksempler:

```
feat: add Button component
```

```
fix(Button): ensure hover effect works in Safari
```

```
chore: drop support for React 17

React 18 was released in March 2022, and should be an easy upgrade from React 17.

BREAKING CHANGE: Consumers must upgrade to React 18 or 19.
```

> [!TIP]
> Lokalt har du lov til å begynne en commit med `wip` eller `fixup`, for å hoppe over formatsjekking med commitlint.
> Dette er nyttig for å kunne sjekke inn kode raskt om du ikke er ferdig med de ønskede endringene, men
> likevel må hoppe over på en annen oppgave, avslutte for dagen, eller vil ha et punkt å returnere til før
> du prøver en endring i koden.
>
> Du vil bli stoppet fra å merge en PR med slike commits, så disse må slås sammen eller endres navn på
> gjennom `git rebase` når du er fornøyd med endringene dine.

### Vanlig utvikling

De vanlige stegene for å jobbe i arbeidsområdet er

- `pnpm install` / `pnpm i` for å sørge for at lokale avhengigheter er oppdatert
- `pnpm nx storybook` for å starte Storybook, slik at du kan se endringer live
- Gjøre endringer i `@udir-design/react` eller andre prosjekter
- `pnpm build` — uten `nx` — for å kjøre lint, typesjekk, bygg og enhetstester for alle prosjekter som har blitt påvirket av dine endringer

> [!TIP]
> Under panseret kjører `pnpm build` følgende kommando:
>
> ```
> pnpm nx affected -t typecheck lint test build build-storybook
> ```

### Få overblikk med Nx

Du kan få et visuelt overblikk over prosjektene i kodebasen ved å bruke Nx.

```
pnpm nx graph --targets all
```

Du kan vise mer informasjon om et prosjekt ved å klikke på prosjektet, og så på søke-ikonet :mag: øverst til høyre i modalen. Eller du kan åpne denne visningen direkte fra kommandolinjen, f.eks.

```
pnpm nx show project @udir-design/react
```

I denne visningen ser du en nyttig oversikt over targets for det valgte prosjektet. Disse kan igjen kjøres fra kommandolinjen:

```
pnpm nx <target> [optional project] <...options>
```

Om project utelates, blir `@udir-design/react` brukt siden dette er satt som default project.

F.eks. dette kjører target `build` i `@udir-design/react`

```
pnpm nx build
```

Du kan også kjøre ett eller flere targets på tvers av alle prosjekter som har disse definert:

```
pnpm nx run-many -t lint test
```

Les mer i Nx sin dokumentasjon:

- [Explore your Workspace](https://nx.dev/features/explore-graph)
- [Run Tasks](https://nx.dev/features/run-tasks).

## Hvordan publisere en ny versjon

Vi benytter en publiseringsstrategi basert på [semantic-release](https://semantic-release.gitbook.io),
tilpasset for bruk i monorepo. Denne strategien baserer seg på automatisert publisering gjennom pull requests til
spesifikke brancher.

Hos oss er dette satt opp slik:

- `release/latest` brukes for å publisere en stabil versjon, og får `@latest`-taggen på npm.
- `release/alpha` og `release/beta` brukes for å publisere hhv. alpha- og beta-versjoner. Disse får pre-release versjonsnummer i henhold til [SemVer](https://semver.org/) — f.eks. `1.1.0-alpha.2` — og hhv. `@alpha` og `@beta` tag på npm.
- `release/<N>.x` og `release/<N>.<N>.x`, der `<N>` er et tall, brukes for å publisere vedlikeholdsversjoner. Det lar oss for eksempel fikse en bug eller legge til en feature på en versjon som er én eller flere major-versjoner bak `release/latest`.

I alle tilfeller blir versjonsnummer og endringslogg automatisk generert etter endringene har blitt merget inn i korrekt branch.

Når du er ferdig med en fiks eller feature, må du ta stilling til hvor denne skal merges inn:

- Skal den ikke rulles ut enda? Lag en PR mot `main`-branchen
- Skal den rulles ut som en ny, stabil versjon? Lag en PR mot `release/latest`.
- Skal den rulles ut som en alpha- eller beta-versjon? Lag en PR mot `release/alpha` eller `release/beta`.
- Er det en feature eller bugfix for en eldre versjon? I dette tilfellet må endringene dine branche UT fra versjonen som trenger endring. For eksempel, dersom vi allerede er på versjon 2, men du må fikse en bug i versjon 1.13.1, så må du
  - branche ut fra git-taggen `@udir-design/react@1.13.1`
  - committe bugfix `fix: <description here>`
  - lage en PR mot branchen `release/1.x` (eller `release/1.13.x`)
  - dersom bug'en også finnes i versjon 2, kan du så lage en PR for å merge `release/1.x` inn i `release/latest`

Husk også at endringer som rulles ut til `release/latest` ikke automatisk blir tilgjengelig på `release/alpha`, for å gjøre det må man merge `release/latest` inn i `release/alpha`.

Man kan også måtte merge andre veien, f.eks. dersom en alpha-versjon skal promoteres til stabil vil man merge `release/alpha` inn i `release/latest`.

Dersom man har endringer i `main`-branchen som ennå ikke er publisert, vil man altså opprette en PR for å merge `main` inn i en av `release/*`-branchene.

## Oversikt over verktøy

Dette er de viktigste verktøyene og tjenestene vi bruker i designsystemet.

### Kode

- [TypeScript](https://www.typescriptlang.org/) — språket som kodebasen er skrevet i
- [React](https://react.dev/) — komponentene våre leveres som React-komponenter

### Bygg, avhengigheter og utrulling

- [Node.js](https://nodejs.org) - kjøretidsmiljø for JavaScript som brukes av de fleste verktøyene våre
- [pnpm](https://pnpm.io/) — package manager som håndterer avhengigheter, både mellom interne moduler og til eksterne biblioteker
- [Nx](https://nx.dev/) — overordnet byggesystem som respekterer avhengigheter mellom ulike deler av monorepoet, og håndterer publisering av biblioteker
- [Vite](https://vite.dev/) — verktøy som bygger de individuelle TypeScript-bibliotekene
- [GitHub Actions](https://github.com/features/actions) — kontinuerlig integrasjon og utrulling (CI/CD)

### Dokumentasjon og testing

- [Storybook](https://storybook.js.org/) — interaktiv dokumentasjon av komponentbiblioteket
- [Chromatic](https://www.chromatic.com/) - designgjennomgang og automatisert testing av visuelle endringer, samt hosting av Storybook
- [Vitest](https://vitest.dev/) - testrammeverket vi bruker for enhetstester
- [Storybook test-runner](https://storybook.js.org/docs/writing-tests/test-runner) — kjører tester definert i Storybook i en browser, ved hjelp av [Playwright](https://playwright.dev/)

### Kodekvalitet

- [typescript-eslint](https://typescript-eslint.io/) — statisk analyse av kodebasen for å finne mulige problemer
- [prettier](https://prettier.io/) — håndterer konsistent formatering av kodebasen
- [commitlint](https://commitlint.js.org/) — sørger for at commits følger [Conventional Commits-standarden for commitmeldinger](https://www.conventionalcommits.org/en/v1.0.0/), slik at vi lettere kan lage endringslogg
