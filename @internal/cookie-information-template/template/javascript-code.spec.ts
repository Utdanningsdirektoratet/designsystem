import Handlebars from 'handlebars';
import { afterEach, describe, expect, it, vi } from 'vitest';
import testHarness from '../test/template-harness.html?raw';
import cssCode from './css-code.css?raw';
import htmlCode from './html-code.html?raw';
import javascriptCode from './javascript-code.js?raw';

const compileHarness = Handlebars.compile(testHarness);
const compileTemplate = Handlebars.compile(htmlCode);

type CookieInformationApi = {
  changeCategoryConsentDecision: (category: string) => void;
  declineAllCategories: () => void;
  getConsentGivenFor: (category: string) => boolean;
  submitAllCategories: () => void;
  submitConsent: () => void;
};

type ConsentDecisionMethod =
  | 'declineAllCategories'
  | 'submitAllCategories'
  | 'submitConsent';

type TemplateWindow = {
  CookieConsent: {
    renew: () => void;
  };
  CookieInformation: CookieInformationApi;
  dispatchEvent: (event: Event) => boolean;
  document: Document;
  hideCookieBanner: () => void;
  showCookieBanner: () => void;
  renewCookieConsent: () => void;
};

type CookieCategory = {
  cookie_type_label: string;
  cookie_type_name: string;
  cookie_type_description: string;
  cookie_type_count: number;
  is_necessary: boolean;
  is_unclassified: boolean;
  cookie_type_results: Array<{
    data_processor_name: string;
    description: string;
    name: string;
    expiration: string;
  }>;
};

const optionalCategories: CookieCategory[] = [
  {
    cookie_type_label: 'cookie_cat_necessary',
    cookie_type_name: 'Nødvendige',
    cookie_type_description: 'Nødvendige informasjonskapsler.',
    cookie_type_count: 1,
    is_necessary: true,
    is_unclassified: false,
    cookie_type_results: [],
  },
  {
    cookie_type_label: 'cookie_cat_functional',
    cookie_type_name: 'Funksjonelle',
    cookie_type_description: 'Funksjonelle informasjonskapsler.',
    cookie_type_count: 1,
    is_necessary: false,
    is_unclassified: false,
    cookie_type_results: [],
  },
];

const templateData = ({
  cookieCategories = optionalCategories,
  language = 'nb',
} = {}) => ({
  language,
  banner_heading: 'Informasjonskapsler',
  banner_main_text: 'Velg informasjonskapsler.',
  cookie_declaration_text: 'Detaljert informasjon.',
  website_domains: 'example.udir.no',
  cookie_categories: cookieCategories,
});

type RenderTemplateOptions = {
  consumerMarkup?: string;
  culture?: string | null;
  data?: ReturnType<typeof templateData>;
};

const createCookieInformationApi = (templateWindow: TemplateWindow) => ({
  changeCategoryConsentDecision: vi.fn(),
  declineAllCategories: vi.fn(() => templateWindow.hideCookieBanner()),
  getConsentGivenFor: vi.fn(() => false),
  submitAllCategories: vi.fn(() => templateWindow.hideCookieBanner()),
  submitConsent: vi.fn(() => templateWindow.hideCookieBanner()),
});

// The template script declares globals, so each test needs an isolated document.
const renderTemplate = async ({
  consumerMarkup = '',
  culture = 'NB',
  data = templateData(),
}: RenderTemplateOptions = {}) => {
  const frame = document.createElement('iframe');
  frame.dataset.cookieInformationTemplateTest = '';

  const loaded = new Promise((resolve) => {
    frame.addEventListener('load', resolve, { once: true });
  });
  const cultureAttribute = culture === null ? '' : ` data-culture="${culture}"`;

  frame.srcdoc = compileHarness({
    language: data.language,
    cultureAttribute,
    cookieStyles: cssCode,
    cookieTemplate: compileTemplate(data),
    consumerMarkup,
  });
  document.body.append(frame);
  await loaded;

  if (frame.contentWindow === null || frame.contentDocument === null) {
    throw new Error('Template iframe could not be loaded');
  }

  const templateWindow = frame.contentWindow as unknown as TemplateWindow;
  const cookieInformation = createCookieInformationApi(templateWindow);
  Object.assign(templateWindow, {
    CookieConsent: {
      renew: () => templateWindow.showCookieBanner(),
    },
    CookieInformation: cookieInformation,
  });

  const script = frame.contentDocument.createElement('script');
  script.text = javascriptCode;
  frame.contentDocument.body.append(script);

  return { cookieInformation, templateWindow };
};

