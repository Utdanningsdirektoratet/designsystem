/**
 * Cookie consent banner — Utdanningsdirektoratet design system implementation
 * Uses native <dialog> elements with DS CSS classes.
 * Integrates with CookieInformation JS API.
 */

const translations = {
  nb: {
    pageTitle: 'Informasjonskapsler',
    dialogLabel: 'Samtykke til informasjonskapsler',
    closeDialog: 'Lukk dialogvindu',
    necessaryExplanation:
      'Nødvendige informasjonskapsler bidrar til at tjenesten fungerer og er sikker, og kan ikke velges bort.',
    optionalLegend: 'Velg hvilke valgfrie informasjonskapsler du godtar',
    detailsTrigger: 'Se hvilke informasjonskapsler vi bruker',
    acceptAll: 'Godta alle',
    acceptSelected: 'Godta valgte',
    declineOptional: 'Avvis valgfrie',
    overviewHeading: 'Informasjonskapsler',
    provider: 'Leverandør: ',
    purpose: 'Formål: ',
    name: 'Navn: ',
    expiration: 'Utløpstid: ',
    privacyPolicy: 'Personvernerklæring: ',
    viewPrivacyPolicy: 'Personvernerklæring',
    consentCanBeChanged:
      'Du kan når som helst endre samtykket ditt via lenken i bunnfeltet.',
    consentAppliesTo: 'Samtykket gjelder for',
    renewConsent: 'Endre samtykke for informasjonskapsler',
  },
  en: {
    pageTitle: 'Cookies',
    dialogLabel: 'Cookie consent',
    closeDialog: 'Close dialog',
    necessaryExplanation:
      'Necessary cookies help keep the service functional and secure and cannot be disabled.',
    optionalLegend: 'Choose which optional cookies you accept',
    detailsTrigger: 'See which cookies we use',
    acceptAll: 'Accept all',
    acceptSelected: 'Accept selected',
    declineOptional: 'Reject optional',
    overviewHeading: 'Cookies',
    provider: 'Provider: ',
    purpose: 'Purpose: ',
    name: 'Name: ',
    expiration: 'Expiration: ',
    privacyPolicy: 'Privacy policy: ',
    viewPrivacyPolicy: 'Privacy policy',
    consentCanBeChanged:
      'You can change your consent at any time using the link in the footer.',
    consentAppliesTo: 'The consent applies to',
    renewConsent: 'Change cookie consent',
  },
};

const normalizeLocale = (language) => {
  const locale = language?.trim().toLowerCase().split(/[-_]/)[0];
  return locale && locale in translations ? locale : 'nb';
};

const resolveLocale = () => {
  const cookieInformationCulture =
    document.getElementById('CookieConsent')?.dataset.culture;
  return normalizeLocale(
    cookieInformationCulture || document.documentElement.lang,
  );
};

const applyTranslations = () => {
  const text = translations[resolveLocale()];
  const translate = (key) => text[key] ?? translations.nb[key];

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translate(element.dataset.i18n, element);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute(
      'aria-label',
      translate(element.dataset.i18nAriaLabel, element),
    );
  });
};

applyTranslations();

const cookieDialog = document.getElementById('cookie-dialog');
const detailsDialog = document.getElementById('cookie-details-dialog');
const detailsTrigger = document.getElementById('cookie-details-trigger');
const detailsClose = document.getElementById('cookie-details-close');
const coiRenewBtn = document.getElementById('Coi-Renew');

// --- Details dialog ---

detailsTrigger.addEventListener('click', () => {
  detailsDialog.showModal();
});

detailsClose.addEventListener('click', () => {
  detailsDialog.close();
});

// Close details dialog when clicking backdrop
detailsDialog.addEventListener('click', (e) => {
  if (e.target === detailsDialog) {
    detailsDialog.close();
  }
});

// --- Show/Hide banner ---

function showCookieBanner() {
  document.documentElement.classList.add('no-scroll');
  cookieDialog.showModal();
  coiRenewBtn.style.display = 'none';
}

function hideCookieBanner() {
  cookieDialog.close();
  document.documentElement.classList.remove('no-scroll');
  coiRenewBtn.style.display = '';
}

// Close main dialog on backdrop click (don't close for consent — just ignore)
cookieDialog.addEventListener('click', (e) => {
  if (e.target === cookieDialog) {
    // Don't close on backdrop for consent dialogs
  }
});
