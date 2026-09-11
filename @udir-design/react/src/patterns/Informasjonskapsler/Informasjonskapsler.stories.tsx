import {
  Button,
  Checkbox,
  Link,
  Paragraph,
} from '@digdir/designsystemet-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { InformationSquareFillIcon } from '@udir-design/icons';
import {
  WithInertInitialRender,
  useIsInert,
} from '.storybook/decorators/WithInertInitialRender';
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
  cookieDeclarationText: string;
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
  decorators: [withResponsiveDataSize, WithInertInitialRender],
});

export const Preview = meta.story({
  args: {},
  render: (args) => {
    const [open, setOpen] = useState(true);
    const isInert = useIsInert();
    const locale = getPageLocale();
    const content = localizedExampleData[locale];
    const text = translations[locale];
    const categoriesWithCookies = content.categories.filter(
      (category) => category.cookies.length > 0,
    );
    const optionalCategories = categoriesWithCookies.filter(
      (category) => !category.necessary,
    );
    const necessaryOnly = optionalCategories.length === 0;

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
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          {...(isInert && { inert: true })}
        >
          <Prose>
            <Heading>{content.heading}</Heading>

            <Paragraph>{text.necessaryExplanation}</Paragraph>

            {necessaryOnly ? null : (
              <Fieldset>
                <Fieldset.Legend>{text.optionalLegend}</Fieldset.Legend>
                <Fieldset.Description>{content.body}</Fieldset.Description>
                {optionalCategories.map((category) => (
                  <Checkbox key={category.id} label={category.name} />
                ))}
              </Fieldset>
            )}

            <Dialog.TriggerContext>
              <Dialog.Trigger variant="secondary" data-size="sm">
                <InformationSquareFillIcon aria-hidden />
                {text.detailsTrigger}
              </Dialog.Trigger>
              <Dialog>
                <Prose>
                  <Heading level={2}>{text.overviewHeading}</Heading>
                  <Paragraph>
                    {text.privacyPolicyText}{' '}
                    <Link href="https://example.com/privacy">
                      {text.privacyPolicyLinkText}
                    </Link>
                    .
                  </Paragraph>
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
              {necessaryOnly ? null : `${text.consentCanBeChanged} `}
              {text.consentAppliesTo}: {content.websiteDomains}.
            </Paragraph>
          </Prose>

          <div className="cookies-buttons">
            {necessaryOnly ? (
              <Button variant="secondary" onClick={() => setOpen(false)}>
                {text.acceptNecessary}
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  {text.acceptAll}
                </Button>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  {text.acceptSelected}
                </Button>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  {text.declineOptional}
                </Button>
              </>
            )}
          </div>
        </Dialog>
        {open ? null : (
          <Button
            variant="tertiary"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
          >
            {text.renewConsent}
          </Button>
        )}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const acceptAll = canvas.getByRole('button', { name: 'Godta alle' });

    await userEvent.click(acceptAll);

    const renewConsent = canvas.getByRole('button', {
      name: 'Endre samtykke',
    });
    await expect(renewConsent).toBeVisible();

    await userEvent.click(renewConsent);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Godta alle' })).toBeVisible(),
    );
  },
});
