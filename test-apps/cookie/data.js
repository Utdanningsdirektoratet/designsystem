const exampleData = require('../../@udir-design/react/src/patterns/Informasjonskapsler/exampleData.json');

module.exports = {
  language: exampleData.language,
  banner_heading: exampleData.heading,
  banner_main_text: exampleData.body,
  website_domains: exampleData.websiteDomains,
  accept_cookies_button: exampleData.labels.acceptAll,
  decline_cookies_button: exampleData.labels.declineOptional,
  translations: {
    update_consent_button: exampleData.labels.acceptSelected,
    cookies_overview: exampleData.labels.overview,
  },
  cookie_categories: exampleData.categories.map((category) => ({
    cookie_type_label: `cookie_cat_${category.id}`,
    cookie_type_name: category.name,
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
