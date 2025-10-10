export const labels = {
  'token-preview': {
    size: {
      description: (
        <>
          Verdien til størrelsevariabler settes av <code>data-size</code>
          -attributtet.
        </>
      ),
      'select-label': 'Velg størrelse (data-size)',
    },
    color: {
      description: (
        <>
          Verdien til disse fargevariablene settes av <code>data-color</code>
          -attributtet. Du kan også bruke fargene direkte, ved å legge til
          fargenavnet etter <code>--ds-color-</code>, f.eks.{' '}
          <code>--ds-color-accent-background-default</code>
        </>
      ),
      'select-label': 'Velg farge (data-color)',
    },
    'search-in-design-tokens': 'Søk i design tokens',
    'search-input-aria-label': 'Søk på variabel navn i CSS for design tokens',
    colors: 'Farger',
    typography: 'Typografi',
    semantic: 'Semantiske',
    'no-results': 'Ingen resultater funnet',
    table: {
      name: 'Navn',
      value: 'Verdi',
      variable: 'Variabel',
      preview: 'Forhåndsvisning',
      light: 'Lys',
      dark: 'Mørk',
    },
  },
};
