const translations = {
  nb: {
    necessaryExplanation:
      'Nødvendige informasjonskapsler bidrar til at tjenesten fungerer og er sikker, og kan ikke velges bort.',
    optionalLegend: 'Velg hvilke valgfrie informasjonskapsler du godtar',
    detailsTrigger: 'Se hvilke informasjonskapsler vi bruker',
    overviewHeading: 'Informasjonskapsler',
    provider: 'Leverandør',
    purpose: 'Formål',
    name: 'Navn',
    expiration: 'Utløpstid',
    privacyPolicy: 'Personvernerklæring',
    viewPrivacyPolicy: '{provider} - Personvernerklæring',
    consentCanBeChanged:
      'Du kan når som helst endre samtykket ditt via lenken i bunnfeltet.',
    consentAppliesTo: 'Samtykket gjelder for',
    acceptAll: 'Godta alle',
    acceptSelected: 'Godta valgte',
    declineOptional: 'Avvis valgfrie',
    acceptNecessary: 'Godta',
  },
  en: {
    necessaryExplanation:
      'Necessary cookies help keep the service functional and secure and cannot be disabled.',
    optionalLegend: 'Choose which optional cookies you accept',
    detailsTrigger: 'See which cookies we use',
    overviewHeading: 'Cookies',
    provider: 'Provider',
    purpose: 'Purpose',
    name: 'Name',
    expiration: 'Expiration',
    privacyPolicy: 'Privacy policy',
    viewPrivacyPolicy: '{provider} - Privacy policy',
    consentCanBeChanged:
      'You can change your consent at any time using the link in the footer.',
    consentAppliesTo: 'The consent applies to',
    acceptAll: 'Accept all',
    acceptSelected: 'Accept selected',
    declineOptional: 'Reject optional',
    acceptNecessary: 'Accept',
  },
} as const;

type Locale = keyof typeof translations;

const resolveLocale = (language: string | null | undefined): Locale => {
  const locale = language?.trim().toLowerCase().split(/[-_]/)[0];
  return locale === 'en' ? 'en' : 'nb';
};

const getPageLocale = (): Locale =>
  resolveLocale(document.documentElement.lang);

export { type Locale, getPageLocale, resolveLocale, translations };
