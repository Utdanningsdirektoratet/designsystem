const exampleData = require('../../@udir-design/react/src/patterns/Informasjonskapsler/exampleData.json');

const supportedLocales = new Set(Object.keys(exampleData));

const normalizeLocale = (culture) => {
  const locale = String(culture ?? '')
    .trim()
    .toLowerCase()
    .split(/[-_]/)[0];

  return supportedLocales.has(locale) ? locale : 'nb';
};

const buildData = (culture) => {
  const locale = normalizeLocale(culture);
  const content = exampleData[locale];

  return {
    language: locale,
    culture: locale.toUpperCase(),
    banner_heading: content.heading,
    banner_main_text: content.body,
    website_domains: content.websiteDomains,
    cookie_categories: content.categories.map((category) => ({
      cookie_type_label: `cookie_cat_${category.id}`,
      cookie_type_name: category.name,
      cookie_type_name_lowercase: category.name.toLocaleLowerCase(locale),
      cookie_type_description: category.description,
      cookie_type_count: category.cookies.length,
      is_necessary: category.necessary,
      is_unclassified: category.id === 'unclassified',
      cookie_type_results: category.cookies.map((cookie) => ({
        data_processor_name: cookie.provider,
        description: cookie.purpose,
        name: cookie.name,
        expiration: cookie.expiration,
        domain: cookie.domain,
        data_processor_privacy_policy: cookie.privacyPolicyUrl,
      })),
    })),
  };
};

module.exports = { buildData, normalizeLocale };
