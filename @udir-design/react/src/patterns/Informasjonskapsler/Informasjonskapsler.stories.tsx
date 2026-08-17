import {
  Button,
  Checkbox,
  Link,
  Paragraph,
} from '@digdir/designsystemet-react';
import { InformationSquareFillIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Details } from 'src/components/details';
import { Dialog } from 'src/components/dialog';
import { Fieldset } from 'src/components/fieldset';
import { Heading } from 'src/components/typography/heading';
import { Prose } from 'src/components/typography/prose';
import exampleData from './exampleData.json';
import { type Locale, getPageLocale, translations } from './translations';

type ExampleData = {
  heading: string;
  body: string;
  websiteDomains: string;
  categories: Array<{
    id: string;
    name: string;
    description: string;
    necessary: boolean;
    cookies: Array<{
      provider: string;
      purpose: string;
      name: string;
      expiration: string;
      domain: string;
      privacyPolicyUrl: string;
    }>;
  }>;
};

const localizedExampleData = exampleData as unknown as Record<
  Locale,
  ExampleData
>;

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [
    withResponsiveDataSize,
    (Story, context) => {
      // Hacky way to detect docs mode in iframe-rendered story
      const isInDocsPage =
        window.parent.location.search.includes('viewMode=docs');
      if (isInDocsPage) {
        // Set viewMode since Storybook doesn't detect it properly when rendered with "inline: false" (iframe mode)
        context.viewMode = 'docs';
      }
      return <Story />;
    },
  ],
});

export const Preview = meta.story({
  args: {},
  render: (args, context) => {
    const locale = getPageLocale();
    const content = localizedExampleData[locale];
    const text = translations[locale];
    const categoriesWithCookies = content.categories.filter(
      (category) => category.cookies.length > 0,
    );

    return (
      <>
        <style>
          {`
            /* Styles defined in application-specific css */
            .cookies-buttons {
              display: flex;
              gap: var(--ds-size-4);
              flex-wrap: wrap;
            }
            .cookies-details ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .cookies-details li > strong {
              font-weight: 600;
            }
            @media (max-width: 40rem) {
              .cookies-buttons > button {
          flex: 1 1 auto;
              }
            }
          `}
        </style>
        <Dialog
          open={true}
          modal={false}
          {...args}
          {...(context.viewMode === 'docs' && { inert: true })}
        >
          <Prose>
            <Heading>{content.heading}</Heading>

            <Paragraph>{text.necessaryExplanation}</Paragraph>

            <Fieldset>
              <Fieldset.Legend>{text.optionalLegend}</Fieldset.Legend>
              <Fieldset.Description>{content.body}</Fieldset.Description>
              {categoriesWithCookies
                .filter((category) => !category.necessary)
                .map((category) => (
                  <Checkbox key={category.id} label={category.name} />
                ))}
            </Fieldset>

            <Dialog.TriggerContext>
              <Dialog.Trigger variant="secondary" data-size="sm">
                <InformationSquareFillIcon aria-hidden />
                {text.detailsTrigger}
              </Dialog.Trigger>
              <Dialog>
                <Prose>
                  <Heading level={2}>{text.overviewHeading}</Heading>
                  {categoriesWithCookies.map((category) => (
                    <div key={category.name} className="cookies-container">
                      <Prose>
                        <Heading data-size="xs" level={3}>
                          {category.name}
                        </Heading>
                        <Paragraph>{category.description}</Paragraph>
                        <Details>
                          <Details.Summary>
                            {category.cookies.length}{' '}
                            {category.name.toLocaleLowerCase(locale)}
                          </Details.Summary>
                          <Details.Content className="cookies-details">
                            <Prose>
                              {category.cookies.map((cookie, index) => (
                                <Prose key={cookie.name}>
                                  <Heading data-size="2xs" level={4}>
                                    {index + 1}
                                  </Heading>
                                  <ul>
                                    <li>
                                      <strong>{text.provider}: </strong>
                                      {cookie.provider}
                                    </li>
                                    <li>
                                      <strong>{text.purpose}: </strong>
                                      {cookie.purpose}
                                    </li>
                                    <li>
                                      <strong>{text.name}: </strong>
                                      {cookie.name}
                                    </li>
                                    <li>
                                      <strong>{text.expiration}: </strong>
                                      {cookie.expiration}
                                    </li>
                                    <li>
                                      <strong>{text.privacyPolicy}: </strong>
                                      <Link href={cookie.privacyPolicyUrl}>
                                        {text.viewPrivacyPolicy.replace(
                                          '{provider}',
                                          cookie.provider,
                                        )}
                                      </Link>
                                    </li>
                                  </ul>
                                </Prose>
                              ))}
                            </Prose>
                          </Details.Content>
                        </Details>
                      </Prose>
                    </div>
                  ))}
                </Prose>
              </Dialog>
            </Dialog.TriggerContext>
            <Paragraph>
              {text.consentCanBeChanged} {text.consentAppliesTo}:{' '}
              {content.websiteDomains}.
            </Paragraph>
          </Prose>

          <div className="cookies-buttons">
            <Button variant="secondary">{text.acceptAll}</Button>
            <Button variant="secondary">{text.acceptSelected}</Button>
            <Button variant="secondary">{text.declineOptional}</Button>
          </div>
        </Dialog>
      </>
    );
  },
});
