const translations = {
  nb: {
    necessaryExplanation:
      'Nødvendige informasjonskapsler bidrar til at tjenesten fungerer og er sikker, og kan ikke velges bort.',
    optionalLegend: 'Velg hvilke valgfrie informasjonskapsler du godtar',
    detailsTrigger: 'Se hvilke informasjonskapsler vi bruker',
    overviewHeading: 'Informasjonskapsler',
    close: 'Lukk',
    closeDialog: 'Lukk dialogvindu',
    privacyPolicyText:
      'Les om hvordan vi behandler personopplysninger og hvilke rettigheter du har i',
    privacyPolicyLinkText: 'vår personvernerklæring',
    provider: 'Leverandør',
    purpose: 'Formål',
    name: 'Navn',
    expiration: 'Utløpstid',
    consentCanBeChanged:
      'Du kan når som helst endre samtykket ditt via lenken i bunnfeltet.',
    consentAppliesTo: 'Samtykket gjelder for',
    necessaryCookiesUsedOn: 'Disse informasjonskapslene brukes på',
    acceptAll: 'Godta alle',
    acceptSelected: 'Godta valgte',
    declineOptional: 'Avvis valgfrie',
    declineOptionalAndClose: 'Avvis valgfrie og lukk dialogvindu',
    renewConsent: 'Endre samtykke',
    featureConsentHeading:
      'Du må godta funksjonelle informasjonskapsler for å se videoen',
    featureConsentDescription:
      'Videoen leveres av [videoleverandør], som bruker informasjonskapsler for å [beskriv formålet].',
    changeConsent: 'Endre samtykke',
  },
  en: {
    necessaryExplanation:
      'Necessary cookies help keep the service functional and secure and cannot be disabled.',
    optionalLegend: 'Choose which optional cookies you accept',
    detailsTrigger: 'See which cookies we use',
    overviewHeading: 'Cookies',
    close: 'Close',
    closeDialog: 'Close dialog',
    privacyPolicyText:
      'Read about how we process personal data and your rights in',
    privacyPolicyLinkText: 'our privacy policy',
    provider: 'Provider',
    purpose: 'Purpose',
    name: 'Name',
    expiration: 'Expiration',
    consentCanBeChanged:
      'You can change your consent at any time using the link in the footer.',
    consentAppliesTo: 'The consent applies to',
    necessaryCookiesUsedOn: 'These cookies are used on',
    acceptAll: 'Accept all',
    acceptSelected: 'Accept selected',
    declineOptional: 'Reject optional',
    declineOptionalAndClose: 'Reject optional cookies and close dialog',
    renewConsent: 'Change consent',
    featureConsentHeading:
      'You must accept functional cookies to watch the video',
    featureConsentDescription:
      'The video is provided by [video provider], which uses cookies to [describe the purpose].',
    changeConsent: 'Change consent',
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
