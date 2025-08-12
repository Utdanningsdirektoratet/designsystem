interface HeadingMeta {
  size: 'xs' | 'sm' | 'md' | 'lg';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface SectionItem {
  heading: HeadingMeta;
  paragraph: string;
}

export const section1: SectionItem[] = [
  {
    heading: { size: 'sm', level: 2, text: 'Hvordan bruke verktøyet' },
    paragraph:
      'Verktøyet kan brukes til å jobbe med de didaktiske spørsmålene hvorfor, hva og hvordan i planlegging av opplæring i tråd med læreplanverket.',
  },
  {
    heading: {
      size: 'xs',
      level: 3,
      text: 'Hvilke ressurser er tilgjengelige?',
    },
    paragraph:
      'Det finnes flere ressurser tilgjengelig for lærere som ønsker å forbedre sine planleggingsevner. Dette inkluderer maler, sjekklister og veiledninger som kan lastes ned fra vår nettside.',
  },
  {
    heading: {
      size: 'xs',
      level: 3,
      text: 'Hvordan involvere elever i planlegging?',
    },
    paragraph:
      'Å involvere elever i planleggingen av egne læringsmål kan øke motivasjonen. Dette kan gjøres gjennom workshops og tilbakemeldingsrunder der elevenes stemmer blir hørt.',
  },
];

export const section2: SectionItem[] = [
  {
    heading: { size: 'sm', level: 2, text: 'Tilgang' },
    paragraph:
      'Skoleeiere, høgskoler, universitet og lærebedrifter som ønsker at lærere og ansatte skal ha tilgang til verktøyet, må signere databehandleravtale.',
  },
  {
    heading: { size: 'xs', level: 3, text: 'Lærere' },
    paragraph:
      'Lærere som ønsker å bruke verktøyet til undervisning må registrere seg og bekrefte sin identitet.',
  },
  {
    heading: { size: 'xs', level: 3, text: 'Studenter' },
    paragraph:
      'Studenter får tilgang til verktøyet gjennom lærerne sine, etter at de har fått bekreftet sin påmelding.',
  },
  {
    heading: { size: 'xs', level: 3, text: 'IT-ansvarlige' },
    paragraph:
      'IT-ansvarlige i institusjoner må sørge for at nødvendig infrastruktur er på plass for at verktøyet skal fungere optimalt.',
  },
];

export const section3: SectionItem[] = [
  {
    heading: { size: 'sm', level: 2, text: 'Tekniske spørsmål' },
    paragraph:
      'Har du tekniske spørsmål, så send en e-post til lpv@udir.no. Hvis du bytter Feide-bruker, så hjelper vi deg også med å koble planer du allerede har til din nye Feide-bruker.',
  },
];