const getElement = <ElementType extends Element = HTMLElement>(
  document: Document,
  selector: string,
) => {
  const element = document.querySelector<ElementType>(selector);

  if (element === null) {
    throw new Error(`Could not find template element: ${selector}`);
  }

  return element;
};

const getElementById = <ElementType extends HTMLElement = HTMLElement>(
  document: Document,
  id: string,
) => getElement<ElementType>(document, `#${id}`);

const whenDialogCloses = (dialog: HTMLDialogElement) =>
  new Promise<void>((resolve) => {
    dialog.addEventListener('close', () => resolve(), { once: true });
  });

afterEach(() => {
  document
    .querySelectorAll('[data-cookie-information-template-test]')
    .forEach((frame: Element) => frame.remove());
});

describe('Cookie Information template', () => {
  it('shows and hides without a consumer renewal link', async () => {
    const { templateWindow } = await renderTemplate();
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    expect(document.getElementById('Coi-Renew')).toBeNull();
    templateWindow.showCookieBanner();
    expect(dialog.open).toBe(true);
    expect(document.documentElement).toHaveClass('no-scroll');

    const closed = whenDialogCloses(dialog);
    templateWindow.hideCookieBanner();
    expect(dialog.open).toBe(false);
    await closed;
    expect(document.documentElement).not.toHaveClass('no-scroll');
  });

  it('reopens from a consumer-owned footer link', async () => {
    const { templateWindow } = await renderTemplate({
      consumerMarkup: `
        <footer>
          <a href="#informasjonskapsler" id="renew-link"
            onclick="renewCookieConsent(); return false;"
          >Informasjonskapsler</a>
        </footer>`,
    });
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    templateWindow.showCookieBanner();
    const closed = whenDialogCloses(dialog);
    templateWindow.hideCookieBanner();
    await closed;
    getElementById(document, 'renew-link').click();

    expect(dialog.open).toBe(true);
  });

  it('uses Cookie Information culture ahead of the page language', async () => {
    const { templateWindow } = await renderTemplate({
      culture: 'en-GB',
      data: templateData({ language: 'nb' }),
    });
    const { document } = templateWindow;

    expect(getElementById(document, 'cookie-dialog-close')).toHaveAttribute(
      'aria-label',
      'Reject optional cookies and close dialog',
    );
    expect(getElementById(document, 'btn-accept-all')).toHaveTextContent(
      'Accept all',
    );
  });

  it('uses the page language when Cookie Information does not provide one', async () => {
    const { templateWindow } = await renderTemplate({
      culture: null,
      data: templateData({ language: 'en' }),
    });
    const { document } = templateWindow;

    expect(getElementById(document, 'cookie-dialog-close')).toHaveAttribute(
      'aria-label',
      'Reject optional cookies and close dialog',
    );
    expect(getElementById(document, 'btn-accept-all')).toHaveTextContent(
      'Accept all',
    );
  });

  it('uses Norwegian generic labels for unsupported Cookie Information cultures', async () => {
    const { templateWindow } = await renderTemplate({
      culture: 'DE',
      data: templateData({ language: 'en' }),
    });
    const { document } = templateWindow;

    expect(getElementById(document, 'cookie-dialog-close')).toHaveAttribute(
      'aria-label',
      'Avvis valgfrie og lukk dialogvindu',
    );
    expect(getElementById(document, 'btn-accept-all')).toHaveTextContent(
      'Godta alle',
    );
  });

  it('shows information-only controls and wording when all categories are necessary', async () => {
    const { templateWindow } = await renderTemplate({
      data: templateData({ cookieCategories: [optionalCategories[0]] }),
    });
    const { document } = templateWindow;

    expect(
      getElement<HTMLFieldSetElement>(document, '#cookie-dialog .ds-fieldset')
        .hidden,
    ).toBe(true);
    expect(getElementById(document, 'btn-accept-all').hidden).toBe(true);
    expect(getElementById(document, 'btn-accept-selected').hidden).toBe(true);
    expect(getElementById(document, 'btn-decline').hidden).toBe(true);
    expect(getElementById(document, 'btn-close').hidden).toBe(false);
    expect(getElementById(document, 'consent-can-be-changed').hidden).toBe(
      true,
    );
    expect(getElementById(document, 'consent-applies-to').hidden).toBe(true);
    expect(getElementById(document, 'necessary-cookies-used-on').hidden).toBe(
      false,
    );
    expect(
      getElementById(document, 'necessary-cookies-used-on'),
    ).toHaveTextContent('Disse informasjonskapslene brukes på');
    expect(getElementById(document, 'cookie-dialog')).toHaveAttribute(
      'aria-labelledby',
      'cookie-dialog-heading',
    );
    expect(getElementById(document, 'cookie-dialog-close')).toHaveAttribute(
      'aria-label',
      'Lukk dialogvindu',
    );
    expect(getElementById(document, 'necessary-explanation').hidden).toBe(true);
    expect(getElementById(document, 'cookie-details-trigger').hidden).toBe(
      true,
    );
    expect(document.getElementById('cookie-details-dialog')).toBeNull();
    expect(document.getElementById('cookie-details-heading')).toBeNull();

    const detailsContent = getElementById(document, 'cookie-details-content');
    const domainInformation = getElementById(
      document,
      'cookie-domain-information',
    );
    expect(getElementById(document, 'cookie-dialog')).toContainElement(
      detailsContent,
    );
    expect(detailsContent.nextElementSibling).toBe(domainInformation);
    expect(detailsContent).toHaveTextContent('Detaljert informasjon.');
    expect(detailsContent).toHaveTextContent('Nødvendige informasjonskapsler.');
  });

  it('numbers cookie detail headings within their category', async () => {
    const category = {
      ...optionalCategories[0],
      cookie_type_count: 2,
      cookie_type_results: [
        {
          data_processor_name: 'Cookie Information',
          description: 'Støtter tekniske funksjoner.',
          name: 'CookieConsent',
          expiration: '1 år',
        },
        {
          data_processor_name: 'Cloudflare',
          description: 'Beskytter mot overbelastning.',
          name: 'cf_clearance',
          expiration: '30 minutter',
        },
      ],
    };
    const { templateWindow } = await renderTemplate({
      data: templateData({ cookieCategories: [category] }),
    });

    expect(
      Array.from(
        templateWindow.document.querySelectorAll('.cookie-detail-heading'),
      ).map((heading) => heading.textContent),
    ).toEqual(['1', '2']);
  });

  it('suppresses the automatic necessary-only dialog but allows manual opening', async () => {
    const { templateWindow } = await renderTemplate({
      data: templateData({ cookieCategories: [optionalCategories[0]] }),
    });
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    templateWindow.showCookieBanner();
    expect(dialog.open).toBe(false);
    expect(document.documentElement).not.toHaveClass('no-scroll');

    templateWindow.renewCookieConsent();
    expect(dialog.open).toBe(true);
    expect(document.documentElement).toHaveClass('no-scroll');
    expect(dialog).toHaveTextContent('Detaljert informasjon.');
  });

  it('shows optional category controls when optional categories exist', async () => {
    const { templateWindow } = await renderTemplate();
    const { document } = templateWindow;

    expect(
      getElement<HTMLFieldSetElement>(document, '#cookie-dialog .ds-fieldset')
        .hidden,
    ).toBe(false);
    expect(getElementById(document, 'btn-accept-all').hidden).toBe(false);
    expect(getElementById(document, 'btn-accept-selected').hidden).toBe(false);
    expect(getElementById(document, 'btn-decline').hidden).toBe(false);
    expect(getElementById(document, 'btn-close').hidden).toBe(true);
    expect(getElementById(document, 'consent-can-be-changed').hidden).toBe(
      false,
    );
    expect(getElementById(document, 'consent-applies-to').hidden).toBe(false);
    expect(getElementById(document, 'necessary-cookies-used-on').hidden).toBe(
      true,
    );
    expect(getElementById(document, 'cookie-dialog-close')).toHaveAttribute(
      'aria-label',
      'Avvis valgfrie og lukk dialogvindu',
    );
    expect(getElementById(document, 'necessary-explanation').hidden).toBe(
      false,
    );
    expect(getElementById(document, 'cookie-details-trigger').hidden).toBe(
      false,
    );
    expect(document.getElementById('cookie-details-dialog')).not.toBeNull();
    expect(document.getElementById('cookie-details-heading')).not.toBeNull();
  });

  it('keeps the details dialog hidden until it is opened', async () => {
    const { templateWindow } = await renderTemplate();
    const detailsDialog = getElementById<HTMLDialogElement>(
      templateWindow.document,
      'cookie-details-dialog',
    );

    detailsDialog.style.display = 'block';
    expect(getComputedStyle(detailsDialog).display).toBe('none');

    detailsDialog.showModal();
    expect(getComputedStyle(detailsDialog).display).toBe('block');
    expect(detailsDialog).toHaveAttribute(
      'aria-labelledby',
      'cookie-details-heading',
    );
  });

  it('provides the design-system close command on the consent dialog', async () => {
    const { templateWindow } = await renderTemplate();
    const closeButton = getElementById(
      templateWindow.document,
      'cookie-dialog-close',
    );

    expect(closeButton).toHaveAttribute('command', 'close');
    expect(closeButton).toHaveAttribute('commandfor', 'cookie-dialog');
  });

  it('opens and closes the details dialog', async () => {
    const { templateWindow } = await renderTemplate();
    const { document } = templateWindow;
    const detailsDialog = getElementById<HTMLDialogElement>(
      document,
      'cookie-details-dialog',
    );
    const detailsTrigger = getElementById(document, 'cookie-details-trigger');
    const detailsClose = getElementById(document, 'cookie-details-close');

    templateWindow.showCookieBanner();
    detailsTrigger.focus();
    detailsTrigger.click();
    expect(detailsDialog.open).toBe(true);
    expect(document.activeElement).toBe(detailsClose);

    const detailsClosed = whenDialogCloses(detailsDialog);
    detailsClose.focus();
    detailsClose.click();
    expect(detailsDialog.open).toBe(false);
    await detailsClosed;
    expect(document.activeElement).toBe(detailsTrigger);

    detailsTrigger.click();
    detailsDialog.click();
    expect(detailsDialog.open).toBe(false);
  });

  it('records rejection when the consent dialog is closed with the close button', async () => {
    const { cookieInformation, templateWindow } = await renderTemplate();
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    templateWindow.showCookieBanner();
    getElementById(document, 'cookie-dialog-close').click();

    expect(dialog.open).toBe(false);
    expect(cookieInformation.declineAllCategories).toHaveBeenCalledOnce();
    expect(cookieInformation.submitAllCategories).not.toHaveBeenCalled();
    expect(cookieInformation.submitConsent).not.toHaveBeenCalled();
  });

  it('records rejection when the consent dialog receives a close request', async () => {
    const { cookieInformation, templateWindow } = await renderTemplate();
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });

    templateWindow.showCookieBanner();
    dialog.dispatchEvent(cancelEvent);

    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(dialog.open).toBe(false);
    expect(cookieInformation.declineAllCategories).toHaveBeenCalledOnce();
  });

  it('closes the manually opened necessary-only dialog without recording rejection', async () => {
    const { cookieInformation, templateWindow } = await renderTemplate({
      data: templateData({ cookieCategories: [optionalCategories[0]] }),
    });
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    templateWindow.renewCookieConsent();
    getElementById(document, 'btn-close').click();

    expect(dialog.open).toBe(false);
    expect(cookieInformation.declineAllCategories).not.toHaveBeenCalled();
  });

  it.each<
    [description: string, buttonId: string, method: ConsentDecisionMethod]
  >([
    ['accepts all categories', 'btn-accept-all', 'submitAllCategories'],
    ['accepts selected categories', 'btn-accept-selected', 'submitConsent'],
    ['declines optional categories', 'btn-decline', 'declineAllCategories'],
  ])('closes after the user %s', async (_description, buttonId, method) => {
    const { cookieInformation, templateWindow } = await renderTemplate();
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    templateWindow.showCookieBanner();
    const closed = whenDialogCloses(dialog);
    getElementById(document, buttonId).click();

    expect(dialog.open).toBe(false);
    expect(cookieInformation[method]).toHaveBeenCalledOnce();
    await closed;
    expect(document.documentElement).not.toHaveClass('no-scroll');
  });

  it('reports optional-category changes to Cookie Information', async () => {
    const { cookieInformation, templateWindow } = await renderTemplate();
    const { document } = templateWindow;

    getElementById(document, 'cookie_cat_functional').click();

    expect(
      cookieInformation.changeCategoryConsentDecision,
    ).toHaveBeenCalledOnce();
    expect(
      cookieInformation.changeCategoryConsentDecision,
    ).toHaveBeenCalledWith('cookie_cat_functional');
  });

  it('shows a blocked feature placeholder only without the required consent', async () => {
    const { cookieInformation, templateWindow } = await renderTemplate({
      consumerMarkup: `
        <div class="consent-placeholder" data-category="cookie_cat_functional">
          Video requires functional cookies.
        </div>`,
    });
    const { document } = templateWindow;
    const placeholder = getElement(document, '.consent-placeholder');

    vi.mocked(cookieInformation.getConsentGivenFor).mockReturnValue(true);
    templateWindow.dispatchEvent(new Event('CookieInformationConsentGiven'));
    expect(placeholder.hidden).toBe(true);

    vi.mocked(cookieInformation.getConsentGivenFor).mockReturnValue(false);
    templateWindow.dispatchEvent(new Event('CookieInformationConsentGiven'));
    expect(placeholder.hidden).toBe(false);
  });
});
