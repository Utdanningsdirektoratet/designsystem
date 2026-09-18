import Handlebars from 'handlebars';
import { afterEach, describe, expect, it, vi } from 'vitest';
import testHarness from '../test/template-harness.html?raw';
import htmlCode from './html-code.html?raw';
import javascriptCode from './javascript-code.js?raw';

const compileHarness = Handlebars.compile(testHarness);
const compileTemplate = Handlebars.compile(htmlCode);

type CookieInformationApi = {
  changeCategoryConsentDecision: (category: string) => void;
  declineAllCategories: () => void;
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
  document: Document;
  hideCookieBanner: () => void;
  showCookieBanner: () => void;
};

const optionalCategories = [
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
            onclick="CookieConsent.renew(); return false;"
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

    expect(getElementById(document, 'cookie-dialog')).toHaveAttribute(
      'aria-label',
      'Cookie consent',
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

    expect(getElementById(document, 'cookie-dialog')).toHaveAttribute(
      'aria-label',
      'Cookie consent',
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

    expect(getElementById(document, 'cookie-dialog')).toHaveAttribute(
      'aria-label',
      'Samtykke til informasjonskapsler',
    );
    expect(getElementById(document, 'btn-accept-all')).toHaveTextContent(
      'Godta alle',
    );
  });

  it('shows the "Lukk" consent action instead of decision controls when all categories are necessary', async () => {
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

  it('does not record a decision when the outer dialog is dismissed', async () => {
    const { cookieInformation, templateWindow } = await renderTemplate();
    const { document } = templateWindow;
    const dialog = getElementById<HTMLDialogElement>(document, 'cookie-dialog');

    templateWindow.showCookieBanner();
    getElementById(document, 'cookie-dialog-close').click();

    expect(dialog.open).toBe(false);
    expect(
      cookieInformation.changeCategoryConsentDecision,
    ).not.toHaveBeenCalled();
    expect(cookieInformation.declineAllCategories).not.toHaveBeenCalled();
    expect(cookieInformation.submitAllCategories).not.toHaveBeenCalled();
    expect(cookieInformation.submitConsent).not.toHaveBeenCalled();
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
});
