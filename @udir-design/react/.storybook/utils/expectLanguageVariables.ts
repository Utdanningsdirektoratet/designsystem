import { expect } from 'storybook/test';

/** The languages we ship translations for. */
const LANGS = ['nb', 'nn', 'en'] as const;

/** Checks that a region subtag resolves like its base language, i.e. [lang|=] not [lang=]. */
const SUBTAG = { lang: 'en-GB', sameAs: 'en' } as const;

/**
 * Asserts that CSS language variables resolve on a component element exactly as they do on
 * a plain element in the same [lang] scope, for every language we translate.
 *
 * Comparing against a plain element rather than hardcoding the strings keeps the copy in
 * CSS, and still catches the reason this exists: upstream declares some of these variables
 * directly on the component element, where they shadow the values we declare on [lang]
 * ancestors regardless of cascade layer. `lang` is set inside the story, below
 * <html lang="nb">, which is the case that regressed — a component in a non-Norwegian
 * region of a Norwegian document.
 */
export const expectLanguageVariables = async (
  canvasElement: HTMLElement,
  getElement: () => Element | null | undefined,
  variables: string[],
) => {
  const previousLang = canvasElement.lang;
  const reference = document.createElement('div');
  canvasElement.append(reference);

  try {
    const resolved: Record<string, Record<string, string>> = {};

    for (const lang of [...LANGS, SUBTAG.lang]) {
      canvasElement.lang = lang;
      const element = getElement();
      await expect(
        element,
        `found no element to read ${variables.join(', ')} from`,
      ).toBeTruthy();

      for (const variable of variables) {
        const expected = getComputedStyle(reference).getPropertyValue(variable);
        await expect(
          expected,
          `${variable} has no value for [lang='${lang}']`,
        ).not.toBe('');

        const actual = getComputedStyle(element as Element).getPropertyValue(
          variable,
        );
        await expect(
          actual,
          `${variable} is not translated for [lang='${lang}']`,
        ).toBe(expected);

        (resolved[variable] ??= {})[lang] = actual;
      }
    }

    for (const variable of variables) {
      await expect(
        resolved[variable]?.[SUBTAG.lang],
        `${variable} does not treat [lang='${SUBTAG.lang}'] as '${SUBTAG.sameAs}'`,
      ).toBe(resolved[variable]?.[SUBTAG.sameAs]);
    }

    // Everything above also passes if no language is translated at all, so require that at
    // least one of the variables actually differs between bokmål and English.
    await expect(
      variables.some((v) => resolved[v]?.['nb'] !== resolved[v]?.['en']),
      `none of ${variables.join(', ')} differ between [lang='nb'] and [lang='en']`,
    ).toBe(true);
  } finally {
    reference.remove();
    canvasElement.lang = previousLang;
  }
};
