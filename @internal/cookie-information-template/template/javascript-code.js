/**
 * Cookie consent banner — Utdanningsdirektoratet design system implementation
 * Uses native <dialog> elements with DS CSS classes.
 * Integrates with CookieInformation JS API.
 */

const translations = {
  nb: {
    pageTitle: 'Informasjonskapsler',
    closeDialog: 'Lukk dialogvindu',
    declineOptionalAndClose: 'Avvis valgfrie og lukk dialogvindu',
    necessaryExplanation:
      'Nødvendige informasjonskapsler bidrar til at tjenesten fungerer og er sikker, og kan ikke velges bort.',
    optionalLegend: 'Velg hvilke valgfrie informasjonskapsler du godtar',
    detailsTrigger: 'Se hvilke informasjonskapsler vi bruker',
    acceptAll: 'Godta alle',
    acceptSelected: 'Godta valgte',
    declineOptional: 'Avvis valgfrie',
    close: 'Lukk',
    overviewHeading: 'Informasjonskapsler',
    provider: 'Leverandør: ',
    purpose: 'Formål: ',
    name: 'Navn: ',
    expiration: 'Utløpstid: ',
    consentCanBeChanged:
      'Du kan når som helst endre samtykket ditt via lenken i bunnfeltet.',
    consentAppliesTo: 'Samtykket gjelder for',
    necessaryCookiesUsedOn: 'Disse informasjonskapslene brukes på',
  },
  en: {
    pageTitle: 'Cookies',
    closeDialog: 'Close dialog',
    declineOptionalAndClose: 'Reject optional cookies and close dialog',
    necessaryExplanation:
      'Necessary cookies help keep the service functional and secure and cannot be disabled.',
    optionalLegend: 'Choose which optional cookies you accept',
    detailsTrigger: 'See which cookies we use',
    acceptAll: 'Accept all',
    acceptSelected: 'Accept selected',
    declineOptional: 'Reject optional',
    close: 'Close',
    overviewHeading: 'Cookies',
    provider: 'Provider: ',
    purpose: 'Purpose: ',
    name: 'Name: ',
    expiration: 'Expiration: ',
    consentCanBeChanged:
      'You can change your consent at any time using the link in the footer.',
    consentAppliesTo: 'The consent applies to',
    necessaryCookiesUsedOn: 'These cookies are used on',
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

const text = translations[resolveLocale()];
const translate = (key) => text[key] ?? translations.nb[key];

const applyTranslations = () => {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute(
      'aria-label',
      translate(element.dataset.i18nAriaLabel),
    );
  });
};

applyTranslations();

const cookieDialog = document.getElementById('cookie-dialog');
const detailsDialog = document.getElementById('cookie-details-dialog');
const detailsTrigger = document.getElementById('cookie-details-trigger');
const detailsClose = document.getElementById('cookie-details-close');
const cookieDialogClose = document.getElementById('cookie-dialog-close');
const detailsContent = document.getElementById('cookie-details-content');
const detailsHeading = document.getElementById('cookie-details-heading');
const necessaryExplanation = document.getElementById('necessary-explanation');
const domainInformation = document.getElementById('cookie-domain-information');
const consentAppliesTo = document.getElementById('consent-applies-to');
const necessaryCookiesUsedOn = document.getElementById(
  'necessary-cookies-used-on',
);

document.querySelectorAll('.cookies-category').forEach((category) => {
  category
    .querySelectorAll('.cookie-detail-heading')
    .forEach((heading, index) => {
      heading.textContent = String(index + 1);
    });
});

const optionalCategories = cookieDialog.querySelectorAll('.coi__checkbox');
const necessaryOnly = optionalCategories.length === 0;

cookieDialog.querySelector('.ds-fieldset').hidden = necessaryOnly;
document.getElementById('btn-accept-all').hidden = necessaryOnly;
document.getElementById('btn-accept-selected').hidden = necessaryOnly;
document.getElementById('btn-decline').hidden = necessaryOnly;
document.getElementById('btn-close').hidden = !necessaryOnly;
document.getElementById('consent-can-be-changed').hidden = necessaryOnly;
consentAppliesTo.hidden = necessaryOnly;
necessaryCookiesUsedOn.hidden = !necessaryOnly;

if (necessaryOnly) {
  cookieDialogClose.setAttribute('aria-label', translate('closeDialog'));
  necessaryExplanation.hidden = true;
  detailsTrigger.hidden = true;
  detailsHeading.remove();
  domainInformation.before(detailsContent);
  detailsDialog.remove();
} else {
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
}

// --- Show/Hide banner ---

let manualOpenRequested = false;

// oxlint-disable-next-line no-unused-vars -- Consumer-owned controls invoke this function by name.
function renewCookieConsent() {
  manualOpenRequested = true;
  CookieConsent.renew();
}

// oxlint-disable-next-line no-unused-vars -- Cookie Information invokes this configured callback by name.
function showCookieBanner() {
  const shouldOpen = !necessaryOnly || manualOpenRequested;
  manualOpenRequested = false;
  if (!shouldOpen) return;

  document.documentElement.classList.add('no-scroll');
  cookieDialog.showModal();
}

// oxlint-disable-next-line no-unused-vars -- Cookie Information invokes this configured callback by name.
function hideCookieBanner() {
  cookieDialog.close();
}

// Optional-cookie configurations store rejection before Cookie Information closes the dialog.
// oxlint-disable-next-line no-unused-vars -- Inline template controls invoke this function by name.
function handleCookieDialogDismissal() {
  if (necessaryOnly) {
    cookieDialog.close();
    return;
  }

  CookieInformation.declineAllCategories();
}

cookieDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  handleCookieDialogDismissal();
});

cookieDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('no-scroll');
});

// Close main dialog on backdrop click (don't close for consent — just ignore)
cookieDialog.addEventListener('click', (e) => {
  if (e.target === cookieDialog) {
    // Don't close on backdrop for consent dialogs
  }
});

// Keep service-owned placeholders visible until their required category is accepted.
window.addEventListener('CookieInformationConsentGiven', () => {
  document
    .querySelectorAll('.consent-placeholder[data-category]')
    .forEach((placeholder) => {
      placeholder.hidden = CookieInformation.getConsentGivenFor(
        placeholder.dataset.category,
      );
    });
});
